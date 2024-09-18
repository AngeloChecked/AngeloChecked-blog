import { html } from "../deps/html.ts";
import { ProcessedPage } from "../routes.ts";
import { mainClass } from "../style/mainCss.ts";

type BaseProps = {
  description: string;
  title: string;
  keywords?: string[];
  author?: string;
  content: string;
  scripts?: string;
  style?: string;
  menu: string;
  footer: string;
  page: ProcessedPage;
  site: { domain: string }
};

export const Base = (props: BaseProps) =>
  html`
  <!doctype html>
  <html lang="en">
    <head>
     <meta property="og:type" content="website">
     ${
    !props.page.relativeFilePath ? "" : `
        <meta property="og:url" content="https://${props.site.domain}${props.page.relativeFilePath}">
        <meta property="twitter:url" content="https://${props.site.domain}${props.page.relativeFilePath}">
      `
  }
      <meta property="og:title" content="${props.title}">
      <meta name="twitter:title" content="${props.title}">

      <meta property="og:description" content="${props.description}">
      <meta name="twitter:description" content="${props.description}">
      <meta name="twitter:card" content="${props.description}">
     ${
    !props.page.data?.thumbnail?.src ? "" : `
      <meta property="og:image" content="https://${props.site.domain}${props.page?.data?.thumbnail?.src}">
      <meta name="twitter:image" content="https://${props.site.domain}${props.page?.data?.thumbnail?.src}">
      `
  }
  
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="icon" type="image/x-icon" href="favicon.ico">
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
      ${googleTagManagerScript()}
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

function googleTagManagerScript() {
  return html`
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','G-LE27PDG685');</script>
<!-- End Google Tag Manager -->
`;
}
