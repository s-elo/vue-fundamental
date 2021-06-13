import renderToken from "./renderToken";

export default function parseArray(sectionData, token) {
  let ret = "";

  sectionData.forEach((val) => {
    ret += renderToken(token, {
      ...val,
      // handle {{.}}
      ".": val,
    });
  });

  return ret;
}
