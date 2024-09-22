import { NotFound } from "./components/404.ts";
import { Base } from "./components/Base.ts";
import { Footer } from "./components/Footer.ts";
import { Home } from "./components/Home.ts";
import { Menu } from "./components/Menu.ts";
import { Posts } from "./components/Posts.ts";
import { Robots } from "./components/Robots.ts";
import { SiteMap } from "./components/SiteMap.ts";
import {
  buildRoute,
  getMenuStatus,
  getPageFromRoute,
  pagesFromFolder,
  RoutedPage,
} from "./routes.ts";
import { styleCssFile } from "./style/mainCss.ts";
import { fromStringToDomToString, sameAsVar } from "./utils/utils.ts";
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
  }
  | {
    type: "html";
    content: (site: Site, websiteScript: string, filePath: string) => string;
  };

export type StaticServerRouter = Route[];

type Site = {
  domain: string;
};

export function createPageHtml(
  domain: string,
  websocketScript: string,
  filePath: string,
) {
  const page: RoutedPage | undefined = getPageFromRoute(
    router,
    filePath,
  );
  const titleCompanionAndFallback = "Angelo Ceccato Blog";
  const body = Base({
    title: (page?.data?.title ? page.data.title + " - " : "") +
      titleCompanionAndFallback,
    description: page?.data?.description ?? titleCompanionAndFallback,
    content: page?.content ?? "404",
    scripts: websocketScript,
    style: styleCssFile.style,
    menu: Menu({
      currentPageMenu: page?.data?.menu?.menuName,
      menus: allMenus,
    }),
    footer: Footer({
      currentPageMenu: page?.data?.menu?.menuName,
      menus: allMenus,
    }),
    page: page!,
    site: { domain: domain },
  });
  const html = fromStringToDomToString(body);
  return html;
}

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

const { allMenus } = getMenuStatus(router);
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
  {
    type: "html",
    content: (site: Site, websiteScript: string, filePath: string) =>
      createPageHtml(site.domain, websiteScript, filePath),
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
