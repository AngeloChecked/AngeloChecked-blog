import { Page } from "lume/core/file.ts";
import Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";

const graphCode = (
  containerId: string,
  foreignKeys: string[],
  minimapContainerId: undefined | string = undefined,
  selectedNode: undefined | string = undefined,
) => {
  return `
document.addEventListener('DOMContentLoaded', () => {
  fetch("/graph-data.json").then(response => response.json()).then(myData => {
    myBlogGraph({ nodes: myData }, {
      foreignKeys: ["${foreignKeys.join(`","`)}"],
      containerId: "${containerId}",
      ${minimapContainerId !== undefined ? `minimapContainerId: "${minimapContainerId}",` : ""}
      ${selectedNode !== undefined ? `selectedNode: "${selectedNode}",` : ""}
    });
  })
});

function myBlogGraph(graphData, { foreignKeys, containerId, selectedNode, minimapContainerId }, graphStyle = ["drag-canvas", "zoom-canvas", "drag-node"]) {
  const colorBasedOnText = (text) => {
    const number = Array.from(text).reduce((acc, char) => {acc += char.charCodeAt(); return acc} , 0) 
    const decimalNumber = number / (10**Math.ceil(Math.log10(number + 1)))
    return "#" + Math.floor(decimalNumber * 16777215).toString(16);
  }

  const colors = graphData.nodes.reduce((acc, node) => {
    if (!acc[node.type]) acc[node.type] = colorBasedOnText(node.type);
    return acc;
  }, {});

  const sizes = graphData.nodes.reduce((acc, node) => {
    for (const foreignKey of foreignKeys) {
      const fkValue = node[foreignKey];
      if (fkValue) {
        const thusValues = Array.isArray(fkValue) ? fkValue : [fkValue];
        for (const key of thusValues) {
          if (!acc[key]) {
            acc[key] = 1;
          } else {
            acc[key] += 1;
          }
        }
      }
    }
    return acc;
  }, {});

  const types = graphData.nodes.reduce((acc, node) => {
    acc[node.id] = node.type;
    return acc;
  }, {});

  const websiteUrls = graphData.nodes.reduce((acc, node) => {
    acc[node.id] = node.websiteUrl;
    return acc;
  }, {});

  const data = {
    nodes: [],
    edges: [],
  };

  for (let node of graphData.nodes) {
    const isSelected = selectedNode === node.id 
    const selectedExtraSize = isSelected ? 50 : 0
    data.nodes.push({
      id: node.id,
      label: node.data.name,
      size: 40 + (sizes[node.id] ?? 0) * 3 + selectedExtraSize,
      name: node.data.name,
      websiteUrl: node.websiteUrl,
      type: node.type,
      icon: {
        show: isSelected,
        img: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="red" d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',
      },
      style: {
        lineWidth: 2,
        fill: isSelected ? "#0" : colors[node.type],
        stroke: colors[node.type],
      },
    });

    for (const foreignKey of foreignKeys) {
      const fkValue = node[foreignKey];
      if (fkValue) {
        const thusValues = Array.isArray(fkValue) ? fkValue : [fkValue];
        for (const key of thusValues) {
          data.edges.push({
            "key": node.id + key,
            "source": node.id,
            "target": key,
            "label": types[key],
            "websiteUrl": websiteUrls[key]
          });
        }
      }
    }
  }

  const width = document.getElementById(containerId).scrollWidth;
  const height = document.getElementById(containerId).scrollHeight || 500;

  const minimap = minimapContainerId && new G6.Minimap({
    container: minimapContainerId
  });


  const [legendData, filters] = (function(){
    const innerLegendData = { 
      nodes: Array.from(new Set(Object.values(types))).map(type => ({id: type, label: type, style: {fill: colors[type]}})),
    }
    
    const innerFilters = {}
    for (let node of data.nodes){
      if (!innerFilters[node.type]){
        innerFilters[node.type] = (nodeModel) => {
          console.log(nodeModel.type, node.type)
          return nodeModel.type === node.type ? true : false
        }
      }
    }

    return [innerLegendData, innerFilters]
  })()

  console.log(filters)

  const legend = new G6.Legend({
  data: legendData,
  align: 'center',
  layout: 'horizontal', 
  position: 'bottom-right',
  vertiSep: 12,
  horiSep: 12,
  padding:  16,
  title: "legend", 
  containerStyle: { fill: '#fff', lineWidth: 1, opacity: 100},
  titleConfig: { position: 'center', offsetX: 0, offsetY: 12, },
  filter: {
    enable: true,
    multiple: true,
    trigger: 'click',
    graphActiveState: 'active',
    graphInactiveState: 'inactive',
    filterFunctions: filters    
  }
});


  const graph = new G6.Graph({
    container: containerId,
    width,
    height,
    layout: {
      type: "force",
      edgeStrength: 0.7,
      preventOverlap: true,
      nodeSpacing: 30,
      linkDistance: 200,
    },
    plugins: [...[minimap].filter(Boolean), legend],
    modes: {
      default: [
        ...graphStyle,
        "activate-relations",
        {
          type: "tooltip",
          formatText: (model) => model.name,
        },
        {
          type: "edge-tooltip",
          formatText: (model, e) => {
            const edge = e.item;
            return "source: " + edge.getSource().getModel().name +
              "<br/>target: " +
              edge.getTarget().getModel().name;
          },
        },
      ],
    },
    defaultNode: {
      labelCfg: {
        position: "bottom",
        style: { fontSize: 9, fill: "black", stroke: "white", lineWidth: 5 },
      },
    },
    defaultEdge: {
      "size": 1,
      style: { endArrow: true },
      labelCfg: {
        autoRotate: true,
        style: {
          fontSize: 9,
          fill: "lightgray",
          stroke: "white",
          lineWidth: 5,
        },
      },
    },
    nodeStateStyles: { active: { opacity: 1 }, inactive: { opacity: 0.2 } },
    edgeStateStyles: { active: { stroke: "#999" } },
  });


  graph.on('node:click', (event) => {
    const websiteUrl = event.item.getModel().websiteUrl
    if (websiteUrl) {
      window.location.href = websiteUrl
    }
  })
  graph.on('edge:click', (event) => {
    const websiteUrl = event.item.getModel().websiteUrl
    console.log(event.item.getModel())
    if (websiteUrl) {
      window.location.href = websiteUrl
    }
  })
  graph.data(data);
  graph.render();
  if (selectedNode){
    const node = graph.findById(selectedNode)

    const neighbours = graph.getNeighbors(node, "node")
    const neighbourIds = neighbours.map(i => i.getModel().id)
    for (let node of graph.getNodes()){
      const id = node.getModel().id
      if(id && id !== selectedNode && !neighbourIds.includes(id)){
         node.hide()
      }
    }
  }
}

`;
};

