export default function parseAttr(attrStr) {
  if (attrStr == null) return [];

  let pos = 0;
  let isInQoute = false;
  let breakPoint = 0;

  const ret = [];
  const trimAttrStr = attrStr.trim();

  while (pos < trimAttrStr.length) {
    const ch = trimAttrStr[pos];

    if (ch === '"') {
      isInQoute = !isInQoute;
    } else if (ch === " " && !isInQoute) {
      ret.push(trimAttrStr.slice(breakPoint, pos).trim());

      breakPoint = pos;
    }

    pos++;
  }

  // add the last one
  ret.push(trimAttrStr.slice(breakPoint).trim());

  return ret.map((item) => {
    const reg = item.match(/^(.+)=(.+)$/);

    return {
      name: reg[1],
      value: reg[2],
    };
  });
}
