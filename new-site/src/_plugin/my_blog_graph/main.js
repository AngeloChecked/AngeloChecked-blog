import G6 from "@antv/g6";

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

export default myBlogGraph;
