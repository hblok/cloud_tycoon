//var jsdom = require('jsdom');
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const { window } = new JSDOM(
    '<!doctype html><html><body><svg id="menu"></div></body></html>'
);
const { document } = (new JSDOM(
    '<!doctype html><html><body><svg id="menu"></div></body></html>'
)).window;
global.document = document;
global.window = window;

//console.log(window);
