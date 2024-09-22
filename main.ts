import { html } from "./deps/html.ts";
import { RoutedPage } from "./routes.ts";
import { Server } from "./websiteServe.ts";

export type Router = {
  [path: string]: RoutedPage[];
};

const developmentMode = true;
export const domain = developmentMode
  ? "http://localhost:8000"
  : "https://angeloceccato.it";
export const buildDate = (new Date()).toISOString();

if (Deno.args[0] == "serve") {

  const server = new Server(domain, buildDate);
  server.serve();
}

if (Deno.args[0] == "build") {

}

export type MenuInfo = {
  menuName: string;
  url: string;
};
