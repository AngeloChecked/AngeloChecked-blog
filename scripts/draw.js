import { Point } from "./Point.js";

function createCircle(point, r, fill, id) {
  return `<circle id="node${id}" cx="${point.x}" cy="${point.y}" r="${r}" fill="${fill}" />`;
}

function createLine(pointA, pointB, stroke) {
  return `<line x1="${pointA.x}" y1="${pointA.y}" x2="${pointB.x}" y2="${pointB.y}" stroke="${stroke}" />`;
}

export function createArrow(pointA, pointB, stroke, opacity, id) {
  return `<line id="edgeArrow${id}" x1="${pointA.x}" y1="${pointA.y}" x2="${pointB.x}" y2="${pointB.y}" stroke="${stroke}" marker-end="url(#arrow)" opacity="${opacity}" />`;
}

function createText({ point, text, angle, color, fontSize, id }) {
  return `
  <text id="edgeText${id}" filter="url(#solid)" font-size="${fontSize}" x="${point.x}" y="${point.y}" fill="${color}"  text-anchor="middle" dominant-baseline="central" transform="rotate(${angle}, ${point.x}, ${point.y})">
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
  width,
  height,
  innerWidth = 1000,
  innerHeight = 1000,
  bgColor,
) {
  document.body.innerHTML = `
    <svg viewBox="-${innerWidth / 4} -${innerHeight / 4} ${innerWidth / 2} ${innerHeight / 2}" width="${width}" height="${height}" style="background-color: ${bgColor};"></svg>
  `;
  const svg = document.querySelector("svg");
  return svg;
}

/**
 * @typedef {{
 *   backgroundColor: string,
 *   textColor: string,
 *   nodeTextFontSize: number,
 *   nodeTextBelowMargin: number,
 *   edgeTextFontSize: number
 *   edgeOutFocusOpacity: number,
 * }} DrawConfig
 */

/**
 * @param {import('./graph.js').Graph} graph
 * @param {number} circleRadius
 * @param {SVGElement} svg
 * @param {DrawConfig} [config={}]
 */
export function draw({ edges, nodes }, circleRadius, svg, config = {}) {
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

  svg.innerHTML = `
    ${createDefs(config.backgroundColor)}
    `;

  for (const [edgeIndex, edge] of edges.entries()) {
    const nodeA = findNode(edge.source);
    const nodeB = findNode(edge.target);

    const startPoint = calculatePerimeterPoint(
      nodeA.point,
      nodeB.point,
      circleRadius,
    );
    const endPoint = calculatePerimeterPoint(
      nodeB.point,
      nodeA.point,
      circleRadius,
    );

    const midpoint = calculateMidpoint(startPoint, endPoint);
    const angle = startPoint.angleTo(endPoint);

    svg.innerHTML += createArrow(
      startPoint,
      endPoint,
      "black",
      config.edgeOutFocusOpacity,
      edgeIndex,
    );
    svg.innerHTML += createText({
      point: midpoint,
      text: edge.text.text,
      angle: angle,
      color: config.edgeOutFocusColor,
      fontSize: config.edgeTextFontSize,
      id: edgeIndex,
    });
  }

  for (const node of nodes) {
    svg.innerHTML += createCircle(node.point, circleRadius, "red", node.id);

    const belowCenterPoint = calculateBelowCenterPoint(
      node.point,
      circleRadius,
      20,
    );
    svg.innerHTML += createText({
      point: belowCenterPoint,
      text: node.text,
      angle: 0,
      color: config.textColor,
      fontSize: config.nodeTextFontSize,
    });
  }

  svg.innerHTML += createCircle(new Point(478, 0), 22, "blue");
  svg.innerHTML += createCircle(new Point(0, 250), 22, "blue");
}

export function graphInteractive({ edges, nodes }, config) {
  function findNode(id) {
    return nodes.find((node) => node.id === id);
  }

  const script = document.createElement("script");

  for (const node of nodes) {
    script.innerHTML += `
const node${node.id} = document.getElementById("node${node.id}");
`;
  }

  const allNodeNeightbours = new Map();
  const allEdgeNeightbours = new Map();
  for (const [edgeIndex, edge] of edges.entries()) {
    const sourceId = findNode(edge.source).id;
    const targetId = findNode(edge.target).id;

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
  const edgeIds = new Set(edges.map((edge, index) => index));
  for (const node of nodes) {
    const neightbours = new Set(allNodeNeightbours.get(node.id));
    const notNeightbours = nodeIds.difference(neightbours.add(node.id));

    const edgeNeightbours = new Set(allEdgeNeightbours.get(node.id));
    const edgeNotNeightbours = edgeIds.difference(edgeNeightbours);

    const focusNeightboursScript = Array.from(neightbours).reduce(
      (script, neightbour) => script + `node${neightbour}.style.opacity = 1;\n`,
      "",
    );

    const unfocusNoNeightboursScript = Array.from(notNeightbours).reduce(
      (script, notNeightbour) =>
        script + `node${notNeightbour}.style.opacity = 0.1;\n`,
      "",
    );

    const focusEdgeNeightboursScript = Array.from(edgeNeightbours).reduce(
      (script, edgeIndex) =>
        script +
        `document.getElementById("edgeText${edgeIndex}").setAttribute("fill", "rgba(0,0,0,1)");
        document.getElementById("edgeArrow${edgeIndex}").style.opacity = 1;\n`,
      "",
    );

    const unfocusEdgeNoNeightboursScr = Array.from(edgeNotNeightbours).reduce(
      (script, edgeIndex) =>
        script +
        `document.getElementById("edgeText${edgeIndex}").setAttribute("fill", "rgba(0,0,0,0.1)");
        document.getElementById("edgeArrow${edgeIndex}").style.opacity = 0.1;\n`,
      "",
    );

    const focusAllScript = Array.from(nodeIds).reduce(
      (script, nodeId) => script + `node${nodeId}.style.opacity = 1;\n`,
      "",
    );

    const unfocusFocusAllEdgesScript = Array.from(edgeIds).reduce(
      (script, edgeIndex) =>
        script +
        `document.getElementById("edgeText${edgeIndex}").setAttribute("fill", "rgba(0,0,0,0.1)");
        document.getElementById("edgeArrow${edgeIndex}").style.opacity = 0.1;\n`,
      "",
    );

    script.innerHTML += `
node${node.id}.addEventListener("mouseenter", (event) => {
    ${focusNeightboursScript}
    ${unfocusNoNeightboursScript}
    ${focusEdgeNeightboursScript}
    ${unfocusEdgeNoNeightboursScr}
  });
node${node.id}.addEventListener("mouseleave", (event) => {
    ${focusAllScript}
    ${unfocusFocusAllEdgesScript}
  });
    `;
  }

  document.body.appendChild(script);
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
