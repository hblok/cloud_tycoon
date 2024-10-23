import "assert";
import "./mock_jdom.js";
import "./mock_svg.js";

import CityMenu from "./citymenu.js";


suite('TestCityMenu', function() {
    suite('basic', function() {    
	test('constructor', function() {
	    new CityMenu({}, 0, 0);
	});
    });

    suite('render', function() {    
	test('none', function() {
	    let m = new CityMenu({}, 0, 0);
	    mockText(m);
	    
	    //m.render();
	});

	test('info', function() {
	    let info = {
		"city": "London",
	    };
	    let m = new CityMenu(info, 0, 0);
	    mockText(m);
	    
	    //m.render();
	});	
    });
});
