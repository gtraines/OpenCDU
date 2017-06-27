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
        for(var page in this.pages) {
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
        var currentCanvasDimensions = new {
            width: canvas.getWidth(),
            height: canvas.getHeight()
        };

        var canvasConfig = new {
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

function getSpinnerOptions() {
    var opts = {
        lines: 11 // The number of lines to draw
        , length: 24 // The length of each line
        , width: 14 // The line thickness
        , radius: 42 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 0.7 // Corner roundness (0..1)
        , color: '#32CD32' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 0.9 // Rounds per second
        , trail: 50 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    };

    return opts;
}

function runLoadingCountdown(fnToExec, countdownLength) {
    countdownLength = countdownLength || 1000;

    var target = document.getElementById('spinner');
    console.log(target);
    var countDownSpinner = new Spinner(getSpinnerOptions()).spin(target);

    console.log(countDownSpinner);

    target.appendChild(countDownSpinner.el);

    setTimeout(function () {
        console.log("counted down");

        countDownSpinner.stop();
        fnToExec();
        return;
    }, countdownLength);

}

function renderCdu() {
    canvas = new fabric.StaticCanvas("MainDisplay");
    canvas.setDimensions({ width: "100%", height: "100%"}, { cssOnly: true});

    var textConfig = {
        fontSize: 14,
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

$(document).ready( function() {

    console.log("Loading CDU");
    runLoadingCountdown(renderCdu);

});

