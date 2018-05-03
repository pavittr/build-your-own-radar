const SheetNotFoundError = require('../../src/exceptions/sheetNotFoundError');
const ExceptionMessages = require('./exceptionMessages');

const Github = function (blipRoot) {
    var self = {};

    self.exists = function (callback) {



  




        // TODO: Move this out (as HTTPClient)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/data.json", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("All is good");
                    console.log(callback);

                    var blips = JSON.parse(this.responseText);
                    return callback(blips);
                } else {
                    return callback([], new SheetNotFoundError(ExceptionMessages.SHEET_NOT_FOUND));
                }
            }
        };
        xhr.send(null);
    };

    return self;
};

module.exports = Github;
