import { createSvg, draw, graphInteractive } from "./draw.js";
import { calculateGraph } from "./graph.js";
import { Point } from "./Point.js";

function randomPoint(width, height) {
  return () =>
    new Point(
      (Math.random() * width) / 2 - width / 4,
      (Math.random() * height) / 2 - height / 4,
    );
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const graphConfig = {
  WIDTH: 1000,
  HEIGHT: 1000,
  NODE_RADIUS: 30,
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
  nodeTextBelowMargin: 20,
  nodeOutFocusOpacity: 0.5,

  edgeTextFontSize: "1.1em",
  edgeOutFocusColor: "rgba(0,0,0, 0.5)",
  edgeOutFocusOpacity: 0.5,
};

const randPoint = randomPoint(graphConfig.WIDTH, graphConfig.HEIGHT);

const svg = createSvg(
  800,
  400,
  graphConfig.WIDTH,
  graphConfig.HEIGHT,
  drawConfig.backgroundColor,
);

const nodes = [
  {
    id: 1,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_1_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 2,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_2_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 3,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_3_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 4,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_4_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 5,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_5_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 6,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_6_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 7,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_7_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 8,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_8_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 9,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_9_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 10,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_10_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 11,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_11_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 12,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_12_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 13,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_13_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 14,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_14_abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: 15,
    point: randPoint(),
    xpoint: new Point(0, 0),
    text: "random_name_15_abcdefghijklmnopqrstuvwxyz",
  },
];

const JOHNSON_SMITH = { text: "johnson smith" };
const DOEINGTON_SMITH = { text: "doeington smith" };
const JANET_SMITH = { text: "janet smith" };
const SMITHSON_SMITH = { text: "smithson smith" };
const SMITHHHHHSON_SMITH = { text: "smithhhhhson smith" };

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

const graph = calculateGraph(
  graphConfig,
  nodes,
  edges,
  // async (graph) => {
  // draw(graph, graphConfig.NODE_RADIUS, svg, drawConfig);
  // await sleep(0); }
);

draw(graph, graphConfig.NODE_RADIUS, svg, drawConfig);
graphInteractive(graph, drawConfig);
