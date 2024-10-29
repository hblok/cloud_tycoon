console.log("## NODE_PATH:", process.env.NODE_PATH)

import path from 'path'
import { fileURLToPath } from 'url';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
const __dirname = path.resolve();
console.log("## mock_svg.js: ", path.join(__dirname))


import { SVG } from "@svgdotjs/svg.js";
//import { SVG } from "../external/svg.min.js";

//const svg = require("@svgdotjs/svg.js");
//global.SVG = svg.SVG;

//console.log(SVG);

function mockText(menu) {
    // Mock away the Text type. (Getting bbox of element "text" is not possible: TypeError: clone.node.getBBox is not a function.)
    menu.grp.text = function() { return SVG().rect(0,0); }
}

global.mockText = mockText;

