import { html } from "../deps/html.ts";
import { GraphNode, graphNodes } from "../graph/knowledgeGraph.ts";
import { colorFrom } from "./Graph.ts";

type AuthorData = { node: GraphNode; links: GraphNode[]; tags: GraphNode[] };

export function GraphNodeAuthorTable() {
  let allNodes = graphNodes;

  const author = new Map<string, AuthorData>();
  for (const node of allNodes) {
    if (node.type == "author") {
      author.set(node.id, {
        node: node,
        links: [],
        tags: [],
      });
    }
  }

  for (const node of allNodes) {
    if (node.type == "link" || node.type == "post") {
      if (!node.authorId) {
        continue;
      }
      const authorData = author.get(node.authorId);
      authorData && authorData.links.push(node);
    }
  }

  for (const node of allNodes) {
    if (node.type == "tag") {
      author: for (const [_, authorData] of author.entries()) {
        const authorTagFound = authorData.node!.tagId!.find(
          (tagId: string) => tagId == node.id,
        );
        if (authorTagFound) {
          authorData.tags.push(node);
          continue author;
        }
        for (const link of authorData.links) {
          const linkTagFound = link.tagId!.find(
            (tagId: string) => tagId == node.id,
          );
          if (linkTagFound) {
            authorData.tags.push(node);
            continue author;
          }
        }
      }
    }
  }

  const authors = Array.from(author.values());
  return html`
    <style>
      table,
      th,
      td {
        border: 1px solid white;
        border-collapse: collapse;
      }
    </style>
    ${authors.length > 0
      ? `<table style="width: 100%;font-size:12px; text-align: left; ">
      <thead>
        <tr>
          <th>Author</th>
          <th>Links</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody style="">
        ${authors.map((authorData) => table(authorData)).join("")}
      </tbody>
    </table>`
      : ""}
  `;
}

function table(authorData: AuthorData) {
  return html`
    <tr>
      <td>
        <ul>
          <li>
            <a
              style="color: ${colorFrom("author")};"
              href="/graph/${authorData.node.id}/"
              >${authorData.node.data.title}</a
            >
          </li>
        </ul>
      </td>
      <td>
        <ul>
          ${authorData.links
            .map((link) => {
              return html`<li><a style="color: ${colorFrom("link")};" href="/graph/${link.id}/">${link.data.title}</li></li>`;
            })
            .join("")}
        </ul>
      </td>
      <td>
        <ul>
          ${authorData.tags
            .map((tag) => {
              return html`<li><a style="color: ${colorFrom("tag")};" href="/graph/${tag.id}/">${tag.data.title}<a/></li>`;
            })
            .join("")}
        </ul>
      </td>
    </tr>
  `;
}
