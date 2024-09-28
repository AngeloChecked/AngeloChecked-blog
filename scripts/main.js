import { SimpleBlogNetworkGraph } from "./SimpleBlogNetworkGraph.js";

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

const simpleBlogNetworkGraph = new SimpleBlogNetworkGraph({ nodes, edges });

console.log(simpleBlogNetworkGraph.defaultDrawConfig);
const { svgHtml, script } = simpleBlogNetworkGraph.render();

document.body.innerHTML = svgHtml;
const scriptElement = document.createElement("script");
scriptElement.innerHTML = script;
document.body.appendChild(scriptElement);
