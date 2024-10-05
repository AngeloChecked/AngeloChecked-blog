import { Point } from "./Point.js";

function createCircle(point, r, fill, id, link) {
  return `
  ${link ? `<a href="${link}">` : ""}
  <circle id="node${id}" cx="${point.x}" cy="${point.y}" r="${r}" fill="${fill}" style="cursor: pointer;" />
  ${link ? `</a>` : ""}
  `;
}

export function createArrow(pointA, pointB, stroke, opacity, id) {
  return `<line id="edgeArrow${id}" x1="${pointA.x}" y1="${pointA.y}" x2="${pointB.x}" y2="${pointB.y}" stroke="${stroke}" marker-end="url(#arrow)" opacity="${opacity}" />`;
}

function createText({ point, text, angle, color, fontSize, id }) {
  return `
  <text id="${id}" filter="url(#solid)" font-size="${fontSize}" x="${point.x}" y="${point.y}" fill="${color}"  text-anchor="middle" dominant-baseline="central" transform="rotate(${angle}, ${point.x}, ${point.y})" style="pointer-events: none ;user-select: none;">
         ${text}
       </text>
       </g>`;
}

function createDefs(arrowTextBgColor) {
  return `
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="black" />
      </marker>
      <filter id="solid" x="0" y="0" width="1" height="1" >
          <feFlood flood-color="${arrowTextBgColor}" result="bg" />
          <feMerge>
            <feMergeNode in="bg"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
      </filter>
    </defs>
  `;
}

export function createSvg(
  id,
  width,
  height,
  innerWidth = 1000,
  innerHeight = 1000,
  bgColor,
  body,
) {
  const svg = `
    <svg id="${id}" viewBox="-${innerWidth / 2} -${innerHeight / 2} ${innerWidth} ${innerHeight}" width="${width}" height="${height}" style="background-color: ${bgColor}; width: 100%; max-width:${width}px;">
    ${body}
    </svg>
  `;
  return svg;
}

/**
 * @typedef {{
 *   svgId: string,
 *   backgroundColor: string,
 *   textColor: string,
 *   nodeTextFontSize: string,
 *   edgeTextFontSize: string,
 *   nodeTextBelowMargin: number,
 *   nodeUnfocusOpacity: number,
 *   edgeFocusOpacity: number,
 *   edgeFocusTextColor: string,
 *   edgeUnfocusOpacity: number,
 *   edgeUnfocusTextColor: string,
 *   svgWidth: number,
 *   svgHeight: number,
 * }} DrawConfig
 */

/**
 * @param {import('./graph.js').Graph} graph
 * @param {SVGElement} svg
 * @param {DrawConfig} [drawConfig={}]
 */
export function generateSvgHtml({ edges, nodes }, drawConfig, graphConfig) {
  function findNode(id) {
    return nodes.find((node) => node.id === id);
  }

  function calculatePerimeterPoint(pointA, pointB, radius) {
    const direction = pointB.minus(pointA);
    const distance = pointA.distanceTo(pointB);
    const scale = radius / distance; // Normalize the direction vector to the radius
    return pointA.plus(direction.multiplyScalar(scale));
  }

  function calculateMidpoint(pointA, pointB) {
    return pointA.plus(pointB).divideScalar(2);
  }

  function calculateBelowCenterPoint(point, radius, margin = 0) {
    return point.plus(new Point(0, radius + margin));
  }

  let svgHtmlBody = `
    ${createDefs(drawConfig.backgroundColor)}
    `;

  for (const [edgeIndex, edge] of edges.entries()) {
    const nodeA = findNode(edge.source);
    const nodeB = findNode(edge.target);

    if (!nodeA || !nodeB) {
      console.log("Edge source or target not found", {
        edge,
        nodeA,
        nodeB,
      });
      continue;
    }

    const startPoint = calculatePerimeterPoint(
      nodeA.point,
      nodeB.point,
      nodeA.radius,
    );
    const endPoint = calculatePerimeterPoint(
      nodeB.point,
      nodeA.point,
      nodeB.radius,
    );

    const midpoint = calculateMidpoint(startPoint, endPoint);
    const angle = startPoint.angleTo(endPoint);

    svgHtmlBody += createArrow(
      startPoint,
      endPoint,
      "black",
      drawConfig.edgeUnfocusOpacity,
      edgeIndex,
    );
    svgHtmlBody += createText({
      point: midpoint,
      text: edge.text,
      angle: angle,
      color: drawConfig.edgeUnfocusTextColor,
      fontSize: drawConfig.edgeTextFontSize,
      id: "edgeText" + edgeIndex,
    });
  }

  for (const node of nodes) {
    svgHtmlBody += createCircle(
      node.point,
      node.radius,
      node.color,
      node.id,
      node.link,
    );

    const belowCenterPoint = calculateBelowCenterPoint(
      node.point,
      node.radius,
      drawConfig.nodeTextBelowMargin,
    );
    svgHtmlBody += createText({
      point: belowCenterPoint,
      text: node.text,
      angle: 0,
      color: drawConfig.textColor,
      fontSize: drawConfig.nodeTextFontSize,
      id: "nodeText" + node.id,
    });
  }

  return createSvg(
    drawConfig.id,
    drawConfig.svgWidth,
    drawConfig.svgHeight,
    graphConfig.WIDTH,
    graphConfig.HEIGHT,
    drawConfig.backgroundColor,
    svgHtmlBody,
  );
}

