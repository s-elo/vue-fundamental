import parse from "./parse.js";

const tempStr = `
    <div>
        <h3 class="red" id="leo">hi</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>
`;

const res = parse(tempStr);
console.log(res);
