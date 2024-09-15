import { assertEquals } from "jsr:@std/assert@1";
import { cssClass, fromCamelCaseToKebabCase } from "./css.ts";

Deno.test("from camel case to kebab case", () => {
  const kebabCased = fromCamelCaseToKebabCase("backgroundColor");

  assertEquals(kebabCased, "background-color");
});

Deno.test("style class and inline css", () => {
  const cssObject = cssClass({
    className: "main",
    properties: {
      backgroundColor: "darkgray",
    },
  });

  assertEquals(cssObject.className, "main");
  assertEquals(cssObject.inlineStyle, "background-color: darkgray;");
  assertEquals(
    cssObject.style,
    `
.main {
  background-color: darkgray;
}`,
  );
});

Deno.test("merge two css class", () => {
  const cssObject = cssClass({
    className: "main",
    properties: {
      backgroundColor: "darkgray",
    },
  });

  const cssObject2 = cssClass({
    className: "root",
    properties: {
      backgroundColor: "green",
      color: "red",
    },
    from: cssObject,
  });

  assertEquals(cssObject2.className, "root");
  assertEquals(cssObject2.inlineStyle, "background-color: green; color: red;");
  assertEquals(
    cssObject2.style,
    `
.root {
  background-color: green;
  color: red;
}`,
  );
});
