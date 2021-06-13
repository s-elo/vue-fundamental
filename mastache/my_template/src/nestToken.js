/**
 * handle multiple DOM levels
 * @param {*} tokens
 * @returns
 */
export default function nestToken(tokens) {
  const nestTokens = [];
  const stack = [];

  // initially point at the whole section
  // the reference will change dynamically
  let section = nestTokens;

  tokens.forEach((token) => {
    switch (token[0]) {
      case "#":
        section.push(token);
        stack.push(token);

        // create a next section(dom level) and switch to it
        section = token[2] = [];
        break;
      case "/":
        // ['/', xxx] no need to add to tokens
        stack.pop();

        // switch section
        section = stack.length > 0 ? stack[stack.length - 1][2] : nestTokens;
        break;
      default:
        // note that the section is dynamical
        section.push(token);
        break;
    }
  });

  return nestTokens;
}
