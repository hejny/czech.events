//TODO: purge from certificate logic
var page = require('webpage').create();
var system = require('system');

var usage = 'Usage: phantomjs ./phantom.js certificateURL.html destination.pdf';

phantom.onError = onErrorID('phantom');
page.onError = onErrorID('page');

var certificateURL = system.args[system.args.length - 2];
var destination = system.args[system.args.length - 1];
var renderOnCallback = system.args.includes('--render-on-callback');
var consoleLogs = [];

if (!certificateURL) {
    onError('Observation ID is a required argument\n' + usage);
}
if (!destination) {
    onError('Destination is a required argument\n' + usage);
}

const VIEWPORT_SIZE = 854;
page.viewportSize = {
    width: VIEWPORT_SIZE,
    height: VIEWPORT_SIZE,
};
page.paperSize = {
    // TODO: Make configurable
    format: 'A4',
    orientation: 'portrait',
    margin: '0.25cm',
};
page.onConsoleMessage = function(message, line, file, level, functionName) {
    const messageString = ['string', 'number'].includes(typeof message)
        ? message
        : JSON.stringify(message, null, 2);
    consoleLogs.push(
        level.toUpperCase() +
            ': ' +
            messageString +
            '\n' +
            functionName +
            ' in ' +
            file +
            ' at ' +
            line,
    );
};
page.onResourceError = function({
    id,
    url,
    errorCode,
    errorString,
    status,
    statusText,
}) {
    console.error(id, url, errorCode, errorString, status, statusText);
};

if (renderOnCallback) {
    page.onCallback = function() {
        render(page, destination);
    };
}

try {
    console.debug('Rendering URL', certificateURL);
    page.open(certificateURL, function(status) {
        if (status !== 'success') {
            onErrorID('load finished')(status);
        }
        if (!renderOnCallback) {
            render(page, destination);
        }
    });
} catch (error) {
    onErrorID('run')(error);
}

function render(page, destination) {
    console.log('Rendering');
    page.render(destination, { format: 'pdf' });
    console.log(destination);
    console.debug(consoleLogs);
    page.close();
    slimer.exit();
}

function onErrorID(id) {
    return function(error) {
        console.log('Error in: ' + id);
        onError(error);
    };
}

function onError(error) {
    console.log('Console logs:\n' + consoleLogs.join('\n'));
    console.log(error);
    phantom.exit(1);
}
