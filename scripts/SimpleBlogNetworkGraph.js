import { generateSvgHtml, generateSvgInteractiveScript } from "./draw.js";
import { calculateGraph } from "./graph.js";

/** @type {import('./graph.js').GraphConfig} */
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
  svgId: "simple-blog-network-graph",
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

export class SimpleBlogNetworkGraph {
  static get defaultDrawConfig() {
    return drawConfig;
  }

  static get defaultGraphConfig() {
    return graphConfig;
  }

  /** @param {import('./graph.js').Graph} graph */
  constructor(graph, drawConfig, graphConfig) {
    this.graph = graph;
    this.drawConfig = drawConfig || SimpleBlogNetworkGraph.defaultDrawConfig;
    this.graphConfig = graphConfig || SimpleBlogNetworkGraph.defaultGraphConfig;
  }

  /** @returns {{ svgHtml: string, script: string }} */
  render() {
    const graph = calculateGraph(graphConfig, this.graph);
    const svgHtml = generateSvgHtml(graph, this.drawConfig, this.graphConfig);
    const script = generateSvgInteractiveScript(graph, this.drawConfig);
    return { svgHtml, script };
  }
}
