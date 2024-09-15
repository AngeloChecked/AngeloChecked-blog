import { serveFile } from "https://jsr.io/@std/http/1.0.5/file_server";
import { Article } from "./components/Article";
import { Base } from "./components/Base";
import { FileIndex } from "./components/FileIndex";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Menu } from "./components/Menu";
import { denoRestarted, websocketScript } from "./main";
import { styleCssFile } from "./style/mainCss";
import { markdown } from "./utils/markdown";
import { traverseFiles, fromStringToDomToString } from "./utils/utils";

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

  let content = "";

  const filePathSplitted = req.url.split("/").slice(3);
  const filePath = filePathSplitted.join("/");
  const pathFileOrFolderName = filePathSplitted[filePathSplitted.length - 1];
  if (filePath == "") {
    content = Home();
  } else if (filePath.endsWith(".md")) {
    const markdownContnet = await Deno.readTextFile("./" + filePath);
    content = Article({
      title: "My useless philosophical ramblings about the ecology of programming languages (and OOP is not Java)",
      content: markdown(markdownContnet),
    });
  } else if (new RegExp(/\.webp$|\.png$|\.jpg$|\.svg$/).test(
    pathFileOrFolderName
  )) {
    return serveFile(req, "./" + filePath);
  } else if (new RegExp(/\.css$/).test(
    pathFileOrFolderName
  )) {
    const fileData = await Deno.readFile("./" + filePath);
    return new Response(fileData, {
      headers: {
        "content-type": "text/css; charset=utf-8",
      },
    });
  } else {
    const fileIndex = FileIndex({ folderStructure, page: "./" + filePath });
    content = fileIndex;
  }

  const body = Base({
    title: "Angelo Ceccato Blog",
    description: "Angelo Ceccato Blog",
    content: content,
    scripts: websocketScript,
    style: styleCssFile.style,
    menu: Menu({ currentPage: "Home", pages: ["Home", "Graph", "About"] }),
    footer: Footer({ currentPage: "Home", pages: ["Home", "Graph", "About"] }),
  });

  const html = fromStringToDomToString(body);

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
