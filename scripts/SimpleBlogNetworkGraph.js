import { generateSvgHtml, generateSvgInteractiveScript } from "./draw.js";
import { calculateGraph } from "./graph.js";

/** @type {import('./graph.js').GraphConfig} */
const defaultGraphConfig = {
  WIDTH: 800,
  HEIGHT: 400,
  SPRING_CONSTANT: 0.1,
  REPULSION_CONSTANT: 1000,
  DAMPING: 0.85,
  ITERATIONS: 100,
  SPRING_LENGTH: 240,
  MARGIN: 120,
};

/** @type {import('./draw.js').DrawConfig} */
const defaultDrawConfig = {
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
  #graph;
  #drawConfig;
  #graphConfig;

  /** @param {import('./graph.js').Graph} graph */
  constructor(graph) {
    this.#graph = graph;
    this.#drawConfig = defaultDrawConfig;
    this.#graphConfig = defaultGraphConfig;
  }

  /** @param {Partial<import('./draw.js').DrawConfig>} drawConfig */
  drawConfig(drawConfig) {
    this.#drawConfig = { ...this.#drawConfig, ...drawConfig };
    return this;
  }

  /** @param {Partial<import('./graph.js').GraphConfig>} graphConfig */
  graphConfig(graphConfig) {
    this.#graphConfig = { ...this.#graphConfig, ...graphConfig };
    return this;
  }

  /** @returns {{ svgHtml: string, script: string }} */
  render() {
    const graph = calculateGraph(defaultGraphConfig, this.#graph);
    const svgHtml = generateSvgHtml(graph, this.#drawConfig, this.#graphConfig);
    const script = generateSvgInteractiveScript(graph, this.#drawConfig);
    return { svgHtml, script };
  }
}
