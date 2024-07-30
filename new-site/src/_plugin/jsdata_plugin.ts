import loader from "lume/core/loaders/module.ts";
import Site from "lume/core/site.ts";

export default function () {
  return (site: Site) => {
    const fs = site.fs;
    site.preprocess([".md"], async (pages) => {
      for (const page of pages) {
        for (const ext of [".data.js", ".data.ts"]) {
          const jsFile = page.src.entry?.path.replace(".md", ext);
          const entry = jsFile && fs.entries.get(jsFile);
          if (entry) {
            const foundJsPageData = await entry?.getContent(
              loader,
            ) as Record<string, unknown> | undefined;
            page.data = { ...page.data, ...foundJsPageData };
            break;
          }
        }
      }
    });
  };
}
