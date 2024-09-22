import { serveFile } from "https://jsr.io/@std/http/1.0.5/file_server.ts";
import { Base } from "./components/Base.ts";
import { Footer } from "./components/Footer.ts";
import { Menu } from "./components/Menu.ts";
import { getPageFromRoute, RoutedPage } from "./routes.ts";
import { styleCssFile } from "./style/mainCss.ts";
import { fromStringToDomToString, traverseFiles } from "./utils/utils.ts";
import { html } from "./deps/html.ts";
import { createPageHtml, Router, StaticServerRouter } from "./main.ts";

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

export class Server {
  private denoRestarted = true;
  constructor(
    private domain: string,
    private staticServerRouter: StaticServerRouter,
    private router: Router
  ) {}


  serve() {
    Deno.serve(async (req) => {
      if (req.headers.get("upgrade") === "websocket") {
        const { socket, response } = Deno.upgradeWebSocket(req);
        socket.addEventListener("open", () => {
          if (this.denoRestarted) {
            socket.send("reload");
            this.denoRestarted = false;
          }
        });
        return response;
      }

      const folderStructure = await traverseFiles("./post");
      const filePathSplitted = req.url.split("/").slice(3);
      const filePath = filePathSplitted.join("/");
      const pathFileOrFolderName =
        filePathSplitted[filePathSplitted.length - 1];

      for (const route of this.staticServerRouter) {
        if (route.type === "static") {
          if (route.condition(pathFileOrFolderName)) {
            return serveFile(req, "./static/" + filePath);
          }
        }
        if (route.type === "generate") {
          if (route.condition(pathFileOrFolderName)) {
            const content = route.content({ domain: this.domain });
            return new Response(content, {
              headers: { "content-type": route.contentType },
            });
          }
        }

      }

      const page: RoutedPage | undefined = getPageFromRoute(
        this.router,
        filePath,
        folderStructure,
      );
      const html = createPageHtml(page!, this.domain, websocketScript)

      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    });
  }
}

