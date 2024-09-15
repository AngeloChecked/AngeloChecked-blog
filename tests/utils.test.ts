import { assertEquals } from "jsr:@std/assert@1";
import { traverseFiles, traverseFilesFlat } from "../utils/utils.ts";

Deno.test("traverse folder and file correctly", async () => {
  const fileTree = await traverseFiles("./tests/traverseDirsTestFolder");

  assertEquals(
    fileTree,
    [
      "./tests/traverseDirsTestFolder",
      [
        [
          "./tests/traverseDirsTestFolder/one",
          [
            [
              "./tests/traverseDirsTestFolder/one/one-two",
              [
                "./tests/traverseDirsTestFolder/one/one-two/one-two-file.txt",
                "./tests/traverseDirsTestFolder/one/one-two/one-two-file2.txt",
              ],
            ],
            [
              "./tests/traverseDirsTestFolder/one/one-one",
              [
                "./tests/traverseDirsTestFolder/one/one-one/one-one-file2.txt",
                "./tests/traverseDirsTestFolder/one/one-one/one-one-file3.txt",
                "./tests/traverseDirsTestFolder/one/one-one/one-one-file.txt",
              ],
            ],
          ],
        ],
        [
          "./tests/traverseDirsTestFolder/two",
          [
            [
              "./tests/traverseDirsTestFolder/two/two-one",
              [
                "./tests/traverseDirsTestFolder/two/two-one/two-one-file.txt",
                [
                  "./tests/traverseDirsTestFolder/two/two-one/two-one-one",
                  [
                    "./tests/traverseDirsTestFolder/two/two-one/two-one-one/two-one-one-file.txt",
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  );
});

Deno.test("traverse folder and file in a flat way", async () => {
  const fileTree = await traverseFilesFlat("./tests/traverseDirsTestFolder");

  assertEquals(
    fileTree,
    [
      "/two/two-one/two-one-file.txt",
      "/two/two-one/two-one-one/two-one-one-file.txt",
      "/one/one-one/one-one-file2.txt",
      "/one/one-one/one-one-file3.txt",
      "/one/one-one/one-one-file.txt",
      "/one/one-two/one-two-file.txt",
      "/one/one-two/one-two-file2.txt",
    ],
  );
});
