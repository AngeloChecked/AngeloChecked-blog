import { html } from "../deps/html.ts";
import { RoutedPage } from "../routes.ts";
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
  page: RoutedPage;
  site: { domain: string };
};

export const Base = (props: BaseProps) =>
  html`
  <!doctype html>
  <html lang="en">
    <head>
     <meta charset="UTF-8" />
     <link rel="icon" type="image/x-icon" href="/favicon.ico">
     <meta property="og:type" content="website">
     ${
    !props.page?.relativeWebsitePath ? "" : `
        <meta property="og:url" content="${props.site.domain}${props.page.relativeWebsitePath}">
        <meta property="twitter:url" content="${props.site.domain}${props.page.relativeWebsitePath}">
      `
  }
      <meta property="og:title" content="${props.title}">
      <meta name="twitter:title" content="${props.title}">

      <meta property="og:description" content="${props.description}">
      <meta name="twitter:description" content="${props.description}">
      <meta name="twitter:card" content="${props.description}">
     ${
    !props.page?.data?.thumbnail?.src ? "" : `
      <meta property="og:image" content="${props.site.domain}${props.page?.data?.thumbnail?.src}">
      <meta name="twitter:image" content="${props.site.domain}${props.page?.data?.thumbnail?.src}">
      `
  }
  
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
      ${ props.content.includes("lite-youtube") ? `<link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/lite-youtube-embed/0.3.3/lite-yt-embed.min.css" onload="this.onload=null;this.rel='stylesheet'"/>` : ""}
      <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css" onload="this.onload=null;this.rel='stylesheet'">
      <noscript>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
      </noscript>      
    </head>
    ${googleTagManagerScript()}
    <body>
      ${props.menu}
      <main class="${mainClass.className}">
        ${props.content}
      </main>
    </body>
    ${props.footer}
    ${ props.content.includes("lite-youtube") ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/lite-youtube-embed/0.3.3/lite-yt-embed.min.js"></script>' : ""}
  </html>
`;

function googleTagManagerScript() {
  return html`
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LE27PDG685"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  dataLayer.push(['js', new Date()]);
  dataLayer.push(['config', 'G-LE27PDG685']);
</script>
`;
}
