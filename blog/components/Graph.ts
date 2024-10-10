import { html } from "../deps/html.ts";
import { SimpleBlogNetworkGraph } from "../scripts/SimpleBlogNetworkGraph.js";
import type { Node, Edge } from "../scripts/graph.js";
import { GraphNode, graphNodes, learningTag } from "../graph/knowledgeGraph.ts";
import { GraphNodeAuthorTable } from "./GraphNodeAuthorTable.ts";
import { myPersonalTechLimboElixirVsRustPost } from "../post/my_personal_tech_limbo_elixir_vs_rust.data.ts";
import { philosophicalRamblingsAboutEcologyProgrammingLanguagesAndOOPNotJava } from "../post/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java.data.ts";
import { GraphNodeFocusTable } from "./GraphNodeFocusTable.ts";

graphNodes.push(myPersonalTechLimboElixirVsRustPost);
graphNodes.push(
  philosophicalRamblingsAboutEcologyProgrammingLanguagesAndOOPNotJava,
);

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

export function Graph(props: { nodeIdToFocus?: string }) {
  let allNodes = graphNodes;

  if (props.nodeIdToFocus) {
    allNodes = filterNeightbours(props.nodeIdToFocus, allNodes);
  }

  const { nodes, edges } = adaptGraph(allNodes, props.nodeIdToFocus);

  const graph = new SimpleBlogNetworkGraph({ nodes, edges });
  graph.drawConfig({
    nodeTextFontSize: "10px",
    edgeTextFontSize: "10px",
    nodeTextBelowMargin: 15,
  });
  const { svgHtml, script } = graph.render();

  return html`
    <div>
      ${svgHtml}
      ${props.nodeIdToFocus
        ? GraphNodeFocusTable({
            focusNodeNeightboursNodes: allNodes,
            nodeIdToFocus: props.nodeIdToFocus,
          })
        : GraphNodeAuthorTable()}
      <script>
        ${script};
      </script>
    </div>
  `;
}

export function adaptGraph(allNodes: GraphNode[], nodeIdToFocus?: string) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  for (const node of allNodes) {
    nodes.push({
      id: node.id,
      text: node.data.title,
      link: "/graph/" + node.id + "/",
      color: colorFrom(node.type),
      radius: node.id === nodeIdToFocus ? 20 : 5,
    });

    if (node.authorId) {
      edges.push({ source: node.authorId, target: node.id, text: "author" });
    }
    for (const tagId of node.tagId ?? []) {
      edges.push({ source: tagId, target: node.id, text: "tag" });
    }
  }
  return { nodes, edges };
}

export function filterNeightbours(
  nodeIdToFocus: string,
  allNodes: GraphNode[],
) {
  const neightboursNodes: GraphNode[] = [];
  const nodeToFocus = allNodes.find((node) => node.id === nodeIdToFocus);
  const nodeToFocusAuthor = nodeToFocus?.authorId;
  const nodeToFocusTags = nodeToFocus?.tagId;
  if (nodeToFocus) {
    const allTags = new Set<string>();
    if (nodeToFocus.type === "tag") {
      allTags.add(nodeToFocus.id);
    } else {
      neightboursNodes.push(nodeToFocus);
    }
    nodeToFocus.tagId?.forEach((tag) => allTags.add(tag));
    for (const node of allNodes) {
      if (nodeToFocusTags?.includes(node.id)) {
        node.tagId?.forEach((tag) => allTags.add(tag));
        continue;
      }
      if (node.tagId?.includes(nodeToFocus.id)) {
        neightboursNodes.push(node);
        node.tagId?.forEach((tag) => allTags.add(tag));
        continue;
      }
      if (node.id === nodeToFocusAuthor) {
        neightboursNodes.push(node);
        node.tagId?.forEach((tag) => allTags.add(tag));
        continue;
      }
      if (node.authorId === nodeToFocus.id) {
        neightboursNodes.push(node);
        node.tagId?.forEach((tag) => allTags.add(tag));
        continue;
      }
    }
    for (const node of allNodes) {
      if (allTags.has(node.id)) {
        neightboursNodes.push(node);
      }
    }
  }
  return neightboursNodes;
}
