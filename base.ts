import { html } from "./deps/html.ts";
import { markdownIt } from "./deps/markdown-it.ts";
import { styleCssFile } from "./mainCss.ts";



type BaseProps = {
  description: string;
  title: string;
  keywords?: string[];
  author?: string;
  content: string;
  scripts?: string;
  style?: string;
};

function markdown(str: TemplateStringsArray): string {
  const md = markdownIt()
  const result = md.render(str.toString());
  return result
} 

const a = markdown`
  # hello
  ## world

  Mi chiamo markdown e *sono* colorato

  wooow
`

export const Base = (props: BaseProps) => html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta charset="UTF-8" />
      <meta name="description" content="${props.description}" />
      ${props.keywords
        ? `<meta name="keywords" content="${props.keywords?.join(", ")}">`
        : ""}
      ${props.author ? ` <meta name="author" content="${props.author}">` : ""}
      <title>${props.title}</title>
      <link rel="stylesheet" href="style.css" />
      ${props.scripts ?? ""}
      ${props.style ?? ""}
    </head>
    <body>
      <main class="${styleCssFile.mainClass}">
      ${props.content}
      ${a}
      </main>
    </body>
  </html>
`;

