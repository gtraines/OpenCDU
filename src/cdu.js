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
        this.pages = [];
        this.defaultPage = null;
        this.currentPage = null;

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
        this.pages = profilesService.getPagesForProfile("tie_fighter.json");
        this.setCurrentPage(this.pages[0].id);
    }

    // Set default page by name
    setDefaultPage(name) {
        this.defaultPage = _.find(this.pages, function (page) {
            return page.id == name;
        });
    }

    // Get default page
    getDefaultPage() {
        return this.defaultPage;
    }

    clearScreen() {
        this.canvas.clear();
    }

    // Set the current CDU page by name
    setCurrentPage(id) {
        this.currentPage = _.find(this.pages, function (page) {
            return page.id == id;
        });

        this.clearScreen();

        // Draw the new page
        renderService.renderPage(this.currentPage, this.canvas);
    }

    // Handle user input
    handleInput(btnId) {
        var pageButton = _.find(this.currentPage.buttons, function (button) {
            return button.buttonId == btnId;
        });

        if (pageButton.buttonId == undefined) {
            return;
        }

        if (pageButton.buttonType == CONSTS.BTN_TYPES.NAVIGATION) {
            this.setCurrentPage(pageButton.target);
        }
    }
}

var canvas = {};
var cdu = {};

function renderCdu() {

    canvas = new fabric.StaticCanvas("MainDisplay");
    canvas.setDimensions({ width: "100%", height: "100%" }, { cssOnly: true });

    cdu = new CDU(canvas);
    wireButtonDivs(cdu);
}

function wireButtonDivs(cduObj) {
    $("button").click(function() {
        cduObj.handleInput(this.id);
    });

    var divElems = [
        CONSTS.BTNS.GAIN_UP,
        CONSTS.BTNS.GAIN_DOWN,
        CONSTS.BTNS.BRT_UP,
        CONSTS.BTNS.BRT_DOWN,
        CONSTS.BTNS.SYM_UP,
        CONSTS.BTNS.SYM_DOWN,
        CONSTS.BTNS.CON_DOWN,
        CONSTS.BTNS.CON_UP
    ];

    _.each(divElems, function (elem) {
        $("#"+elem).click(function() {

            cduObj.handleInput(this.id);
        });
    });
}

$(document).ready(function() {

    console.log("Loading CDU");

    spinnerService.runLoadingCountdown(renderCdu);

});

