# OpenCDU
A general purpose Control Display Unit (like found in airliner and jet fighter cockpits) written in JavaScript for electron

## What does it do?
Right now, for you, probably nothing. However, it's a good framework to use as a starting point if you're looking to build a general purpose user interface for something, especially if you want it to have an aviation/space/military look-and-feel. See "What is a CDU?" for more information about it's uses. Adding buttons and pages to the interface is as easy as editing a webpage, and the JSON message format is very simple to use. It shouldn't be much work to integrate this with any other code that has library support for TCP and JSON.

## How to run with npm (the node.js package manager)
This requires node/npm to be installed.

To install the required JavaScript dependencies, navigate in a shell to the directory where you cloned the code and run:
    npm install

Then to run the program you can use:
    npm start

## What is a CDU?
A CDU is basically a small Multi Function Display (MFD) along with an alphanumeric keypad. It generally also has some other buttons (which will vary from aircraft to aircraft) to call up specific data quickly. The MFD is used to show various pages and menus which can be navigated using the buttons on either side of the screen. 

The CDU is usually used for things such as:
- Entering and managing waypoints
- Monitoring and configuring aircraft sub-systems
- Retrieving weather and NOTAM information
- Troubleshooting issues in flight
 
I started working on this project intending to use it as the primary interface to the autopilot I'm writing for Kerbal Space Program using the Kerbal Remote Procedure Calls mod (kRPC). That is still the plan, but for a long time it will probably be general enough that others could find it usefull, even if only as a starting point to modify it to their own ends.

## Implementation Details
I tried to keep it as simple as possible:
- All the pages are classes which extend the CDUPage class.
- The pages have handlers for button input, handlers for messages coming from the autopilot, and a function which draws the display for that page (to an HTML5 canvas).
- The handlers in the pages can redraw the page, switch to a different page, and return to a previous page if one was set
- I plan to add a system by which a page can "return" data to the previous "calling" page, allowing general purpose data-input pages to be re-used.
- The CDU object is intialized, then you initialize and add all the pages.
- The CDU object uses a node.js net library TCP socket to talk to my autopilot code (the autopilot is the "server").
- The communications protocol with the autopilot is just JSON objects with at minimum a "type" string field.

## OpenCDU and Electron
OpenCDU is a JavaScript application meant to be run within the electron framework. Electron is basically a chromium window with built-in node.js and v8 capabilities for the JavaScript running within the browser instance. It allows one to reasonably write desktop applications in JavaScript while taking advantage of the UI capabilities of HTML5. 

A traditional node.js application would behave as a webserver and serve the html/Javascript to any client browser, and then interact with it either through ajax or something like socket.io. This is how the project started. The server side code would then also use node.js' net library to open a TCP socket to talk to my kerbal space program autopilot code written in C++.

Then somebody on reddit recommended I use Electron, which meant that my client side code could now suddenly use node.js' net library itself and the whole server side layer could be removed since it's only purpose was to relay information to the autopilot. While recently I've been forced to admit that HTML5/Javascript is probably the fastest and easiest way to build a UI these days, I'm still not big on web programming. Thus something which allows the removal of an entire layer of that was welcome.
