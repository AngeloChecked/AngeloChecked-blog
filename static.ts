import { StaticServerRouter } from "./main.ts";

export class StaticFiles {
  constructor(
    private staticServerRouter: StaticServerRouter,
  ) {}
  build() {
    for (const route of this.staticServerRouter) {
      if (route.type === "static") {
        // where? and copy
        //return serveFile(req, "./static/" + filePath);
      }
      if (route.type === "generate") {
        // generate and filename
        const content = route.content();
      }
      if (route.type === "html") {
        // generate and filename
        const content = route.content();
      }
    }
  }
}
