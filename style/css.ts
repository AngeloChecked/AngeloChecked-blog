export function css(cssObject: TemplateStringsArray) {
  return cssObject;
}

type HtmlElement = "html" | "body" | "div" | "img" | string;
type Colors = "red" | "black" | "white" | "darkgray" | "green" | string;
type CssProperty =
  | { backgroundColor: Colors }
  | { color: Colors }
  | { margin: number | string }
  | { fontFamily: string }
  | { lineHeight: string }
  | { textAlign: string }
  | { textJustify: string }
  | { maxWidth: string }
  | { width: string }
  | { margin: string }
  | { fontWeight: string }
  | { textDecoration: "none" | "underline" }
  | { cursor: "pointer" }
  | { backgroundImage: string }
  | { backgroundPosition: string }
  | { backgroundRepeat: "no-repeat" }
  | { backgroundSize: string }
  | { border: string }
  | { padding: string }
  | { fontSize: string }
  | { overflowX: "auto" }
  | { borderRadius: string }

  | { display: "flex" | "grid" | "none" }
  | { flexDirection: "row" | "column" }
  | { flexWrap: "wrap" }
  | { gap: string }
  | { alignItems: "center" }
  | { justifyContent: "space-between" | "space-around" | "space-evenly" }

  | { gridTemplateColumns: string }

type CssProperties<T = CssProperty> = {
  [Key in keyof T]: T[Key];
};

export function cssElement(
  cssObject: { elementName: HtmlElement } & CssObject,
): CssElement {
  const { styleProperties, mergedCssProperties } = adjustAndMergeCssProps(
    cssObject,
  );
  const style = `
${cssObject.elementName} {
  ${styleProperties.join("\n  ")}
}`;
  const inlineStyle = styleProperties.join(" ");
  return {
    elementName: cssObject.elementName,
    style,
    inlineStyle,
    cssProperties: mergedCssProperties,
  };
}

export function cssClass(cssObject: { className: string } & CssObject) {
  const { styleProperties, mergedCssProperties } = adjustAndMergeCssProps(
    cssObject,
  );

  const style = `
.${cssObject.className} {
  ${styleProperties.join("\n  ")}
}`;
  const inlineStyle = styleProperties.join(" ");
  return {
    className: cssObject.className,
    style,
    inlineStyle,
    cssProperties: mergedCssProperties,
  };
}

type CssClass = { className: string } & CssOutput;
type CssElement = { elementName: string } & CssOutput;

type CssOutput = {
  style: string;
  inlineStyle: string;
  cssProperties: Record<string, string>;
};

type CssObject = {
  properties: CssProperties;
  from?: {
    cssProperties: Record<string, string>;
  } | undefined;
};

function adjustAndMergeCssProps(cssObject: CssObject) {
  const propertiesUnited = Object.entries(
    cssObject.from?.cssProperties ?? {},
  ).concat(
    Object.entries(cssObject.properties as never as object)
      .map(([key, value]) => [fromCamelCaseToKebabCase(key), value]),
  );

  const mergedCssProperties = Object.fromEntries(propertiesUnited);

  const styleProperties = Object.entries(mergedCssProperties)
    .map(([key, value]) => `${key}: ${value};`);
  return { styleProperties, mergedCssProperties };
}

export function cssFile<O extends { [key: string]: CssClass | CssElement }>(
  cssParts: O,
): { content: string; style: string } & { [Key in keyof O]: string } {
  const classes = Object.values(cssParts);

  const classTarget = {} as { [Key in keyof O]: string };
  for (const key in cssParts) {
    const newLocal = cssParts[key];
    if ("className" in newLocal) {
      classTarget[key] = newLocal.className;
    }
    if ("elementName" in newLocal) {
      classTarget[key] = newLocal.elementName;
    }
  }

  const content = `
${classes.map((cssClass) => cssClass.style).join("\n")}
`;
  return {
    ...classTarget,
    content,
    style: `<style>${content}</style>`,
  };
}

export function fromCamelCaseToKebabCase(camelCaseString: string) {
  let kebabCaseResult = "";
  for (let i = 0; i < camelCaseString.length; i++) {
    const charCode = camelCaseString.charCodeAt(i);
    const isInUpperCaseCharCodes = charCode >= 65 && 90 >= charCode;
    let char = String.fromCharCode(charCode);
    if (isInUpperCaseCharCodes) {
      if (i !== 0) {
        kebabCaseResult += "-";
        char = char.toLowerCase();
      }
    }
    kebabCaseResult += char;
  }
  return kebabCaseResult;
}
