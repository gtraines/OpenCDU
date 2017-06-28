// Generic CDU Program for whatever you like

var net = require('net');

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



function runLoadingCountdown(fnToExec, countdownLength) {
    countdownLength = countdownLength || 1000;

    var target = document.getElementById('spinner');
    var loadingTextEl = $('#loadingText');
    loadingTextEl.removeAttr("hidden");
    var countDownSpinner = new Spinner(getSpinnerOptions()).spin(target);

    target.appendChild(countDownSpinner.el);

    setTimeout(function() {

        countDownSpinner.stop();
        loadingTextEl.prop("hidden", "hidden");
        fnToExec();
        return;
    }, countdownLength);

}

function renderCdu() {
    canvas = new fabric.StaticCanvas("MainDisplay");
    canvas.setDimensions({ width: "100%", height: "100%" }, { cssOnly: true });

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
    // ctx.fillText("MAIN MENU", 125, 15);
    // ctx.fillText("< STATUS", 5, 15);
    // ctx.fillText("< NAVIGATION", 5, 38);
    // ctx.fillText("< SYSTEMS", 5, 63);
    //
    // ctx.fillText("SETTINGS >", 242, 15);

    canvas.add(returnText);
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
    runLoadingCountdown(renderCdu);

});

function getSpinnerOptions() {
    var opts = {
        lines: 11 // The number of lines to draw
            ,
        length: 24 // The length of each line
            ,
        width: 14 // The line thickness
            ,
        radius: 42 // The radius of the inner circle
            ,
        scale: 1 // Scales overall size of the spinner
            ,
        corners: 0.7 // Corner roundness (0..1)
            ,
        color: '#32CD32' // #rgb or #rrggbb or array of colors
            ,
        opacity: 0.25 // Opacity of the lines
            ,
        rotate: 0 // The rotation offset
            ,
        direction: 1 // 1: clockwise, -1: counterclockwise
            ,
        speed: 0.9 // Rounds per second
            ,
        trail: 50 // Afterglow percentage
            ,
        fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            ,
        zIndex: 2e9 // The z-index (defaults to 2000000000)
            ,
        className: 'spinner' // The CSS class to assign to the spinner
            ,
        top: '50%' // Top position relative to parent
            ,
        left: '50%' // Left position relative to parent
            ,
        shadow: false // Whether to render a shadow
            ,
        hwaccel: false // Whether to use hardware acceleration
            ,
        position: 'absolute' // Element positioning
    };

    return opts;
}

function createButtonCoord(buttonId, topInt, center) {
    var buttonCoordObject = {
        buttonId: buttonId,
        left: leftInt,
        top: topInt
    };

    return Object.create(buttonCoordObject);
}

var BTN_CONSTS = {
    GAIN_UP: 'GAIN_UP',
    GAIN_DOWN: 'GAIN_DOWN',
    BRT_UP: 'BRT_UP',
    BRT_DOWN: 'BRT_DOWN',
    SYM_UP: 'SYM_UP',
    SYM_DOWN: 'SYM_DOWN',
    CON_UP: 'CON_UP',
    CON_DOWN: 'CON_DOWN',
    OSB01: 'OSB01',
    OSB02: 'OSB02',
    OSB03: 'OSB03',
    OSB04: 'OSB04',
    OSB05: 'OSB05',
    OSB06: 'OSB06',
    OSB07: 'OSB07',
    OSB08: 'OSB08',
    OSB09: 'OSB09',
    OSB10: 'OSB10',
    OSB11: 'OSB11',
    OSB12: 'OSB12',
    OSB13: 'OSB13',
    OSB14: 'OSB14',
    OSB15: 'OSB15',
    OSB16: 'OSB16',
    OSB17: 'OSB17',
    OSB18: 'OSB18',
    OSB19: 'OSB19',
    OSB20: 'OSB20',
}

function generateButtonCoords() {
    var buttonCoords = [];
    var currentCanvasDimensions = {
        width: canvas.getWidth(),
        height: canvas.getHeight()
    };
    var widthStep = currentCanvasDimensions.width / 7.0;
    var heightStep = currentCanvasDimensions.height / 7.0;
    var buttonCenter = 0;

    // left
    var leftButtonIds = ['GAIN_UP', 'GAIN_DOWN', 'OSB20', 'OSB20', 'OSB20', 'OSB20', 'OSB20', 'SYM_UP', 'SYM_DOWN'];

    // top
    var topButtonIds = [
        BTN_CONSTS.OSB01,
        BTN_CONSTS.OSB02,
        BTN_CONSTS.OSB03,
        BTN_CONSTS.OSB04,
        BTN_CONSTS.OSB05
    ];
    var topTop = 5;
    var topLeft = widthStep;
    buttonCenter = topLeft + (widthStep / 2.0);

    _.each(topButtonIds, function(buttonId) {
            buttonCoords.push(createButtonCoord(buttonId, left, top));
            left +=
        })
        // right

    // bottom


}