import { social } from "./social.ts";
import { html } from "../deps/html.ts";
import { cssClass } from "../style/css.ts";

export const title = "Home";
export const description = "the home page of my blog";

const logoImagePath = "/img/avatar_logo.webp";
const gardenDecorationLeftImagePath = "/img/garden-decoration-left.svg";
const gardenDecorationRightImagePath = "/img/garden-decoration-right.svg";

const homeIntroductionClass = cssClass({
  className: "homeIntroduction",
  properties: {
    backgroundImage:
      `url('${gardenDecorationLeftImagePath}'), url('${gardenDecorationRightImagePath}')`,
    backgroundPosition: "0 150px, top right",
    backgroundRepeat: "no-repeat",
    backgroundSize: "80px",
    border: "solid black 1px",
    width: "fit-content",
    padding: "20px",
    maxWidth: "600px",
    textAlign: "center",
    margin: "10px auto",
  },
});

const socialList = cssClass({
  className: "socialList",
  properties: {
    fontSize: "2rem",
    display: "flex",
    gap: "10px",
    justifyContent: "space-evenly",
  },
});

export function Home() {

  return html`
    <div style="${homeIntroductionClass.inlineStyle}">
      <img style="maxWidth:150px"  src="${logoImagePath}" >
      <p>
        <strong>The AngeloChecked Garden</strong>
      </p>
      <p>
        <i>This is just the place where I put my thoughts.</i>
      </p>

      <span style="${socialList.inlineStyle}">
        ${
    social.map((social) => {
      return html`
            <a href=${social.link}>
              <i>
                ${social.svg}
              </i>
            </a>
          `;
    }).join("")
  }
      </span>
    </div>

    <br></br>
    <span>
      <h2>Posts:</h2>
    </span>
  `;
}
