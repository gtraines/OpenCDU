// Generic CDU Program for whatever you like

var net = require('net');
var CONSTS = require('./src/mfd_constants.js');
var spinnerService = require('./src/spin_service.js');
// CDU Class
class CDU {
    constructor(canvas) {
        // Page references
        this.pages = {};
        this.defaultPage = null;
        this.curCduPage = null;

        // Canvas to render display
        this.canvas = canvas;

        this.connect();
    }

    handleMessage(msg) {
        for (var page in this.pages) {
            this.pages[page].handleMessage(msg);
        }
    }

    connect() {
        // Create socket connections to autopilot
        // this.ap_socket = new net.Socket();
        // this.ap_socket.connect(54545, '127.0.0.1', function() {
        //     console.log("Connected to server");
        // });

        var that = this;
        // this.ap_socket.on('data', function(data) {
        //     var msg = JSON.parse(data.toString());
        //     that.handleMessage(msg);
        // });

        var msg = {
            type: "telem",
            delta_t: 111
        };

        console.log("'Connected'");

        that.handleMessage(msg);
    }

    // Add a page to the CDU
    addPage(page) {
        // Add it to the pages table
        this.pages[page.getName()] = page;

        // If the default page is null, make it this one
        if (this.defaultPage == null) {
            this.defaultPage = page;
        }

        // If the current page is null, make it this one
        if (this.curCduPage == null) {
            this.curCduPage = this.defaultPage
        }
    }

    // Get a page by name
    getPage(name) {
        return this.pages[name];
    }

    // Set default page by name
    setDefaultPage(name) {
        this.defaultPage = this.pages[name];
    }

    // Get default page
    getDefaultPage() {
        return this.defaultPage;
    }

    // Get the current CDU page
    getCurrentPage() {
        return this.curCduPage;
    }

    clearScreen() {
        var currentCanvasDimensions = {
            width: canvas.getWidth(),
            height: canvas.getHeight()
        };

        var canvasConfig = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        };
        canvas.clear();

        canvas = new fabric.StaticCanvas('MainDisplay');

        // Clear the screen

    }

    // Set the current CDU page by name
    setCurrentPage(name) {
        this.curCduPage = this.pages[name];

        canvas.clear();
        // Draw the new page
        this.curCduPage.drawPage();
    }

    // Get the display canvas
    getDisplay() {
        return this.canvas;
    }

    // Handle user input
    handleInput(btnId) {
        this.curCduPage.handleInput(btnId);
    }
}

var canvas = {};
var cdu = {};

function renderCdu() {
    canvas = new fabric.StaticCanvas("MainDisplay");
    canvas.setDimensions({ width: "100%", height: "100%" }, { cssOnly: true });
    generateButtonCoords();
    var textConfig = {
        fontSize: 10,
        fontFamily: 'RobotoMono',
        fill: "limegreen",
        left: 5,
        top: 15
    };

    var returnText = new fabric.Text("< STATUS",
        textConfig);
    //
    var mainMenu = new fabric.Text("< MAIN MENU",
        textConfig);
    // ctx.fillText("< STATUS", 5, 15);
    // ctx.fillText("< NAVIGATION", 5, 38);
    // ctx.fillText("< SYSTEMS", 5, 63);
    //
    // ctx.fillText("SETTINGS >", 242, 15);

    canvas.add(returnText);
    canvas.add(mainMenu);
    var canvasCoords = getRenderCoordinates(CONSTS.BTNS.GAIN_DOWN, returnText);
    var mainMenuCoords = getRenderCoordinates(CONSTS.BTNS.GAIN_UP, mainMenu);

    mainMenu.set(
        {
            left: mainMenuCoords.left,
            top: mainMenuCoords.top
        });

    returnText.set(
        {
            left: canvasCoords.left,
            top: canvasCoords.top
        });

    canvas.renderAll();

    // cdu = new CDU(canvas);
    // var mainMenu = new MainMenuPage("main", cdu);
    // var statusPage = new StatusPage("status", cdu);
    // cdu.addPage(mainMenu);
    // cdu.addPage(statusPage);
    // cdu.setCurrentPage("main");
    //
    // $("button").click(function() {
    //     cdu.handleInput(this.id);
    // });
    //
    // cdu.connect();
}

$(document).ready(function() {

    console.log("Loading CDU");
    spinnerService.runLoadingCountdown(renderCdu);

});

var BTN_COL_ROW = [];

function addButtonCoord(buttonId, x, y) {
    var buttonCoordObject = {
        buttonId: buttonId,
        x: x,
        y: y
    };

    BTN_COL_ROW.push(buttonCoordObject);
}