type Options = {
  foreignKeys: string[];
  containerId: string;
  minimapContainerId?: string;
  antvG6Cdn?: string;
  tooltipCss?: string;
};

const defaults: Partial<Options> = {
  minimapContainerId: undefined,
  antvG6Cdn: "https://cdn.jsdelivr.net/npm/@antv/g6@4.8.24/dist/g6.min.js",
  tooltipCss: `.g6-tooltip {
       border: 1px solid #e2e2e2;       
       border-radius: 4px;
       font-size: 12px;
       color: #000;
       background-color: rgba(255, 255, 255, 0.9);
       padding: 10px 8px;
       box-shadow: rgb(174, 174, 174) 0px 0px 10px;
     }`,
};

export default function (userOptions: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.process([".html"], (pages) => {
      const graph: unknown[] = [];
      for (const p of site.pages) {
        p.data?.graph && graph.push(p.data.graph);
      }
      for (const page of pages) {
        const { document } = page;
        if (!document) {
          continue;
        }

        const graphIsPresent = document.querySelector(
          `#${options.containerId}`,
        );
        if (graphIsPresent) {
          const script = document.createElement("script");
          // script.setAttribute("async", "true");
          script.setAttribute("defer", "true");
          script.setAttribute("type", "text/javascript");
          script.setAttribute("src", site.url(options.antvG6Cdn));
          // script.setAttribute("crossorigin", "anonymous");
          // script.setAttribute("referrerpolicy", "no-referrer");
          document.head.append(script);

          const style = document.createElement("style");
          style.innerText = options.tooltipCss;
          document.head.append(style);

          const minimapIsPresent = document.querySelector(
            `#${options.minimapContainerId}`,
          );
          const scriptBlock = document.createElement("script");
          scriptBlock.innerText = graphCode(
            options.containerId,
            options.foreignKeys,
            minimapIsPresent == null ? undefined : options.minimapContainerId, 
            page.data?.id as string,
          );
          document.body.append(scriptBlock);
        }
      }

      site.pages.push(
        Page.create({
          content: JSON.stringify(graph),
          url: "/graph-data.json",
        }),
      );
    });

    // function create(some: string) {
    //   console.log("???????????" + some);
    // }
    // site.scopedData.set("createKnowledgeGraph", create);
  };
}
