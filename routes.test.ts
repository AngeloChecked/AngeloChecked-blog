import { assertEquals } from "jsr:@std/assert";
import { expect } from "jsr:@std/expect";
import { pagesFromFolder } from "./routes.ts";
import { helloWorldTestData } from "./tests/folderFromCreatePages/hello.data.ts";

Deno.test("create pages with metadata from folder", async () => {
  const pages = await pagesFromFolder("./tests/folderFromCreatePages");


  assertEquals(pages.length, 1);
  expect(pages).toEqual([
    {
      content: expect.any(String),
      relativeFilePath: "/hello.md",
      ...helloWorldTestData.data
    },
  ]);
  expect(pages[0].content?.includes(helloWorldTestData.data.title))
});

