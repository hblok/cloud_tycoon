import jsdom from "jsdom";
import jquery from "jquery";

const html = '<!doctype html><html><body><svg id="menu"></div><svg id="map"></div></body></html>';

const { JSDOM } = jsdom;
const { window } = new JSDOM(html);
const { document } = (new JSDOM(html)).window;
global.document = document;
global.window = window;
global.$ = jquery(window);

//console.log(window);
