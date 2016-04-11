// Cdu Page Classes

// Abstract class to derive other page classes from
class CDUPage {
    constructor(name,CDUobj) {
        this.cdu = CDUobj;
        this.returnPage = null;
        this.name = name;
    }

    getName() {
        return this.name;
    }
    
    setReturnPage(name) {
        this.returnPage = name;
    }

    handleMessage(msg) {
        // Handle a message from the autopilot
    }
    
    handleInput(btnId) {
        console.log(btnId);

        if (btnId == "D12") {
            // Go to return page or default page
            var return_page = null;
            if (this.returnPage != null) {
                return_page = this.returnPage;
                this.returnPage = null;
            } else
                return_page = this.cdu.getDefaultPage().getName();

            console.log("Moving to page " + return_page);
            this.cdu.setCurrentPage(return_page);
            return true;
        }
        
        return false;
    }

    drawPage() {
        var c = this.cdu.getDisplay();
        var ctx = c.getContext("2d");

        // Draw Return option (which basically every page has other
        // than the main menu)
        ctx.font = "10px Lucida Console, Monaco, monospace";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("RETURN>", 255, 138);
    }
}

// Page for the main menu
class MainMenuPage extends CDUPage {
    handleInput(btnId) {
        switch(btnId) {
        case "D1":
            console.log("Moving to status page");
            this.cdu.getPage("status").setReturnPage(this.name);
            this.cdu.setCurrentPage("status");
            break;
        }
    }

    drawPage() {
        var c = this.cdu.getDisplay();
        var ctx = c.getContext("2d");
        
        // Draw Menu Options
        ctx.font = "10px Lucida Console, Monaco, monospace";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("MAIN MENU", 125, 15);

        ctx.fillText("<STATUS", 5, 15);
        ctx.fillText("<NAVIGATION", 5, 38);
        ctx.fillText("<SYSTEMS", 5, 63);
        
        ctx.fillText("SETTINGS>", 242, 15);
    }
}

class StatusPage extends CDUPage {
    constructor(name,CDUobj) {
        super(name,CDUobj);

        this.univ_time = 0.0;
        this.delta_t = 0.0;
        
        this.altASL = 0.0;
        this.altRadar = 0.0;

        this.speed = 0.0;
        this.vspeed = 0.0;

        this.heading = 0.0;

        this.roll = 0.0;
        this.pitch = 0.0;
        this.aoa = 0.0;
        this.ssa = 0.0;
    }

    handleMessage(msg) {
        if (msg["type"] == "telem") {
            this.univ_time = msg["univ_time"];
            this.delta_t = msg["delta_t"];
            this.altASL = msg["altASL"];
            this.altRadar = msg["altAGL"];
            this.speed = msg["speed"];
            this.vspeed = msg["vspeed"];
            this.heading = msg["heading"];
            this.roll = msg["roll"];
            this.pitch = msg["pitch"];
            this.aoa = msg["AoA"];
            this.ssa = msg["SSA"];
        }
        
        if (this.cdu.getCurrentPage() != this)
            return;
        
        this.cdu.clearScreen();
        this.drawPage();        
    }
    
    drawPage() {
        // Get super class to draw return button
        super.drawPage();

        var c = this.cdu.getDisplay();
        var ctx = c.getContext("2d");
        ctx.font = "8 px Lucida Console, Monaco, monospace";
        ctx.fillStyle = "#FFFFFF";
        
        ctx.fillText("dt: " + this.delta_t.toFixed(5), 2, 10);
        
        ctx.font = "10px Lucida Console, Monaco, monospace";
        
        ctx.fillText("FLIGHT STATUS", 115, 15);

        ctx.fillText("TIME (UT): " + this.univ_time.toFixed(2)
                     + " s", 15, 35);
        ctx.fillText("ALT (ASL): " + this.altASL.toFixed(2)
                     + " m", 15, 50);
        ctx.fillText("ALT (RAD): " + this.altRadar.toFixed(2)
                     + " m", 15, 65);

        ctx.fillText("    Pitch: " + this.pitch.toFixed(2)
                     + " deg", 150, 35);
        ctx.fillText("     Roll: " + this.roll.toFixed(2)
                     + " deg", 150, 50);
        ctx.fillText("      AoA: " + this.aoa.toFixed(2)
                     + " deg", 150, 65);
        ctx.fillText("      SSA: " + this.ssa.toFixed(2)
                     + " deg", 150, 80);
        
        ctx.fillText("    SPEED: " + this.speed.toFixed(2)
                     + " m/s", 15, 80);
        ctx.fillText("     VSPD: " + this.vspeed.toFixed(2)
                     + " m/s", 15, 95);
        ctx.fillText("      HDG: " + this.heading.toFixed(2)
                     + " deg", 15, 110);
    }

    handleInput(btnId) {
        // Return if the super handled it
        if(super.handleInput(btnId))
            return;

        var c = this.cdu.getDisplay();
        var ctx = c.getContext("2d");
        
    }
}
