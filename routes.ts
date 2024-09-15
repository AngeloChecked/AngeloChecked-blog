import { Article } from "./components/Article.ts";
import { FileIndex } from "./components/FileIndex.ts";
import { Home } from "./components/Home.ts";
import { Route } from "./main.ts";
import { markdown } from "./utils/markdown.ts";
import { FileOrDir, traverseFilesFlat } from "./utils/utils.ts";

export async function pagesFromFolder(folderPath: string) {
  const relativeFilePaths = await traverseFilesFlat(folderPath);
  const pages: Page[] = [];
  for (const relativeFilePath of relativeFilePaths) {
    const markdownContnet = await Deno.readTextFile(
      folderPath + "/" + relativeFilePath,
    );
    const page: Page = {};
    page.content = Article({
      title:
        "My useless philosophical ramblings about the ecology of programming languages (and OOP is not Java)",
      content: markdown(markdownContnet),
    });
    page.relativeFilePath = relativeFilePath;
    pages.push(page)
  }
  return pages;
}

export type Page = Partial<{
  menu?: { menuName: "" };
  title: string;
  description: string;
  content: string;
  seo: string[];
  date: string;
  thumbnail: { src: string };
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

  console.log(
    "",
    filePath,
    "findRoute",
    routeFound?.[0],
    Object.keys(routes),
    "fpath",
    filePath === "",
  );

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
