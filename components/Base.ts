import { html } from "../deps/html.ts";
import { mainClass } from "../style/mainCss.ts";

type BaseProps = {
  description: string;
  title: string;
  keywords?: string[];
  author?: string;
  content: string;
  scripts?: string;
  style?: string;
  menu:string;
  footer: string;
};

export const Base = (props: BaseProps) =>
  html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta charset="UTF-8" />
      <meta name="description" content="${props.description}" />
      ${
    props.keywords
      ? `<meta name="keywords" content="${props.keywords?.join(", ")}">`
      : ""
  }
      ${props.author ? ` <meta name="author" content="${props.author}">` : ""}
      <title>${props.title}</title>
      ${props.scripts ?? ""}
      ${props.style ?? ""}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
    </head>
    <body>
      ${props.menu}
      <main class="${mainClass.className}">
        ${props.content}
      </main>
    </body>
    ${props.footer}
  </html>
`;
