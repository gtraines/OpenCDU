/**
 * Created by graham on 7/1/17.
 */

    module.exports = {
        runLoadingCountdown: runLoadingCountdown
    };

    function runLoadingCountdown(fnToExec, countdownLength) {
        countdownLength = countdownLength || 500;

        var target = document.getElementById('spinner');
        var loadingTextEl = $('#loadingText');
        loadingTextEl.removeAttr("hidden");
        var countDownSpinner = new Spinner(getSpinnerOptions()).spin(target);

        target.appendChild(countDownSpinner.el);

        setTimeout(function() {

            countDownSpinner.stop();
            loadingTextEl.prop("hidden", "hidden");
            fnToExec();

        }, countdownLength);

    }

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