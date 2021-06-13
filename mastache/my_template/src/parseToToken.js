import Scanner from "./Scanner";
import tokenNester from "./nestToken";
import trim from './trim';

export default function parseTemplateToTken(tempStr) {
  let scanner = new Scanner(tempStr);

  const tokens = [];

  // when it is not the end of the str
  while (!scanner.eos()) {
    let word = scanner.scan("{{");

    if (word !== "") {
      tokens.push(["text", trim(word)]);
    }

    scanner.skip("{{");

    // word in {{}}
    word = scanner.scan("}}");

    if (word !== "") {
      if (word[0] === "#") {
        tokens.push(["#", word.slice(1)]);
      } else if (word[0] === "/") {
        tokens.push(["/", word.slice(1)]);
      } else {
        tokens.push(["name", word]);
      }
    }

    scanner.skip("}}");
  }

  return tokenNester(tokens);
}
