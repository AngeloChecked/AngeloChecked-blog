import { generateSvgHtml, generateSvgInteractiveScript } from "./draw.js";
import { calculateGraph } from "./graph.js";

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
  svgWidth: 800,
  svgHeight: 400,
};

// deno-fmt-ignore
const nodes = [
  {
    id: 1,
    text: "name1",
    link: "https://www.google.it",
    color: "green",
    radius: 25,
  },
  {
    id: 2,
    text: "name2",
    link: "https://www.google.it",
    color: "blue",
    radius: 30,
  },
  {
    id: 3,
    text: "name3",
    link: "https://www.google.it",
    color: "yellow",
    radius: 20,
  },
  {
    id: 4,
    text: "name4",
    link: "https://www.google.it",
    color: "green",
    radius: 25,
  },
  {
    id: 5,
    text: "name5",
    link: "https://www.google.it",
    color: "blue",
    radius: 35,
  },
  {
    id: 6,
    text: "name6",
    link: "https://www.google.it",
    color: "yellow",
    radius: 27,
  },
  {
    id: 7,
    text: "name7",
    link: "https://www.google.it",
    color: "green",
    radius: 18,
  },
  {
    id: 8,
    text: "name8",
    link: "https://www.google.it",
    color: "blue",
    radius: 20,
  },
  {
    id: 9,
    text: "name9",
    link: "https://www.google.it",
    color: "yellow",
    radius: 20,
  },
  {
    id: 10,
    text: "name10",
    link: "https://www.google.it",
    color: "green",
    radius: 25,
  },
  {
    id: 11,
    text: "name11",
    link: "https://www.google.it",
    color: "blue",
    radius: 30,
  },
  {
    id: 12,
    text: "name12",
    link: "https://www.google.it",
    color: "yellow",
    radius: 20,
  },
  {
    id: 13,
    text: "name13",
    link: "https://www.google.it",
    color: "green",
    radius: 25,
  },
  {
    id: 14,
    text: "name14",
    link: "https://www.google.it",
    color: "blue",
    radius: 20,
  },
  {
    id: 15,
    text: "name15",
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

const graph = calculateGraph(graphConfig, nodes, edges);
const svgHtmlBody = generateSvgHtml(graph, drawConfig, graphConfig);
const script = generateSvgInteractiveScript(graph, drawConfig, {
  width: drawConfig.svgWidth,
  height: drawConfig.svgHeight,
});
document.body.innerHTML = svgHtmlBody;

const scriptElement = document.createElement("script");
scriptElement.innerHTML = script;
document.body.appendChild(scriptElement);
