import { html } from "../deps/html.ts";
import { GraphNode, graphNodes } from "../graph/knowledgeGraph.ts";
import { colorFrom } from "./Graph.ts";

export function GraphNodeFocusTable(props: {
  focusNodeNeightboursNodes: GraphNode[];
  nodeIdToFocus?: string;
}) {
  const nodeToFocus = props.focusNodeNeightboursNodes.find(
    (node) => node.id === props.nodeIdToFocus,
  );

  return html`
    ${nodeToFocus
      ? describeGraph(nodeToFocus, props.focusNodeNeightboursNodes)
      : ""}
  `;
}

function describeGraph(
  nodeToFocus: GraphNode,
  neightbours: GraphNode[],
): string {
  const links = neightbours.filter((node) => node.type === "link");
  const posts = neightbours.filter((node) => node.type === "post");
  const authors = neightbours.filter((node) => node.type === "author");
  const tags = neightbours.filter((node) => node.type === "tag");
  if (nodeToFocus.id == "programming-languages") {
    console.log({ authors });
  }

  return html`
    <h1>${nodeToFocus.data.title}</h1>
    ${nodeToFocus.data.description
      ? `<p>${nodeToFocus.data.description}</p>`
      : ""}
    <ul>
      <li><b>type: </b>${nodeToFocus?.type}</li>
      ${nodeToFocus.data.website
        ? ` <li><b>website: </b><a href="${nodeToFocus.data.website}">${nodeToFocus.data.website}</a></li >`
        : ""}
      ${nodeToFocus.data.github
        ? `<li><b>github: </b><a href="${nodeToFocus.data.github}">${nodeToFocus.data.github}</a></li>`
        : ""}
      ${nodeToFocus.data.url
        ? `<li><b>url: </b><a href="${nodeToFocus.data.url}">${nodeToFocus.data.url}</a></li>`
        : ""}
      ${describe(tags, "tags")} ${describe(links, "links")}
      ${describe(posts, "posts")} ${describe(authors, "authors")}
    </ul>
  `;
}

function describe(graphNodes: GraphNode[], label: string) {
  return html`
    ${graphNodes.length
      ? `<li>
            <b>${label}: </b>
            <ul>
              ${graphNodes.map((node) => `<li><a href="/graph/${node.id}/">${node.data.title}</a></li>`).join("")}
            </ul>
          </li>
         `
      : ""}
  `;
}
