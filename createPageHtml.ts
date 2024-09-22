import { Base } from "./components/Base";
import { Footer } from "./components/Footer";
import { Menu } from "./components/Menu";
import { RoutedPage } from "./routes";
import { styleCssFile } from "./style/mainCss";
import { websocketScript } from "./websiteServe";


export function createPageHtml(
  page?: RoutedPage
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
