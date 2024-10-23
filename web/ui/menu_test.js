import "assert";
import "./mock_jdom.js";
import "./mock_svg.js";

import Menu from "./menu.js";


suite('TestMenu', function() {
    suite('basic', function() {    
	test('constructor', function() {
	    new Menu(0, 0, 0, 0, "#menu");
	});

	test('addButton', function() {
	    const m = new Menu(0, 0, 0, 0, "#menu");
	    m.addButton("bob", function(){});
	});
    });

    suite('render', function() {    
	test('none', function() {
	    let m = new Menu(0, 0, 0, 0, "#menu");
	    m.render();
	});

	test('button', function() {
	    let m = new Menu(1, 1, 2, 2, "#menu");
	    mockText(m);
	    
	    m.addButton("bob", function(){});

	    m.render();
	});

	test("info", function() {
	    let m = new Menu(0, 0, 0, 0, "#menu");
	    mockText(m);

	    m.addInfo("bob");
	    
	    m.render();
	});

	test("line", function() {
	    let m = new Menu(0, 0, 0, 0, "#menu");
	    m.renderLine();
	});	
    });
});
