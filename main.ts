import { NotFound } from "./components/404.ts";
import { Home } from "./components/Home.ts";
import { Posts } from "./components/Posts.ts";
import { Robots } from "./components/Robots.ts";
import { SiteMap } from "./components/SiteMap.ts";
import { buildRoute, pagesFromFolder, RoutedPage } from "./routes.ts";
import { sameAsVar } from "./utils/utils.ts";
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

const postPages = await pagesFromFolder("./post");
const docsPages = await pagesFromFolder("./docs");
const postRoute = buildRoute({ "post": postPages });
const docsRoute = buildRoute({ "docs": docsPages });
const graphRoute = buildRoute({ "graph": [] });
const notFoundRoute = buildRoute({
  "404": [{
    id: sameAsVar({ NotFound }),
    content: NotFound(),
  }],
});
const homeRoute = buildRoute({
  "": [{
    data: {
      menu: { menuName: sameAsVar({ Home }), order: 1 },
      title: sameAsVar({ Home }),
    },
    id: sameAsVar({ Home }),
    content: Home({ posts: Posts({ posts: postRoute["post"]! }) }),
  }],
});
const router: Router = {
  ...postRoute,
  ...docsRoute,
  ...graphRoute,
  ...notFoundRoute,
  ...homeRoute,
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
  const server = new Server(domain, staticAndServerRouter, router);
  server.serve();
}

if (Deno.args[0] == "build") {
  const domain = "https://angeloceccato.it";
}

export type MenuInfo = {
  menuName: string;
  url: string;
};
