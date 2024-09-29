import { html } from "../deps/html.ts";
import { GraphNode, graphNodes } from "../graph/knowledgeGraph.ts";
import { colorFrom } from "./Graph.ts";

type AuthorData = { node: GraphNode; links: GraphNode[]; tags: GraphNode[] };

export function GraphNoteTable() {
  const author = new Map<string, AuthorData>();
  for (const node of graphNodes) {
    if (node.type == "author") {
      author.set(node.id, {
        node: node,
        links: [],
        tags: [],
      });
    }
  }

  for (const node of graphNodes) {
    if (node.type == "link") {
      if (!node.authorId) {
        continue;
      }
      const authorData = author.get(node.authorId);
      authorData && authorData.links.push(node);
    }
  }

  for (const node of graphNodes) {
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

  return html`
    <style>
      table,
      th,
      td {
        border: 1px solid white;
        border-collapse: collapse;
      }
    </style>
    <table style="font-size:12px; text-align: left; ">
      <thead>
        <tr>
          <th>Author</th>
          <th>Links</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody style="">
        ${Array.from(author.entries())
          .map(([, authorData]) => {
            return table(authorData);
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function table(authorData: AuthorData) {
  return html`
    <tr>
      <td>
        <a style="color: ${colorFrom("author")};" href=""
          >${authorData.node.data.name}</a
        >
      </td>
      <td>
        <ul>
          ${authorData.links
            .map((link) => {
              return html`<li><a style="color: ${colorFrom("link")};" href="${link.data.url}">${link.data.name}</li></li>`;
            })
            .join("")}
        </ul>
      </td>
      <td>
        <ul>
          ${authorData.tags
            .map((tag) => {
              return html`<li><a style="color: ${colorFrom("tag")};" href="">${tag.data.name}<a/></li>`;
            })
            .join("")}
        </ul>
      </td>
    </tr>
  `;
}
