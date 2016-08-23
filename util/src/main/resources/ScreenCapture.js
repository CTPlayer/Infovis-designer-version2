/**
 * 生成缩略图
 *
 * Created by CSJ on 16/8/23.
 */
var page = require('webpage').create(),
    system = require('system'),
    url, picName, jsWait, tmpDir;
url = system.args[ 1 ];
picName = system.args[ 2 ],
jsWait = system.args[ 3 ] || 2000,
tmpDir = system.args[ 4 ];

page.viewportSize = { width: 1024, height: 1024 };
page.clipRect = { top: 0, left: 0, width: 1024, height: 1024 };

// this function writes the arguments to stdout
var log = function () {
    Array.prototype.slice.call(arguments).map(system.stdout.writeLine);
};

// this function writes the arguments to the stderr
var err = function () {
    Array.prototype.slice.call(arguments).map(system.stderr.writeLine);
};

// this function renders the page
var renderPage = function () {
    // render the page
    try {
        page.render(tmpDir + '/' + picName + '.JPEG');
    } catch (error) {
        phantom.exit(3);
    }
    phantom.exit();
};

var renderIfDone = function renderIfDone() {
    setTimeout(renderPage, jsWait);
};

// when finishing loading the resources
// start the timer for js execution to complete

page.open(url, renderIfDone);