import { cssClass } from "../style/css.ts";
import { html } from "../deps/html.ts";
import { rowClass } from "../style/mainCss.ts";
import { social } from "./social.ts";

export function Footer(props: { currentPage: string; pages: string[]; }) {
  const footherClass = cssClass({
    className: "foother",
    properties: {
      justifyContent: "space-around",
      margin: "50px 0 50px 0",
    },
    from: rowClass,
  });

  const socialContainerClass = cssClass({
    className: "socialContainer",
    properties: {
      display: "grid",
      gridTemplateColumns: "auto 15ch",
      gap: "5px",
    },
    from: rowClass,
  });
  return html`
<footer style="border-top: solid white 1px;">
  <div style="${footherClass.inlineStyle}">
    <div style="max-width: 30ch;">
      © 2024 Angelo Ceccato. Created with <a href="https://lume.land/">Lume</a>, 
      powered by <a href="https://github.com/antvis/G6">Antv-G6</a>, heavy inspired by 
      <a href="https://github.com/MaggieAppleton/digital-gardeners">Digital Gardeners</a>
      and a bit by my previous theme: <a href="https://github.com/Vimux/Mainroad">Mainroad</a>.
    </div>
    <div>
      Menu:
      <ul>
      ${
    props.pages.map((page) => {
      let pageName = page
      if (page === props.currentPage){
         pageName = `<u>${pageName}</u>`
      }
      return html`
                <li>
                  <a href="${page}">${pageName}</a>
                </li>
           `;
    }).join("")
  }
    </ul>
    </div>
    <div>
      Social:
      ${
    social.map((s) => {
      return html`
            <div style="${socialContainerClass.inlineStyle}">
                <div>
                  ${s.svg}
                </div>
                <div>
                  <a href="${s.link}">&nbsp;${s.title}</a>
                </div>
            </div>
           `;
    }).join("")
  }
    </div>
  </div>
</footer>
  `;
}
