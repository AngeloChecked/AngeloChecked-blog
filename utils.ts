
export type FileOrDir = [string, FileOrDir[]] | string

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
