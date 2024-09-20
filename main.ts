import { html } from "./deps/html.ts";
import { Base } from "./components/Base.ts";
import { styleCssFile } from "./style/mainCss.ts";
import { serveFile } from "jsr:@std/http@1.0.5/file-server";
import { Menu } from "./components/Menu.ts";
import { Footer } from "./components/Footer.ts";
import {
  getPageFromRoute,
  postPages,
  ProcessedPage,
  router,
} from "./routes.ts";
import { fromStringToDomToString, traverseFiles } from "./utils/utils.ts";
import { FeedRss } from "./components/FeedRss.ts";

const websocketScript = html`
<script>
function websocket(){
    let socket = new WebSocket("ws://localhost:8000");

    socket.addEventListener("message", (event) => {
      if(event.data === "reload"){
          window.location.reload()
      }
    });
    socket.addEventListener("close", (event) => {
       socket = null
       setTimeout(websocket, 1000)
    });
}
websocket()
</script>
`;

export type Router = {
  [path: string]: ProcessedPage[] | undefined;
};

const developmentMode = true;
let denoRestarted = true;
const domain = developmentMode ? "localhost:8000" : "angeloceccato.it";
Deno.serve(async (req) => {
  if (req.headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(req);
    socket.addEventListener("open", () => {
      if (denoRestarted) {
        socket.send("reload");
        denoRestarted = false;
      }
    });
    return response;
  }

  const folderStructure = await traverseFiles("./post");
  const filePathSplitted = req.url.split("/").slice(3);
  const filePath = filePathSplitted.join("/");
  const pathFileOrFolderName = filePathSplitted[filePathSplitted.length - 1];

  if (
    new RegExp(/\.webp$|\.png$|\.jpg$|\.svg$|\.css$/).test(pathFileOrFolderName)
  ) {
    return serveFile(req, "./" + filePath);
  }

  const page: ProcessedPage | undefined = getPageFromRoute(
    router,
    filePath,
    folderStructure,
  );

  if (
    new RegExp(/\.rss$/).test(pathFileOrFolderName)
  ) {
    const rssFeedFile = FeedRss({
      feedItems: postPages,
      domain: domain,
      latestBuildDate: (new Date()).toISOString(),
    });
    return new Response(rssFeedFile, {
      headers: { "content-type": "application/rss+xml" },
    });
  }

  const { allMenus } = getMenuStatus(router);
  const titleCompanionAndFallback = "Angelo Ceccato Blog";
  const body = Base({
    title: (page?.data?.title ? page.data.title + " - " : "") +
      titleCompanionAndFallback,
    description: page?.data?.description ?? titleCompanionAndFallback,
    content: page?.content ?? "404",
    scripts: websocketScript,
    style: styleCssFile.style,
    menu: Menu({
      currentPageMenu: page?.data?.menu?.menuName,
      menus: allMenus,
    }),
    footer: Footer({
      currentPageMenu: page?.data?.menu?.menuName,
      menus: allMenus,
    }),
    page: page!,
    site: { domain: domain },
  });

  const html = fromStringToDomToString(body);

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});

export type MenuInfo = {
  menuName: string;
  url: string;
};

function getMenuStatus(router: Router) {
  const routes = Object.entries(router);
  const menus = [];
  for (const [route, pages] of routes) {
    for (const page of pages ?? []) {
      if (page.data?.menu) {
        menus.push({
          order: page.data?.menu.order ?? 99,
          menuName: page.data?.menu.menuName,
          url: "/" + route + (page.relativeFilePath ?? ""),
        });
      }
    }
  }
  menus.sort((a, b) => a.order < b.order ? -1 : 1);
  return { allMenus: menus };
}
