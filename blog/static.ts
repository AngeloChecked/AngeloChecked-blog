import { StaticServerRouter } from "./main.ts";
import { traverseFilesFlat } from "./utils/utils.ts";
import { Buffer } from "node:buffer";

export class StaticFiles {
  constructor(
    private staticServerRouter: StaticServerRouter,
    private buildPath: string,
  ) {}
  async build() {
    try {
        await Deno.remove(this.buildPath, { recursive: true  });
    } catch {
      console.log("dist folder not found")
    }
    for (const route of this.staticServerRouter) {
      if (route.type === "static") {
        const files = await traverseFilesFlat(route.folder);
        for (const file of files) {
          if (route.condition(file)) {
            const folder = getFolderFromPath(file);
            const targetPosition = this.buildPath + file;
            console.log({ log: `creating: '${targetPosition}'` });
            await Deno.mkdir(this.buildPath + folder, { recursive: true });
            await Deno.copyFile(route.folder + file, targetPosition);
          }
        }
      }
      if (route.type === "generate") {
        const targetPathFileName = this.buildPath + route.relativeFileNamePath;
        console.log({ log: `creating: '${targetPathFileName}'` });
        const data = new Uint8Array(Buffer.from(route.content()));
        await Deno.writeFile(targetPathFileName, data);
      }
      if (route.type === "html") {
        const fileName = route.relativeWebsitePath.endsWith(".html")
          ? ""
          : "index.html";
        const targetPathFileName =
          this.buildPath + route.relativeWebsitePath + fileName;
        const folder = getFolderFromPath(targetPathFileName);
        console.log({ log: `creating: '${targetPathFileName}'` });
        await Deno.mkdir(folder, { recursive: true });
        const data = new Uint8Array(Buffer.from(route.content()));
        await Deno.writeFile(targetPathFileName, data);
      }
    }
  }
}

function getFolderFromPath(file: string) {
  return file.split("/").slice(undefined, -1).join("/");
}
