import { createSvg, draw } from "./draw.js";
import { calculateGraph } from "./graph.js";
import { Point } from "./Point.js";

function randomPoint(width, height) {
  return () =>
    new Point(
      Math.random() * width - width / 2,
      Math.random() * height - height / 2,
    );
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const graphConfig = {
  WIDTH: 800,
  HEIGHT: 600,
  NODE_RADIUS: 40,
  SPRING_LENGTH: 150,
  SPRING_CONSTANT: 0.1,
  REPULSION_CONSTANT: 1000,
  DAMPING: 0.85,
  ITERATIONS: 100,
  MARGIN: 50,
};

const randPoint = randomPoint(graphConfig.WIDTH, graphConfig.HEIGHT);
const svg = createSvg(graphConfig.WIDTH, graphConfig.HEIGHT);

const nodes = [
  { id: 1, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 2, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 3, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 4, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 5, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 6, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 7, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 8, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 9, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 10, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 11, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 12, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 13, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 14, point: randPoint(), xpoint: new Point(0, 0) },
  { id: 15, point: randPoint(), xpoint: new Point(0, 0) },
];

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

function createText(text) {
  const size = svgTextSize(text);
  return { text, width: size.width, height: size.height };
}

const JOHNSON_SMITH = createText("johnson smith");
const DOEINGTON_SMITH = createText("doeington smith");
const JANET_SMITH = createText("janet smith");
const SMITHSON_SMITH = createText("smithson smith");
const SMITHHHHHSON_SMITH = createText("smithhhhhson smith");

const edges = [
  { source: 1, target: 2, text: JOHNSON_SMITH },
  { source: 2, target: 3, text: DOEINGTON_SMITH },
  { source: 3, target: 4, text: JANET_SMITH },
  { source: 4, target: 1, text: SMITHSON_SMITH },
  { source: 5, target: 6, text: JANET_SMITH },
  { source: 6, target: 7, text: DOEINGTON_SMITH },
  { source: 7, target: 8, text: JOHNSON_SMITH },
  { source: 8, target: 10, text: SMITHHHHHSON_SMITH },
  { source: 9, target: 1, text: SMITHSON_SMITH },
  { source: 10, target: 1, text: JOHNSON_SMITH },
  { source: 11, target: 1, text: DOEINGTON_SMITH },
  { source: 15, target: 1, text: JANET_SMITH },
  { source: 12, target: 13, text: SMITHSON_SMITH },
  { source: 13, target: 12, text: JOHNSON_SMITH },
  { source: 14, target: 13, text: DOEINGTON_SMITH },
];

calculateGraph(graphConfig, nodes, edges, async (graph) => {
  draw(graph, graphConfig.NODE_RADIUS, svg);
  await sleep(10);
});