function generateButtonCoords() {

    addButtonCoord(CONSTS.BTNS.OSB01, 1, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.OSB02, 2, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.OSB03, 3, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.OSB04, 4, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.OSB05, 5, CONSTS.COORDS.TOP);

    addButtonCoord(CONSTS.BTNS.OSB11, 5, CONSTS.COORDS.BOTTOM);
    addButtonCoord(CONSTS.BTNS.OSB12, 4, CONSTS.COORDS.BOTTOM);
    addButtonCoord(CONSTS.BTNS.OSB13, 3, CONSTS.COORDS.BOTTOM);
    addButtonCoord(CONSTS.BTNS.OSB14, 2, CONSTS.COORDS.BOTTOM);
    addButtonCoord(CONSTS.BTNS.OSB15, 1, CONSTS.COORDS.BOTTOM);

    addButtonCoord(CONSTS.BTNS.GAIN_UP, CONSTS.COORDS.LEFT, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.GAIN_DOWN, CONSTS.COORDS.LEFT, 1);

    addButtonCoord(CONSTS.BTNS.OSB20, CONSTS.COORDS.LEFT, 2);
    addButtonCoord(CONSTS.BTNS.OSB19, CONSTS.COORDS.LEFT, 3);
    addButtonCoord(CONSTS.BTNS.OSB18, CONSTS.COORDS.LEFT, 4);
    addButtonCoord(CONSTS.BTNS.OSB17, CONSTS.COORDS.LEFT, 5);
    addButtonCoord(CONSTS.BTNS.OSB16, CONSTS.COORDS.LEFT, 6);

    addButtonCoord(CONSTS.BTNS.BRT_UP, CONSTS.COORDS.LEFT, 7);
    addButtonCoord(CONSTS.BTNS.BRT_DOWN, CONSTS.COORDS.LEFT, CONSTS.COORDS.BOTTOM);

    addButtonCoord(CONSTS.BTNS.SYM_UP, CONSTS.COORDS.RIGHT, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.SYM_DOWN, CONSTS.COORDS.RIGHT, 1);

    addButtonCoord(CONSTS.BTNS.OSB06, CONSTS.COORDS.RIGHT, 2);
    addButtonCoord(CONSTS.BTNS.OSB07, CONSTS.COORDS.RIGHT, 3);
    addButtonCoord(CONSTS.BTNS.OSB08, CONSTS.COORDS.RIGHT, 4);
    addButtonCoord(CONSTS.BTNS.OSB09, CONSTS.COORDS.RIGHT, 5);
    addButtonCoord(CONSTS.BTNS.OSB10, CONSTS.COORDS.RIGHT, 6);

    addButtonCoord(CONSTS.BTNS.CON_UP, CONSTS.COORDS.RIGHT, 7);
    addButtonCoord(CONSTS.BTNS.CON_DOWN, CONSTS.COORDS.RIGHT, CONSTS.COORDS.BOTTOM);
}

function parsePageDefinition() {


}

function positionButtonLabel(params) {

}

function layoutButtonLabels(pageButtons) {

}

function getRenderCoordinates(buttonId, fabricTextObject, context) {
    var left = 0.0;
    var top = 0.0;

    var edgeMargin = 5.0;
    console.log(buttonId);
    var btnColRow = _.find(BTN_COL_ROW, function (btn) {
        console.log(btn);
        return btn.buttonId == buttonId;
    });

    if (btnColRow.x == CONSTS.COORDS.LEFT) {
        left = edgeMargin;
    } else if (btnColRow.x == CONSTS.COORDS.RIGHT) {
        left = canvas.getWidth() - (fabricTextObject.width + edgeMargin);
    } else {
        left = getXCenterForColumn(btnColRow.x) - (fabricTextObject.width / 2.0);
    }

    if (btnColRow.y == CONSTS.COORDS.TOP) {
        top = edgeMargin;
    } else if (btnColRow.y == CONSTS.COORDS.BOTTOM) {
        top = canvas.getHeight() - (fabricTextObject.height + edgeMargin);
    } else {
        top = getYCenterForRow(btnColRow.y);
    }

    return {
        left: left,
        top: top
    };
}

function getXCenterForColumn(col) {
    var widthStep = canvas.getWidth() / 7.0;

    var x_center = (widthStep * col) + (widthStep / 2.0);

    return x_center;
}

function getYCenterForRow(row) {
    console.log(canvas.getHeight());

    var heightStep = canvas.getHeight() / 7.50;
    var y_center = (heightStep * (row - 1)) + (heightStep / 2.0);

    return y_center;
}