import { html } from "./deps/html.ts";
import { DOMParser } from "./deps/dom.ts";
import { Base } from "./base.ts";
import { styleCssFile } from "./mainCss.ts"
import { FileIndex } from "./FileIndex.ts";
import { traverseFiles } from "./utils.ts";

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

const folderStructure = await traverseFiles("./posts")

let denoRestarted = true
Deno.serve((req) => {
  if (req.headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(req);
    socket.addEventListener("open", () => {
      if (denoRestarted) {
          socket.send("reload");
          denoRestarted = false
      }
    });
    return response;
  }


  const filePath = req.url.split("/").slice(3).join("/")
  const fileIndex = FileIndex({ folderStructure, page: "./" + filePath })

  const body = Base({
    title: "Angelo Ceccato Blog",
    description: "Angelo Ceccato Blog",
    content: fileIndex,
    scripts: websocketScript,
    style: styleCssFile.style
  });

  const parser = new DOMParser();
  const { documentElement } = parser.parseFromString(body,"text/html")
  const html = `<!DOCTYPE html>\n${documentElement?.outerHTML || ""}`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
});
