import tokenParser from "./parseToToken";
import tokenRender from './renderToken';

window.my_template = {
  render(tempStr, data) {
    const tokens = tokenParser(tempStr);
    // console.log(tokens);

    const domStr = tokenRender(tokens, data);
    // console.log(domStr);

    return domStr;
  },
};
