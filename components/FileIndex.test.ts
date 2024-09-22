import { assertEquals } from "jsr:@std/assert@1";
import { FileOrDir } from "../utils/utils.ts";
import { FileIndex } from "./FileIndex.ts";

Deno.test("list root folder", () => {
  const fileTree: FileOrDir = [
    "./posts",
    [
      ["./posts/one", []],
      ["./posts/two", []],
      "./posts/any.html",
    ],
  ];

  const fileIndexHtml = FileIndex({
    folderStructure: fileTree,
    page: "/posts",
  });

  assertEquals(
    fileIndexHtml,
    `
<div>
  <ul>
<li><a href="/posts/one">/posts/one</a></li>
<li><a href="/posts/two">/posts/two</a></li>
<li><a href="/posts/any.html">/posts/any.html</a></li>
  </ul>
</div>
`,
  );
});

Deno.test("list inner folder", () => {
  const fileTree: FileOrDir = [
    "./posts",
    [
      ["./posts/one", [
        ["./posts/two", []],
        "./posts/any.html",
      ]],
    ],
  ];

  const fileIndexHtml = FileIndex({
    folderStructure: fileTree,
    page: "posts/one/",
  });

  assertEquals(
    fileIndexHtml,
    `
<div>
  <ul>
<li><a href="/posts">/posts</a></li>
<li><a href="/posts/two">/posts/two</a></li>
<li><a href="/posts/any.html">/posts/any.html</a></li>
  </ul>
</div>
`,
  );
});
