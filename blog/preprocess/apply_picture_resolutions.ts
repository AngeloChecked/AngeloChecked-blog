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
  maxWidth: number,
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

    src && img.setAttribute("src", src);
    alt && img.setAttribute("alt", alt);

    if (!src) return;
    const sizes = ["large", "medium", "small", "tiny"];
    const imagesFound: [string, string][] = [];
    const pathFileNameWithoutExtension = src.replace(/(\..*)$/, ``);

    for (const size of sizes) {
      const regex = new RegExp(
        `${
          pathFileNameWithoutExtension.split("/").slice(-1)
        }\.[0-9]{1,4}x[0-9]{1,4}\.${size}.webp`,
      );
      const sizeImageFound = imageInFolders.find((img) => regex.test(img));
      sizeImageFound && imagesFound.push([size, "/img" + sizeImageFound]);
    }

    const mediaConfig: Record<string, string | undefined> = options.mediaConfig;

    const picture = document.createElement("picture");
    alt && picture.setAttribute("alt", alt);

    if (imagesFound.length > 0 && document) {
      for (const [size, path] of imagesFound) {
        const source = document.createElement("source");
        source.setAttribute("srcset", path);

        const regex = new RegExp("\.([0-9]{1,4}x[0-9]{1,4})\.");
        const resolutionFromName = regex.exec(path)?.[1];
        const [w, h] = resolutionFromName?.split("x") ?? [];
        if (w && h && !img.getAttribute("width")) {
          let ww = parseInt(w);
          let hh = parseInt(h);
          if (ww >= maxWidth) {
            hh = Math.trunc((hh * maxWidth) / ww);
            ww = maxWidth;
          }
          source.setAttribute("width", `${ww}px`);
          source.setAttribute("height", `${hh}px`);
          source.setAttribute(
            "style",
            `width:100%; height: auto; max-width:${ww}px; max-height: ${hh}px;`,
          );
        }

        const media = mediaConfig[size];
        media && source.setAttribute("media", media);

        picture.appendChild(source);
      }
    }

    img.replaceWith(picture);
    const regex = new RegExp(
      `${
        pathFileNameWithoutExtension.split("/").slice(-1)
      }\.[0-9]{1,4}x[0-9]{1,4}\.webp$`,
    );
    const sizeImageFound = imageInFolders.find((img) => regex.test(img));
    if (sizeImageFound) {
      const regex = new RegExp("\.([0-9]{1,4}x[0-9]{1,4})\.");
      const resolutionFromName = regex.exec(sizeImageFound)?.[1];
      const [w, h] = resolutionFromName?.split("x") ?? [];
      if (w && h && !img.getAttribute("width")) {
        let ww = parseInt(w);
        let hh = parseInt(h);
        if (ww >= maxWidth) {
          hh = Math.trunc((hh * maxWidth) / ww);
          ww = maxWidth;
        }
        img.setAttribute("width", `${ww}px`);
        img.setAttribute("height", `${hh}px`);
        img.setAttribute(
          "style",
          `width:100%; height: auto; max-width:${ww}px; max-height: ${hh}px;`,
        );
      }
      img.setAttribute("src", "/img" + sizeImageFound);
    }
    picture.appendChild(img);
  }
  return document;
}
