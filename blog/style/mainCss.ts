import { cssClass, cssElement, cssFile } from "./css.ts";

export const mainWidth = 800;

const htmlStyle = cssElement({
  elementName: "body, html",
  properties: {
    fontSize: "1.2rem",
    backgroundColor: "black",
    color: "white",
    margin: 0,
  },
});

const imgStyle = cssElement({
  elementName: "img",
  properties: {
    maxWidth: "100%",
  },
});

const aStyle = cssElement({
  elementName: "a",
  properties: {
    fontWeight: "700",
    textDecoration: "none",
    color: "#FF6166",
    cursor: "pointer",
  },
});

const hoverAStyle = cssElement({
  elementName: "a:hover",
  properties: {
    textDecoration: "underline",
  },
});

const preStyle = cssElement({
  elementName: "pre",
  properties: {
    lineHeight: "1.1",
    fontFamily: "verdana",
    fontSize: "12px",
    backgroundColor: "#282c34",
    padding: "15px",
    overflowX: "auto",
    borderRadius: "20px",
  },
});

export const mainClass = cssClass({
  className: "main",
  properties: {
    margin: "auto auto auto auto",
    maxWidth: `${mainWidth}px`,
    fontSize: "18px",
    fontFamily: `"Open Sans","Helvetica Neue",sans-serif`,
    textAlign: "justify",
    textJustify: "inter-word",
    lineHeight: "27px",
    //backgroundColor:"rgb(3,1,1)",
    padding: "10px 30px 10px 30px",
  },
});

export const rowClass = cssClass({
  className: "row",
  properties: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export const h1Element = cssElement({
  elementName: "h1",
  properties: {
    color: "#ff9061",
  },
});
const h2Element = cssElement({
  elementName: "h2",
  properties: {
    color: "#eba157",
  },
});
const h3Element = cssElement({
  elementName: "h3",
  properties: {
    color: "#ebd057",
  },
});

export const styleCssFile = cssFile({
  aStyle,
  htmlStyle,
  imgStyle,
  mainClass,
  hoverAStyle,
  preStyle,
  h1Element,
  h2Element,
  h3Element,
});
