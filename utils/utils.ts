import { DOMParser } from "../deps/dom.ts";
import { jsBeautify } from "../deps/js-beautify.ts";

export type FileOrDir = [string, FileOrDir[]] | string;

export async function traverseFiles(folderName: string): Promise<FileOrDir> {
  const filesOrDirs = Deno.readDir(folderName);
  const folder: FileOrDir = [folderName, []];
  for await (const f of filesOrDirs) {
    if (f.isFile) {
      folder[1].push(folderName + "/" + f.name);
    }
    if (f.isDirectory) {
      const innerFolderName = folderName + "/" + f.name;
      const innerFolder = await traverseFiles(innerFolderName);
      folder[1].push(innerFolder);
    }
  }
  return folder;
}

export async function traverseFilesFlat(folderName: string) {
  const filesWithPath = [];
  const folders = [{ path: "", asyncFolder: Deno.readDir(folderName)}];
  while (folders.length) {
    const folder = folders.pop();
    if (!folder) {
      continue
    }
    for await (const fileOrFolder of folder.asyncFolder) {
      if (fileOrFolder.isDirectory) {
        folders.push({
          path: folder.path + "/" + fileOrFolder.name,
          asyncFolder: Deno.readDir(folderName + "/" + folder.path + "/" + fileOrFolder.name)
        });
      }
      if (fileOrFolder.isFile) {
        filesWithPath.push(folder.path + "/" + fileOrFolder.name) 
      }
    }
  }
  return filesWithPath;
}

export function fromStringToDomToString(body: string) {
  const parser = new DOMParser();
  const { documentElement } = parser.parseFromString(body, "text/html");
  const html = `<!DOCTYPE html>\n${documentElement?.outerHTML || ""}`;

  return jsBeautify.html(html);
}

export function sameAsVar(obj: object){
  return Object.keys(obj)[0]
}
