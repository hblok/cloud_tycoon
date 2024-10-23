import { SVG } from "@svgdotjs/svg.js";
//import { SVG } from "svg";

//const svg = require("@svgdotjs/svg.js");
//global.SVG = svg.SVG;

//console.log(SVG);

function mockText(menu) {
    // Mock away the Text type. (Getting bbox of element "text" is not possible: TypeError: clone.node.getBBox is not a function.)
    menu.grp.text = function() { return SVG().rect(0,0); }
}

global.mockText = mockText;

