import { NotFound } from "./components/404.ts";
import { Article } from "./components/Article.ts";
import { FileIndex } from "./components/FileIndex.ts";
import { Home } from "./components/Home.ts";
import { Posts } from "./components/Posts.ts";
import { Router } from "./main.ts";
import { markdown } from "./utils/markdown.ts";
import { FileOrDir, sameAsVar, traverseFilesFlat } from "./utils/utils.ts";
import { exists } from "jsr:@std/fs";

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

export const postPages = await pagesFromFolder("./post");
const docsPages = await pagesFromFolder("./docs");

export const postRoute = { "post": postPages };
export const homeRoute = {
  "": [{
    data: {
      menu: { menuName: sameAsVar({ Home }), order: 1 },
      title: sameAsVar({ Home }),
    },
    id: sameAsVar({ Home }),
    content: Home({ posts: Posts({ postRoute }) }),
  }],
};

export const notFoundRoute = {
  "404": [{
    id: sameAsVar({ NotFound }),
    content: NotFound(),
  }],
};

export const router: Router = {
  ...postRoute,
  "docs": docsPages,
  "graph": undefined,
  ...notFoundRoute,
  ...homeRoute,
};

export function getPageFromRoute(
  routes: Router,
  filePath: string,
  folderStructure: FileOrDir,
) {
  const page: ProcessedPage = { content: "" };

  const routeFound = Object.entries(routes).find(([route]) => {
    return filePath.startsWith(route);
  });

  if (!routeFound) {
    const fileIndex = FileIndex({ folderStructure, page: "./" + filePath });
    page.content = fileIndex;
    return page;
  }

  if (filePath.startsWith(routeFound[0])) {
    const pages = routeFound[1];
    for (const page of pages ?? []) {
      if (
        page.relativeFilePath === undefined ||
        filePath.endsWith(page.relativeFilePath)
      ) {
        return page;
      }
    }
  }
}
