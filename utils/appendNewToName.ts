export default function appendNewToName(name: string) {
  let insertPos = name.indexOf(".");
  let newName = name
    .substring(0, insertPos)
    .concat("-khoiphucanh.com", name.substring(insertPos));
  return newName;
}
