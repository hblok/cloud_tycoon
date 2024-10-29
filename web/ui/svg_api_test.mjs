import "assert";
import "./mock_jdom.mjs";
import "./mock_svg.mjs";

import {SVG} from "@svgdotjs/svg.js";

suite('TestSVG', function() {
    suite('basic', function() {    
	test('constructor', function() {
	    SVG();
	});

	test('element', function() {
	    SVG("#menu");
	});
	
    });
});

