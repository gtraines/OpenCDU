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
    }

    handleMessage(msg) {
        for(var page in this.pages) {
            this.pages[page].handleMessage(msg);
        }
    }
    
    connect() {
        // Create socket connections to autopilot
        this.ap_socket = new net.Socket();
        this.ap_socket.connect(54545, '127.0.0.1', function() {
            console.log("Connected to server");
        });

        var that = this;
        this.ap_socket.on('data', function(data) {
            var msg = JSON.parse(data.toString());
            that.handleMessage(msg);
        });
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
        var c = this.canvas;
        var ctx = c.getContext("2d");
        // Clear the screen
        ctx.clearRect(0, 0, c.width, c.height);
    }
    
    // Set the current CDU page by name
    setCurrentPage(name) {
        this.curCduPage = this.pages[name];

        var c = this.canvas;
        var ctx = c.getContext("2d");
        // Clear the screen
        ctx.clearRect(0, 0, c.width, c.height);
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

var canvas = null;
var cdu = null;

$(document).ready( function() {
    
    canvas = document.getElementById("MainDisplay");
    
    cdu = new CDU(canvas);
    var mainMenu = new MainMenuPage("main", cdu);
    var statusPage = new StatusPage("status", cdu);
    cdu.addPage(mainMenu);
    cdu.addPage(statusPage);
    
    cdu.getCurrentPage().drawPage();
    
    $("button").click(function() {
        cdu.handleInput(this.id);
    });

    cdu.connect();
    
});

