import { createSvg, draw, graphInteractive } from "./draw.js";
import { calculateGraph } from "./graph.js";
import { Point } from "./Point.js";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const graphConfig = {
  WIDTH: 1000,
  HEIGHT: 1000,
  SPRING_CONSTANT: 0.1,
  REPULSION_CONSTANT: 1000,
  DAMPING: 0.85,
  ITERATIONS: 100,
  SPRING_LENGTH: 240,
  MARGIN: 120,
};

/** @type {import('./draw.js').DrawConfig} */
const drawConfig = {
  backgroundColor: "white",
  textColor: "black",

  nodeTextFontSize: "1.2em",
  edgeTextFontSize: "1.1em",
  nodeTextBelowMargin: 20,

  nodeUnfocusOpacity: 0.1,
  edgeFocusOpacity: 0.6,
  edgeFocusTextColor: `rgba(0,0,0,0.6)`,
  edgeUnfocusOpacity: 0.2,
  edgeUnfocusTextColor: `rgba(0,0,0,0.2)`,
};

const svgWidth = 800;
const svgHeight = 400;
const svg = createSvg(
  svgWidth,
  svgHeight,
  graphConfig.WIDTH,
  graphConfig.HEIGHT,
  drawConfig.backgroundColor,
);

const nodes = [
  {
    id: 1,
    text: "random_name_1_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "green",
    radius: 25,
  },
  {
    id: 2,
    text: "random_name_2_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "blue",
    radius: 30,
  },
  {
    id: 3,
    text: "random_name_3_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "yellow",
    radius: 20,
  },
  {
    id: 4,
    text: "random_name_4_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "green",
    radius: 25,
  },
  {
    id: 5,
    text: "random_name_5_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "blue",
    radius: 35,
  },
  {
    id: 6,
    text: "random_name_6_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "yellow",
    radius: 27,
  },
  {
    id: 7,
    text: "random_name_7_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "green",
    radius: 18,
  },
  {
    id: 8,
    text: "random_name_8_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "blue",
    radius: 20,
  },
  {
    id: 9,
    text: "random_name_9_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "yellow",
    radius: 20,
  },
  {
    id: 10,
    text: "random_name_10_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "green",
    radius: 25,
  },
  {
    id: 11,
    text: "random_name_11_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "blue",
    radius: 30,
  },
  {
    id: 12,
    text: "random_name_12_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "yellow",
    radius: 20,
  },
  {
    id: 13,
    text: "random_name_13_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "green",
    radius: 25,
  },
  {
    id: 14,
    text: "random_name_14_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "blue",
    radius: 20,
  },
  {
    id: 15,
    text: "random_name_15_abcdefghijklmnopqrstuvwxyz",
    link: "https://www.google.it",
    color: "yellow",
    radius: 20,
  },
];

const edges = [
  { source: 1, target: 2, text: "johnson smith" },
  { source: 2, target: 3, text: "doeington smith" },
  { source: 3, target: 4, text: "janet smith" },
  { source: 4, target: 1, text: "smithson smith" },
  { source: 5, target: 6, text: "janet smith" },
  { source: 6, target: 7, text: "doeington smith" },
  { source: 7, target: 8, text: "johnson smith" },
  { source: 8, target: 10, text: "smithhhhhson smith" },
  { source: 9, target: 1, text: "smithson smith" },
  { source: 10, target: 1, text: "johnson smith" },
  { source: 11, target: 1, text: "doeington smith" },
  { source: 15, target: 1, text: "janet smith" },
  { source: 12, target: 13, text: "smithson smith" },
  { source: 13, target: 12, text: "johnson smith" },
  { source: 14, target: 13, text: "doeington smith" },
];

const graph = calculateGraph(
  graphConfig,
  nodes,
  edges,
  // async (graph) => {
  // draw(graph, graphConfig.NODE_RADIUS, svg, drawConfig);
  // await sleep(0); }
);

draw(graph, svg, drawConfig);

const script = graphInteractive(graph, drawConfig, {
  width: svgWidth,
  height: svgHeight,
});
const scriptElement = document.createElement("script");
scriptElement.innerHTML = script;
document.body.appendChild(scriptElement);
