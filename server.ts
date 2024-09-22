import { html } from "./deps/html.ts";
import { serveFile } from "./deps/serveFiles.ts";
import { StaticServerRouter } from "./main.ts";

export const websocketScript = (Deno.args[0] !== "serve") ? "" : html`
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
    private staticServerRouter: StaticServerRouter,
  ) {}

  serve() {
    Deno.serve((req) => {
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

      const filePathSplitted = req.url.split("/").slice(3);
      const filePath = filePathSplitted.join("/");
      const pathFileOrFolderName =
        filePathSplitted[filePathSplitted.length - 1];

      for (const route of this.staticServerRouter) {
        if (route.type === "static") {
          if (route.condition(pathFileOrFolderName)) {
            return serveFile(req, route.folder + "/" + filePath);
          }
        }
        if (route.type === "generate") {
          if (route.condition(pathFileOrFolderName)) {
            const content = route.content();
            return new Response(content, {
              headers: { "content-type": route.contentType },
            });
          }
        }
        if (route.type === "html") {
          if (route.condition(filePath)) {
            const content = route.content();
            return new Response(content, {
              headers: { "content-type": "text/html; charset=utf-8" },
            });
          }
        }
      }
      return new Response("error");
    });
  }
}
