import { Article } from "./components/Article.ts";
import { FileIndex } from "./components/FileIndex.ts";
import { Home } from "./components/Home.ts";
import { Route } from "./main.ts";
import { markdown } from "./utils/markdown.ts";
import { FileOrDir, traverseFilesFlat } from "./utils/utils.ts";
import { exists } from "jsr:@std/fs";

export async function pagesFromFolder(folderPath: string) {
  const relativeFilePaths = await traverseFilesFlat(folderPath);
  const pages: Page[] = [];
  for (const relativeFilePath of relativeFilePaths) {
    const page: Page = {};
    if (relativeFilePath.endsWith("md")){
      const pathSplit = (folderPath + relativeFilePath).split(".")
      const dataFilePath = pathSplit.slice(undefined, -1).join(".") + ".data.ts"
      if (await exists(dataFilePath)){
        const pageData = (Object.entries(await import(dataFilePath))[0][1]) as unknown as { data: PageData }
        for (const key in pageData.data){
          // deno-lint-ignore no-explicit-any
          (page as any)[key] = (pageData.data as any)[key]
        }
      }
      const fileContent = await Deno.readTextFile(
        folderPath + "/" + relativeFilePath,
      );
      page.content = Article({
        title: page.title ?? "",
        content: markdown(fileContent),
      });
      page.relativeFilePath = relativeFilePath;
      pages.push(page)
    }     
  }
  return pages;
}

export type PageData = {
  menu?: { menuName: "" };
  title: string;
  description: string;
  seo: string[];
  date: string;
  thumbnail: { src: string };
};

export type Page = Partial<PageData & {
  content: string;
  customCss?: string;
  relativeFilePath?: string;
}>;

const postPages = await pagesFromFolder("./post");
const docsPages = await pagesFromFolder("./docs");
export const router: Route = {
  "post": postPages,
  "docs": docsPages,
  "graph": undefined,
  "404": undefined,
  "": [{ content: Home(), relativeFilePath: undefined }],
};

export function getPageFromRoute(
  routes: Route,
  filePath: string,
  folderStructure: FileOrDir,
) {
  const page: Page = { content: "" };

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
      console.log(page.relativeFilePath)
      if (
        page.relativeFilePath === undefined ||
        filePath.endsWith(page.relativeFilePath)
      ) {
        return page;
      }
    }
  }
}
