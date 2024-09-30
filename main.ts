import { NotFound } from "./components/404.ts";
import { Home } from "./components/Home.ts";
import { Posts } from "./components/Posts.ts";
import { Robots } from "./components/Robots.ts";
import { SiteMap } from "./components/SiteMap.ts";
import {
  applyConditionsRouter,
  flatRoute,
  getMenuStatus,
  pagesFromFolder,
  Router,
} from "./routes.ts";
import { sameAsVar } from "./utils/utils.ts";
import { Server } from "./server.ts";
import { StaticFiles } from "./static.ts";
import { FeedRss } from "./components/FeedRss.ts";
import { Graph } from "./components/Graph.ts";
import {
  aTourOfTheLanguageLandscapeLink,
  graphNodes,
  yanCuiAuthor,
} from "./graph/knowledgeGraph.ts";

export const domain =
  Deno.args[0] == "serve"
    ? "http://localhost:8000"
    : "https://angeloceccato.it";

export const buildDate = new Date().toISOString();

type Route =
  | { type: "static"; folder: string; condition: (file: string) => boolean }
  | {
      type: "generate";
      relativeFileNamePath: string;
      condition: (file: string) => boolean;
      content: () => string;
      contentType: string;
    }
  | {
      type: "html";
      relativeWebsitePath: string;
      condition: (file: string) => boolean;
      content: () => string;
    };
export type StaticServerRouter = Route[];

const postPages = await pagesFromFolder("./post");
const docsPages = await pagesFromFolder("./docs");
const postRoute = flatRoute({ "/post": postPages });
const docsRoute = flatRoute({ "/docs": docsPages });
const graphRoute = flatRoute({
  "/graph": graphNodes.map((node) => ({
    ...node,
    relativeFilePath: `/${node.id}/`,
    content: Graph({ nodeIdToFocus: node.id }),
  })),
});
const notFoundRoute = flatRoute({
  "/404.html": [
    {
      id: sameAsVar({ NotFound }),
      content: NotFound(),
    },
  ],
});
const homeRoute = flatRoute({
  "/": [
    {
      data: {
        menu: { menuName: sameAsVar({ Home }), order: 1 },
        title: sameAsVar({ Home }),
      },
      id: sameAsVar({ Home }),
      content: Home({ posts: Posts({ posts: postRoute }) }),
    },
  ],
});

const graphR = flatRoute({
  "/graph": [
    {
      data: {
        menu: { menuName: sameAsVar({ Graph }) },
      },
      relativeFilePath: "/",
      id: sameAsVar({ Graph }),
      content: Graph({}),
    },
  ],
});
const router: Router = [
  ...postRoute,
  ...docsRoute,
  ...graphRoute,
  ...notFoundRoute,
  ...graphR,
  ...homeRoute,
];

export const { allMenus } = getMenuStatus(router);

const staticAndServerRouter: StaticServerRouter = [
  {
    type: "static",
    folder: "./static",
    condition: (file: string) =>
      new RegExp(/\.webp$|\.png$|\.jpg$|\.svg$|\.css$/).test(file),
  },
  {
    type: "generate",
    relativeFileNamePath: "/sitemap.xml",
    condition: (file) => new RegExp(/sitemap\.xml$/).test(file),
    content: () =>
      SiteMap({ router: router, latestBuildDate: buildDate, domain: domain }),
    contentType: "application/xml",
  },
  {
    type: "generate",
    relativeFileNamePath: "/feed.rss",
    condition: (file) => new RegExp(/feed\.rss$/).test(file),
    content: () =>
      FeedRss({ domain, latestBuildDate: buildDate, feedItems: postRoute }),
    contentType: "application/rss+xml",
  },
  {
    type: "generate",
    relativeFileNamePath: "/robots.txt",
    condition: (file: string) => new RegExp(/robots\.txt$/).test(file),
    content: () => Robots({ domain: domain }),
    contentType: "text/plain",
  },
  ...applyConditionsRouter(router),
];

if (Deno.args[0] == "serve") {
  const server = new Server(staticAndServerRouter);
  server.serve();
}

if (Deno.args[0] == "build") {
  const staticFiles = new StaticFiles(staticAndServerRouter, "./dist");
  await staticFiles.build();
}

export type MenuInfo = {
  menuName: string;
  url: string;
};
