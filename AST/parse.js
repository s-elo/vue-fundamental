import parseAttr from "./parseAttr.js";

export default function parse(tempStr) {
  const tagStack = [];
  const collectStack = [{ children: [] }];

  let pos = 0;

  const startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
  const endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
  //[^\<] means cannot be <
  const textRegExp = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/;

  while (pos < tempStr.length - 1) {
    const restStr = tempStr.slice(pos);

    // <[a-z]+>
    if (startRegExp.test(restStr)) {
      const tag = restStr.match(startRegExp)[1];
      const attrStr = restStr.match(startRegExp)[2];

      tagStack.push(tag);
      collectStack.push({ tag, children: [], attrs: parseAttr(attrStr) });

      const attrStrLength = attrStr == null ? 0 : attrStr.length;

      // skip the <> as well
      pos += tag.length + attrStrLength + 2;
    } else if (endRegExp.test(restStr)) {
      const tag = restStr.match(endRegExp)[1];

      if (tag === tagStack[tagStack.length - 1]) {
        tagStack.pop();
        const child = collectStack.pop();

        if (collectStack.length > 0) {
          collectStack[collectStack.length - 1].children.push(child);
        }
      } else {
        throw new Error(`${tagStack[tagStack.length - 1]} not closed`);
      }
      // skip </>
      pos += tag.length + 3;
      // console.log(tagStack, JSON.stringify(collectStack));
    } else if (textRegExp.test(restStr)) {
      const text = restStr.match(textRegExp)[1];

      // not '    '
      if (!/^\s+$/.test(text)) {
        // console.log("text", text);
        collectStack[collectStack.length - 1].children.push({ text, type: 3 });
      }

      pos += text.length;
    } else {
      pos++;
    }
  }

  return collectStack[0].children[0];
}
