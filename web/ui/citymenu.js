import Menu from "./menu.js";

const menuWidth = 110;
const menuHeight = 110;

var _getIntervalId = null;

class CityMenu extends Menu {

    #agentGrpc = null;

    constructor(info, agentGrpc, x, y) {
	// todo: ID

	// Render menu up, to avoid going outside the viewport.
	if (y + menuHeight > info.mapHeight) {
	    y = y - menuHeight;
	}
	
	super(x, y, menuWidth, menuHeight, "#map");
	
	this.#agentGrpc = agentGrpc;
	this.info = info;
	this.addItems();
    }

    addItems() {
	super.addInfo(this.info.city);
	super.addDivider();
	super.addButton("Planes", function(){});
	super.addButton("Airport", $.proxy(this.getInfo, this));
	super.addButton("Package", function(){});
    }

    loadInfoTable() {
	$.get("ui/info_table.html", function(content) {
	    $("#infoTable").html(content);
	});	
    }

    getInfo() {
	this.loadInfoTable();

	if (_getIntervalId) {
	    clearInterval(_getIntervalId);
	}
	
	_getIntervalId = setInterval($.proxy(this.getServerInfo, this), 1000);
    }
    
    getServerInfo(city, callback) {
	this.#agentGrpc.getServerInfo(this.info.city, $.proxy(this.updateInfoTable, this));
    }

    updateInfoTable (serverInfo) {
	this.setInfo("server", serverInfo.getHostname());
	this.setInfo("ip", serverInfo.getIp());
	this.setInfo("cloud", serverInfo.getCloud());
	this.setInfo("load", serverInfo.getMetrics().getMetricsMap().get("load"));
	this.setInfo("memTotal", serverInfo.getMetrics().getMetricsMap().get("mem_total"));
	this.setInfo("memFree", serverInfo.getMetrics().getMetricsMap().get("mem_free"));
	this.setInfo("time", serverInfo.getMid().getTime().toDate().toLocaleTimeString());
    }

    setInfo(cellId, value) {
	var cell = $("#infoTable #" + cellId);
	if(cell) {
	    var node = cell[0];
	    node.textContent = value;
	} else {
	    console.log("Cell not found: " + cellId);
	}
    }
}

export default CityMenu;
