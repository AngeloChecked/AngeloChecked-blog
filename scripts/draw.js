function createCircle(point, r, fill) {
  return `<circle cx="${point.x}" cy="${point.y}" r="${r}" fill="${fill}" />`;
}

function createLine(pointA, pointB, stroke) {
  return `<line x1="${pointA.x}" y1="${pointA.y}" x2="${pointB.x}" y2="${pointB.y}" stroke="${stroke}" />`;
}

export function createArrow(pointA, pointB, stroke) {
  return `<line x1="${pointA.x}" y1="${pointA.y}" x2="${pointB.x}" y2="${pointB.y}" stroke="${stroke}" marker-end="url(#arrow)" />`;
}

function createText(point, text, angle, color, backgroundColor) {
  return `
  <text filter="url(#solid)" x="${point.x}" y="${point.y}" fill="${color}"  text-anchor="middle" dominant-baseline="central" transform="rotate(${angle}, ${point.x}, ${point.y})">
         ${text}
       </text>
       </g>`;
}

function createDefs(arrowTextBgColor = "gray") {
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

export function createSvg(width, height) {
  document.body.innerHTML = `
    <svg viewBox="${-width / 2} ${-height / 2} ${width} ${height}" width="${width}" height="${height}" style="background-color: gray;"></svg>
    ${createDefs()}
  `;
  const svg = document.querySelector("svg");
  return svg;
}

export function draw({ edges, nodes }, circleRadius, svg) {
  function findNode(id) {
    return nodes.find((node) => node.id === id);
  }

  function calculatePerimeterPoint(pointA, pointB, radius) {
    const direction = pointB.minus(pointA);
    const distance = pointA.distanceTo(pointB);
    const scale = radius / distance; // Normalize the direction vector to the radius
    return pointA.plus(direction.multiplyScalar(scale));
  }

  function calculateAngle(pointA, pointB) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    return Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees
  }

  function calculateMidpoint(pointA, pointB) {
    return pointA.plus(pointB).divideScalar(2);
  }

  svg.innerHTML = `
    ${createDefs()}
    `;

  for (let edge of edges) {
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

    svg.innerHTML += createArrow(startPoint, endPoint, "black");
    svg.innerHTML += createText(midpoint, edge.text, angle, "black", "gray");
  }

  for (let node of nodes) {
    svg.innerHTML += createCircle(node.point, circleRadius, "red");
  }
}
