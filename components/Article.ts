import { html } from "../deps/html.ts";

export function Article(props: { content: string; title: string }) {
  return html`
      <article>
        <h1>${props.title}</h1
        ${props.content}
      </article>
  `;
}
