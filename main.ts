import { NotFound } from "./components/404.ts";
import { Home } from "./components/Home.ts";
import { Posts } from "./components/Posts.ts";
import { Robots } from "./components/Robots.ts";
import { SiteMap } from "./components/SiteMap.ts";
import {
  buildRoute,
  flatRouter,
  getMenuStatus,
  pagesFromFolder,
  Router,
} from "./routes.ts";
import { sameAsVar } from "./utils/utils.ts";
import { Server } from "./websiteServe.ts";


export const domain = (Deno.args[0] == "serve")
  ? "http://localhost:8000"
  : "https://angeloceccato.it";

export const buildDate = (new Date()).toISOString();

type Route =
  | { type: "static"; condition: (file: string) => boolean }
  | {
    type: "generate";
    condition: (file: string) => boolean;
    content: () => string;
    contentType: string;
  }
  | {
    type: "html";
    condition: (file: string) => boolean;
    content: (filePath: string) => string;
  };
export type StaticServerRouter = Route[];

const postPages = await pagesFromFolder("./post");
const docsPages = await pagesFromFolder("./docs");
const postRoute = buildRoute({ "/post": postPages });
const docsRoute = buildRoute({ "/docs": docsPages });
const graphRoute = buildRoute({ "/graph": [] });
const notFoundRoute = buildRoute({
  "/404": [{
    id: sameAsVar({ NotFound }),
    content: NotFound(),
  }],
});
const homeRoute = buildRoute({
  "/": [{
    data: {
      menu: { menuName: sameAsVar({ Home }), order: 1 },
      title: sameAsVar({ Home }),
    },
    id: sameAsVar({ Home }),
    content: Home({ posts: Posts({ posts: postRoute["/post"]! }) }),
  }],
});

const router: Router = {
  ...postRoute,
  ...docsRoute,
  ...graphRoute,
  ...notFoundRoute,
  ...homeRoute,
};

export const { allMenus } = getMenuStatus(router);

const staticAndServerRouter: StaticServerRouter = [
  {
    type: "static",
    condition: (file: string) =>
      new RegExp(/\.webp$|\.png$|\.jpg$|\.svg$|\.css$/).test(file),
  },
  {
    type: "generate",
    condition: (file) => new RegExp(/sitemap\.xml$/).test(file),
    content: () =>
      SiteMap({ router: router, latestBuildDate: buildDate, domain: domain }),
    contentType: "application/rss+xml",
  },
  {
    type: "generate",
    condition: (file: string) => new RegExp(/robots\.txt$/).test(file),
    content: () => Robots({ domain: domain }),
    contentType: "text/plain",
  },
  ...flatRouter(router),
];

if (Deno.args[0] == "serve") {
  const server = new Server(staticAndServerRouter);
  server.serve();
}

if (Deno.args[0] == "build") {
}

export type MenuInfo = {
  menuName: string;
  url: string;
};
