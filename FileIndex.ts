import { FileOrDir } from "./utils.ts";

type Props = {
  folderStructure: FileOrDir;
  page: string;
};

export function FileIndex(props: Props) {
  return `
<div>
  <ul>
${createIndexPage(props.folderStructure, props.page)}
  </ul>
</div>
`;
}

function findFolder(
  rootFolderStrucutre: FileOrDir,
  page: string,
  previous: FileOrDir | undefined = undefined,
): [FileOrDir | undefined, FileOrDir] | undefined {
  if (pathIsEquivalent(rootFolderStrucutre[0], page)) {
    return [previous, rootFolderStrucutre];
  }

  for (const fod of rootFolderStrucutre[1]) {
    if (typeof fod !== "string") {
      const folderFound = findFolder(fod, page, rootFolderStrucutre);
      if (folderFound) {
        return folderFound;
      }
    }
  }
}

function name(fileOrDir: FileOrDir): string {
  if (typeof fileOrDir === "string") {
    return fileOrDir;
  }
  return fileOrDir[0];
}

function createIndexPage(
  folderStructure: FileOrDir,
  page: string,
) {
  const [previousFolder, currentFolder] = findFolder(folderStructure, page) ??
    [];

  if (!currentFolder || typeof currentFolder === "string") {
    return "";
  }

  let previousAndCurrent = currentFolder[1];
  if (previousFolder) {
    previousAndCurrent = prepend(previousAndCurrent, previousFolder); 
  }

  const dot = previousAndCurrent?.map((fileOrDir) => {
    const folderOrFileName = name(fileOrDir);
    let nameWitoutStartingDot = folderOrFileName;
    if (nameWitoutStartingDot.startsWith(".")) {
      nameWitoutStartingDot = nameWitoutStartingDot.slice(1);
    }
    return `<li><a href="${nameWitoutStartingDot}">${nameWitoutStartingDot}</a></li>`;
  }).join("\n");
  return `${dot}`;
}

function prepend(previousAndCurrent: FileOrDir[], previousFolder: FileOrDir) {
  const copy = previousAndCurrent.slice();
  copy.unshift(previousFolder);
  return copy;
}

function pathIsEquivalent(rootFolderStrucutreName: string, page: string) {
  if (rootFolderStrucutreName === page) {
    return true;
  }
  let folderName = rootFolderStrucutreName
  let currentPage = page
  if (folderName.startsWith(".")){
    folderName = folderName.slice(1)
  }
  if (currentPage.startsWith(".")){
    currentPage = currentPage.slice(1)
  }
  if (folderName.startsWith("/")){
    folderName = folderName.slice(1)
  }
  if (currentPage.startsWith("/")){
    currentPage = currentPage.slice(1)
  }
  if (folderName.endsWith("/")){
    folderName = folderName.slice(undefined, -1)
  }
  if (currentPage.endsWith("/")){
    currentPage = currentPage.slice(undefined, -1)
  }
  if (folderName === currentPage) {
    return true    
  }
  return false
}
