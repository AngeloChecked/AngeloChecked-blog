import { Base } from "./components/Base.ts";
import { Footer } from "./components/Footer.ts";
import { Menu } from "./components/Menu.ts";
import { allMenus, domain } from "./main.ts";
import { RoutedPage } from "./routes.ts";
import { styleCssFile } from "./style/mainCss.ts";
import { fromStringToDomToString } from "./utils/utils.ts";
import { websocketScript } from "./websiteServe.ts";

export function createPageHtml(
  page?: RoutedPage,
) {
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
