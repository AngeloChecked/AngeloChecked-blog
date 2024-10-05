import { HTMLDocument } from "../deps/dom.ts";
import { RoutedPage } from "../routes.ts";

type Options = {
  mediaConfig: {
    tiny?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
};

const defaults: Options = {
  mediaConfig: {
    tiny: undefined,
    small: "(min-width: 300px)",
    medium: "(min-width: 480px)",
    large: "(min-width: 600px)",
  },
};

export default function pictureRelosution(
  page: RoutedPage,
  document: HTMLDocument,
  imageInFolders: string[],
) {
  const options = defaults;

  if (!page?.data) return;

  if (!page?.data?.thumbnail) {
    page.data.thumbnail = { src: "" };
  }

  const images = document?.querySelectorAll("img");
  if (!images) return;

  for (const img of images) {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");

    src && img.setAttribute("data-src", src);
    alt && img.setAttribute("alt", alt);
    img.setAttribute("src", "");

    if (!src) return;
    const sizes = ["large", "medium", "small", "tiny"];
    const imagesFound = [];

    for (const size of sizes) {
      const sizedFilePath = src.replace(/(\..*)$/, `.${size}$1`);
      imageInFolders.some((img) => sizedFilePath.endsWith(img)) &&
        imagesFound.push([size, sizedFilePath]);
    }
  }

  return document;
}
