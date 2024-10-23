import "assert";
import "./mock_jdom.js";
import "./mock_svg.js";

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

