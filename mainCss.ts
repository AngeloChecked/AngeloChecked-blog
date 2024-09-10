import { cssElement, cssFile } from "./css.ts";

const mainClass = cssElement({ elementName: "html", properties: {
  backgroundColor: "black",
  color: "white",
  margin: 0
}})

export const styleCssFile = cssFile({mainClass})
