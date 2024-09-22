import { Robots } from "./components/Robots.ts";
import { SiteMap } from "./components/SiteMap.ts";
import { RoutedPage, router } from "./routes.ts";
import { Server } from "./websiteServe.ts";

export type Router = {
  [path: string]: RoutedPage[];
};

export const buildDate = (new Date()).toISOString();

type Route =
  | { type: "static"; condition: (file: string) => boolean }
  | {
    type: "generate";
    condition: (file: string) => boolean;
    content: (site: Site) => string;
    contentType: string;
  };

export type StaticServerRouter = Route[];

type Site = {
  domain: string;
};

const staticAndServerRouter: StaticServerRouter = [
  {
    type: "static",
    condition: (file: string) =>
      new RegExp(/\.webp$|\.png$|\.jpg$|\.svg$|\.css$/).test(file),
  },
  {
    type: "generate",
    condition: (file) => new RegExp(/sitemap\.xml$/).test(file),
    content: (site: Site) =>
      SiteMap({
        router: router,
        latestBuildDate: buildDate,
        domain: site.domain,
      }),
    contentType: "application/rss+xml",
  },

  {
    type: "generate",
    condition: (file: string) => new RegExp(/robots\.txt$/).test(file),
    content: (site: Site) =>
      Robots({
        domain: site.domain,
      }),
    contentType: "text/plain",
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
