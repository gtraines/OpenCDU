// Generic CDU Program for whatever you like

var net = require('net');
var CONSTS = require('./src/mfd_constants.js');
var spinnerService = require('./src/device/spin_service.js');
var renderService = require('./src/device/render_service.js');
var profilesService = require('./src/domain/profiles_service.js');

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

    var availablePages = profilesService.getPagesForProfile("tie_fighter.json");

    renderService.renderPage(availablePages[0], canvas);
}

$(document).ready(function() {

    console.log("Loading CDU");
    spinnerService.runLoadingCountdown(renderCdu);

});

