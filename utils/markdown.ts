import { markdownIt } from "../deps/markdown-it.ts";
import { highlightjs } from "../deps/highlightjs.ts";

export function markdown(str: TemplateStringsArray | string): string {
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str: string, lang: string) {
      if (lang && highlightjs.getLanguage(lang)) {
        const value = highlightjs.highlight(str, { language: lang }).value;
        return value;
      }
      return "";
    },
  });
  const result = md.render(str.toString());
  return result;
}
