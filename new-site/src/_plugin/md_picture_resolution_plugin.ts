import { merge } from "lume/core/utils/object.ts";
import Site from "lume/core/site.ts";

type Options = {
  mediaConfig?: {
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

export default function (userOptions: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.process([".md"], (pages) => {
      for (const page of pages) {
        const { document } = page;

        if(!page?.data?.thumbnail){
          page.data.thumbnail = {}
        }
        console.log(">>>> >>>", page?.data?.thumbnail)


        const images = document?.querySelectorAll("img");
        if (!images) continue;

        for (const img of images) {
          const src = img.getAttribute("src");
          const alt = img.getAttribute("alt");

          src && img.setAttribute("data-src", src);
          alt && img.setAttribute("alt", alt);
          img.setAttribute("src", "");

          if (!src) continue;
          const sizes = ["large", "medium", "small", "tiny"];
          const imagesFound = [];

          for (const size of sizes) {
            const sizedFilePath = src.replace(/(\..*)$/, `.${size}$1`);
            site.fs.entries.get(sizedFilePath) &&
              imagesFound.push([size, sizedFilePath]);
          }

          const mediaConfig: Record<string, string | undefined> =
            options.mediaConfig;
          if (imagesFound.length > 0 && document) {
            const picture = document.createElement("picture");
            alt && picture.setAttribute("alt", alt);

            for (const [size, path] of imagesFound) {
              const source = document.createElement("source");
              source.setAttribute("data-srcset", path);

              const media = mediaConfig[size];
              media && source.setAttribute("media", media);

              picture.appendChild(source);
            }
            img.replaceWith(picture);
            site.fs.entries.get(src) && picture.appendChild(img);

            const script = document.createElement("script");
            script.innerText = `
window.onload = () => {
  document.querySelectorAll('source').forEach(el => el.setAttribute('srcset', el.getAttribute('data-srcset')));
  document.querySelectorAll('img').forEach(el => el.setAttribute('src', el.getAttribute('data-src')));
}`;
            const body = document.querySelector("body");
            body && body.appendChild(script);
          }
        }
      }
    });
  };
}