export function generateSvgInteractiveScript(
  { edges, nodes },
  {
    nodeUnfocusOpacity,
    edgeFocusOpacity,
    edgeUnfocusOpacity,
    edgeUnfocusTextColor,
    edgeFocusTextColor,
    svgWidth,
    svgHeight,
    id,
  },
) {
  function findNode(id) {
    return nodes.find((node) => node.id === id);
  }
  let script = "";
  for (const node of nodes) {
    script += `const node${node.id} = document.getElementById("node${node.id}");`;
  }

  for (const [edgeIndex] of edges.entries()) {
    script += `const edgeText${edgeIndex} = document.getElementById("edgeText${edgeIndex}");`;
    script += `const edgeArrow${edgeIndex} = document.getElementById("edgeArrow${edgeIndex}");`;
  }

  const allNodeNeightbours = new Map();
  const allEdgeNeightbours = new Map();
  for (const [edgeIndex, edge] of edges.entries()) {
    const sourceId = findNode(edge.source)?.id;
    const targetId = findNode(edge.target)?.id;

    if (!sourceId || !targetId) {
      console.log("Edge source or target not found", {
        edge,
        sourceId,
        targetId,
      });
      continue;
    }

    let alreadyFoundNeightbours = allNodeNeightbours.get(sourceId) ?? [];
    alreadyFoundNeightbours.push(targetId);
    allNodeNeightbours.set(sourceId, alreadyFoundNeightbours);

    alreadyFoundNeightbours = allNodeNeightbours.get(targetId) ?? [];
    alreadyFoundNeightbours.push(sourceId);
    allNodeNeightbours.set(targetId, alreadyFoundNeightbours);

    let alreadyFoundEdgeNeightbours = allEdgeNeightbours.get(sourceId) ?? [];
    alreadyFoundEdgeNeightbours.push(edgeIndex);
    allEdgeNeightbours.set(sourceId, alreadyFoundEdgeNeightbours);

    alreadyFoundEdgeNeightbours = allEdgeNeightbours.get(targetId) ?? [];
    alreadyFoundEdgeNeightbours.push(edgeIndex);
    allEdgeNeightbours.set(targetId, alreadyFoundEdgeNeightbours);
  }

  const nodeIds = new Set(nodes.map((node) => node.id));
  const edgeIds = new Set(edges.map((_, index) => index));

  const focusAllScript = Array.from(nodeIds).reduce(
    (script, nodeId) =>
      script +
      `node${nodeId}.style.opacity = 1;
       nodeText${nodeId}.style.opacity = 1;\n`,
    "",
  );
  const focusAllScriptFunction = `function focusAll() {
    ${focusAllScript}
  }`;

  const unfocusAllEdgesScript = Array.from(edgeIds).reduce(
    (script, edgeIndex) =>
      script +
      `edgeText${edgeIndex}.setAttribute("fill", "${edgeUnfocusTextColor}");
      edgeArrow${edgeIndex}.style.opacity = ${edgeUnfocusOpacity};\n`,
    "",
  );
  const unfocusAllEdgesScriptFunction = `function unfocusAllEdges() {
    ${unfocusAllEdgesScript}
  }`;

  const updateFillFunction = `function updateFill(color, instances) {
    for (const [_idx,instance] of instances.entries()) {
      instance.setAttribute("fill", color);
    }
  }`;
  const updateOpacityFunction = `function updateOpacity(opacity, instances) {
    for (const [_idx, instance] of instances.entries()) {
      instance.style.opacity = opacity;
    }
  }`;

  for (const node of nodes) {
    const neightbours = new Set(allNodeNeightbours.get(node.id));
    const notNeightbours = nodeIds.difference(neightbours.add(node.id));

    const edgeNeightbours = new Set(allEdgeNeightbours.get(node.id));
    const edgeNotNeightbours = edgeIds.difference(edgeNeightbours);

    const focusNeightboursInstances = Array.from(neightbours)
      .map((neightbour) => `node${neightbour},nodeText${neightbour}`)
      .join(",");

    const unfocusNoNeightboursInstances = Array.from(notNeightbours)
      .map((notNeightbour) => `node${notNeightbour},nodeText${notNeightbour}`)
      .join(",");

    const focusEdgeNeightboursTextInstances = Array.from(edgeNeightbours)
      .map((edgeIndex) => `edgeText${edgeIndex}`)
      .join(",");

    const focusEdgeNeightboursArrowInstances = Array.from(edgeNeightbours)
      .map((edgeIndex) => `edgeArrow${edgeIndex}`)
      .join(",");

    const unfocusEdgeNoNeightboursTextInstances = Array.from(edgeNotNeightbours)
      .map((edgeIndex) => `edgeText${edgeIndex}`)
      .join(",");

    const unfocusEdgeNoNeightboursArrowInstances = Array.from(
      edgeNotNeightbours,
    )
      .map((edgeIndex) => `edgeArrow${edgeIndex}`)
      .join(",");
    script += `
node${node.id}.addEventListener("mouseenter", (event) => {
// focus
updateOpacity(1, [${focusNeightboursInstances}]); // focus neightbours

// unfocus
updateOpacity(${nodeUnfocusOpacity}, [${unfocusNoNeightboursInstances}]);

// focus
updateFill("${edgeFocusTextColor}", [${focusEdgeNeightboursTextInstances}])
updateOpacity(${edgeFocusOpacity}, [${focusEdgeNeightboursArrowInstances}]);

// unfocus
updateFill("${edgeUnfocusTextColor}", [${unfocusEdgeNoNeightboursTextInstances}]);
updateOpacity(${edgeUnfocusOpacity}, [${unfocusEdgeNoNeightboursArrowInstances}]);
});
node${node.id}.addEventListener("mouseleave", (event) => {
    focusAll();
    unfocusAllEdges();
  });
    `;
  }

  script += `
  ${focusAllScriptFunction}
  ${unfocusAllEdgesScriptFunction}
  ${updateFillFunction}
  ${updateOpacityFunction}
  `;
  script += `
  const graphSvg = document.getElementById("${id}")
	const onWheel = (event) => {
	  event.preventDefault()
		const viewBox = graphSvg.getAttribute("viewBox")
		if(viewBox){
			let [xx, yy, w, h] = viewBox.split(" ").map(Number)
  		const	zoomRatio = event.wheelDeltaY + event.wheelDeltaX > 0 ? 1.1 : 0.9
    	h *= zoomRatio
    	w *= zoomRatio
    	xx *= zoomRatio
    	yy *= zoomRatio
			graphSvg.setAttribute("viewBox", \`\$\{xx\} \$\{yy\} \$\{w\} \$\{h\}\`)
		}
	}
	graphSvg.addEventListener("wheel", onWheel)
	const onMouseMove = (event) => {
	  event.preventDefault()
	  console.log(event)
	  if (event.buttons === 0) {
		  return;
	  }
		const viewBox = graphSvg.getAttribute("viewBox")
		if(viewBox){
			let [xx, yy, w, h] = viewBox.split(" ").map(Number)
		  const biggerSide = ${Math.max(svgWidth, svgHeight)}
    	yy += -((event.movementY*(h*2))/biggerSide)
    	xx += -((event.movementX*(w*2))/biggerSide)
			graphSvg.setAttribute("viewBox", \`\$\{xx\} \$\{yy\} \$\{w\} \$\{h\}\`)
		}
	}
	graphSvg.addEventListener("mousemove", onMouseMove)

	`;

  return script;
}

/** @param {string} text * @returns {{width: number, height: number}} */
function svgTextSize(text) {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.position = "absolute";
  svg.style.visibility = "hidden";
  svg.style.left = Number.MIN_SAFE_INTEGER + "px";
  let textSvg = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textSvg.innerHTML = text;
  svg.appendChild(textSvg);
  document.body.appendChild(svg);
  const size = {
    width: textSvg.getBBox().width,
    height: textSvg.getBBox().height,
  };
  svg.remove();
  console.log(size);
  return size;
}
