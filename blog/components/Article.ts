import { html } from "../deps/html.ts";

export function Article(props: { content: string; title: string }) {
  return html`
      <article>
        <h1>${props.title}</h1
        ${props.content}
        <div class="giscus">
        </div>
      </article>
      <script src="https://giscus.app/client.js"
              data-repo="AngeloChecked/AngeloChecked-blog"
              data-repo-id="R_kgDOM5jfhw"
              data-category="General"
              data-category-id="DIC_kwDOM5jfh84CjXw0"
              data-mapping="title"
              data-strict="0"
              data-reactions-enabled="1"
              data-emit-metadata="0"
              data-input-position="bottom"
              data-theme="dark_tritanopia"
              data-lang="en"
              data-loading="lazy"
              crossorigin="anonymous"
              async>
      </script>
  `;
}
