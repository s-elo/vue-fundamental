import objSearcher from "./objSearch";
import parseArray from './parseArray';

export default function renderToken(tokens, data) {
  let domStr = "";

  tokens.forEach((token) => {
    const tokenType = token[0];
    const tokenContent = token[1];

    switch (tokenType) {
      case "text":
        domStr += tokenContent;
        break;
      case "name":
        domStr += objSearcher(data, tokenContent);
        break;
      case "#":
        const sectionData = objSearcher(data, tokenContent);
        // token[2] is subTokens
        domStr += parseArray(sectionData, token[2]);
        break;
      default:
        break;
    }
  });
  
  return domStr;
}
