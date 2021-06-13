/**
 *
 * @param {*} obj: Object
 * @param {*} level: String eg:'a.b.c'
 */
export default function objSearch(obj, level) {
  const levelArr = level.split(".");

  // if it is just '.'
  if (level === '.') {
    return obj[level];
  }

  // only one level
  if (levelArr.length === 1) {
    return obj[levelArr[0]];
  }

  let ret = obj;
  levelArr.forEach((val) => {
    ret = ret[val];
  });

  return ret;
}
