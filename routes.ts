import { createPageHtml } from "./basePage.ts";
import { Article } from "./components/Article.ts";
import { markdown } from "./utils/markdown.ts";
import { traverseFilesFlat } from "./utils/utils.ts";
import { exists } from "jsr:@std/fs";

export type Router = RoutedPage[];

export async function pagesFromFolder(folderPath: string) {
  const relativeFilePaths = await traverseFilesFlat(folderPath);
  const pages: ProcessedPage[] = [];
  for (const relativeFilePath of relativeFilePaths) {
    const page: ProcessedPage = {};
    if (relativeFilePath.endsWith("md")) {
      const pathSplit = (folderPath + relativeFilePath).split(".");
      const dataFilePath = pathSplit.slice(undefined, -1).join(".") +
        ".data.ts";
      if (await exists(dataFilePath)) {
        const pageModule = await import(dataFilePath);
        // deno-lint-ignore no-explicit-any
        const pageData = (Object.entries(pageModule)[0][1]) as any;
        for (const key in pageData) {
          // deno-lint-ignore no-explicit-any
          (page as any)[key] = (pageData as any)[key];
        }
      }
      const fileContent = await Deno.readTextFile(
        folderPath + "/" + relativeFilePath,
      );
      page.content = Article({
        title: page.data?.title ?? "",
        content: markdown(fileContent),
      });
      if (relativeFilePath) {
        page.relativeFilePath = fromSnakeCaseToKebabCase(
          removeExtensionIfPresent(relativeFilePath) + "/",
        );
      }
      pages.push(page);
    }
  }
  return pages;
}

function fromSnakeCaseToKebabCase(fileName?: string) {
  if (fileName?.includes("_")) {
    return fileName.replaceAll("_", "-");
  }
  return fileName;
}

function removeExtensionIfPresent(fileName: string) {
  if (fileName.includes(".")) {
    return fileName.split(".").slice(0, -1).join("");
  }
  return fileName;
}

export type MetaData = {
  type: string;
  id: string;
  tagId: string[];
  authorId: string;
  linkId: string[];
};

export type PageData = {
  menu?: { menuName: string; order?: number };
  title: string;
  description: string;
  seo: string[];
  date: string;
  thumbnail: { src: string };
};

export type ProcessedPage = Partial<
  MetaData & {
    data: Partial<PageData>;
    id: string;
    content: string;
    customCss?: string;
    relativeFilePath?: string;
  }
>;

export type RoutedPage = ProcessedPage & {
  relativeWebsitePath: string;
};

export function flatRoute(rawRouter: {
  [path: string]: ProcessedPage[];
}) {
  return Object.entries(rawRouter).flatMap(
    ([route, pages]) => {
      const routePages = pages?.map((page) =>
        Object.assign(
          { relativeWebsitePath: route + (page.relativeFilePath ?? "") },
          page,
        )
      );
      return routePages;
    },
  );
}

export function getMenuStatus(router: Router) {
  const menus = router
    .filter((page) => page.data?.menu)
    .map((page) => ({
      order: page.data?.menu?.order ?? 99,
      menuName: page.data?.menu?.menuName!,
      url: page.relativeWebsitePath,
    }));
  menus.sort((a, b) => a.order < b.order ? -1 : 1);
  return { allMenus: menus };
}

export function applyConditionsRouter(router: Router) {
  return router.map((page) => ({
    type: "html" as const,
    relativeWebsitePath: page.relativeWebsitePath,
    condition: (file: string) => {
      return new RegExp(`${page.relativeWebsitePath}`).test("/" + file);
    },
    content: () => createPageHtml(page),
  }));
}
