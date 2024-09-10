import { assertEquals } from "jsr:@std/assert@1";
import { traverseFiles } from "../utils.ts";

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
