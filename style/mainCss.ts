import { cssClass, cssElement, cssFile } from "./css.ts";

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
    color: "#b00",
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
    fontSize: "10px",
    backgroundColor: "rgb(5,4,4)",
    padding: "15px",
    overflowX: "auto",
    borderRadius: "20px",
  },
});

export const mainClass = cssClass({
  className: "main",
  properties: {
    margin: "auto auto auto auto",
    maxWidth: "800px",
    fontSize: "18px",
    width: "90%",
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

export const styleCssFile = cssFile({
  aStyle,
  htmlStyle,
  imgStyle,
  mainClass,
  hoverAStyle,
  preStyle,
});
