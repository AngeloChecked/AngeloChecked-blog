import { html } from "./deps/html.ts";
import { Base } from "./components/Base.ts";
import { styleCssFile } from "./style/mainCss.ts";
import { serveFile } from "jsr:@std/http@1.0.5/file-server";
import { Menu } from "./components/Menu.ts";
import { Footer } from "./components/Footer.ts";
import { getPageFromRoute, Page, pagesFromFolder, router } from "./routes.ts";
import { fromStringToDomToString, traverseFiles } from "./utils/utils.ts";
import { Home } from "./components/Home.ts";

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

export type Route = {
  [path: string]: Partial<Page>[] | undefined;
};

let denoRestarted = true;
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

  const page: Page | undefined = getPageFromRoute(
    router,
    filePath,
    folderStructure,
  );

  const menuPageIds = ["Home", "Graph", "About"];

  const body = Base({
    title: page?.title ?? "",
    description: "Angelo Ceccato Blog",
    content: page?.content ?? "404",
    scripts: websocketScript,
    style: styleCssFile.style,
    menu: Menu({ currentPage: "Home", pages: menuPageIds }),
    footer: Footer({ currentPage: "Home", pages: menuPageIds }),
  });

  const html = fromStringToDomToString(body);

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
