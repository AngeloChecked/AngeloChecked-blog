import { cssClass } from "../style/css.ts";
import { html } from "../deps/html.ts";
import { rowClass } from "../style/mainCss.ts";
import { MenuInfo } from "../main.ts";

export function Menu(props: { currentPageMenu?: string; menus: MenuInfo[] }) {
  const menuRowContainerClass = cssClass({
    className: "menuRowContainer",
    properties: {
      margin: "0 2rem 2rem 2rem",
      flexWrap: "wrap",
      gap: "10px",
      justifyContent: "space-between",
    },
    from: rowClass,
  });

  const menuPagesRowContainerClass = cssClass({
    className: "menuPagesRowContainer",
    properties: {
      flexWrap: "wrap",
      gap: "2rem",
      justifyContent: "space-between",
    },
    from: rowClass,
  });

  return html`
      <header>
        <nav>
          <div style="${menuRowContainerClass.inlineStyle}">
            <div style="${rowClass.inlineStyle}">
              <div>
                <img src="/img/avatar_logo.webp" alt="AngeloChecked logo"> 
              </div>
              <div>
                ANGELO CECCATO 
                <br>
                or AngeloChecked
              </div>
            </div>
            <div style="${menuPagesRowContainerClass.inlineStyle}">
              ${
    props.menus.map((menu) => {
      let menuName = menu.menuName;
      if (props.currentPageMenu === menu.menuName) {
        menuName = `<u>${menuName}</u>`;
      }
      return `<div><strong><a href="${menu.url}">${menuName}</a></strong></div>`;
    }).join("")
  }
            </div>
          </div>
        </nav>
      </header>
  `;
}
