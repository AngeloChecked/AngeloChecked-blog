import { RoutedPage } from "./routes.ts";
import { Server } from "./websiteServe.ts";

export type Router = {
  [path: string]: RoutedPage[];
};

export const buildDate = (new Date()).toISOString();

export type StaticServerRouter = {
  type: "static";
  condition: (file: string) => boolean;
}[];

const staticAndServerRouter: StaticServerRouter = [
  {
    type: "static",
    condition: (file: string) =>
      new RegExp(/\.webp$|\.png$|\.jpg$|\.svg$|\.css$/).test(file),
  },
];

if (Deno.args[0] == "serve") {
  const domain = "http://localhost:8000";
  const server = new Server(domain, buildDate, staticAndServerRouter);
  server.serve();
}

if (Deno.args[0] == "build") {
  const domain = "https://angeloceccato.it";
}

export type MenuInfo = {
  menuName: string;
  url: string;
};
