import { html } from "../deps/html.ts";
import { SimpleBlogNetworkGraph } from "../scripts/SimpleBlogNetworkGraph.js";
import type { Node, Edge } from "../scripts/graph.js";
import { graphNodes } from "../graph/knowledgeGraph.ts";
import { GraphNoteTable } from "./GraphNodeTable.ts";

export function colorFrom(type: string) {
  if (type == "link") {
    return "lightgreen";
  } else if (type == "author") {
    return "#ffcccb";
  } else if (type == "tag") {
    return "lightblue";
  }
  return "black";
}

export function Graph() {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  for (const node of graphNodes) {
    nodes.push({
      id: node.id,
      text: node.data.name,
      link: node.data?.url ?? "",
      color: colorFrom(node.type),
      radius: 5,
    });

    if (node.authorId) {
      edges.push({ source: node.authorId, target: node.id, text: "author" });
    }
    for (const tagId of node.tagId ?? []) {
      edges.push({ source: tagId, target: node.id, text: "tag" });
    }
  }

  const graph = new SimpleBlogNetworkGraph({ nodes, edges });
  graph.drawConfig({
    nodeTextFontSize: "10px",
    edgeTextFontSize: "10px",
    nodeTextBelowMargin: 15,
  });
  const { svgHtml, script } = graph.render();

  return html`
    <div>
      ${svgHtml} ${GraphNoteTable()}
      <script>
        ${script};
      </script>
    </div>
  `;
}
