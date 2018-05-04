const DataSourceNotFoundError = require('../../src/exceptions/dataSourceNotFoundError');
const ExceptionMessages = require('./exceptionMessages');

const JsonData = function (blipRoot) {
    var self = {};

    self.exists = function (callback) {

        var dataSource = "/data.json";
        // TODO: Move this out (as HTTPClient)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', dataSource, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var blips = JSON.parse(this.responseText);
                    return callback(blips);
                } else {
                    return callback([], new DataSourceNotFoundError(ExceptionMessages.JSON_DATA_NOT_FOUND, dataSource));
                }
            }
        };
        xhr.send(null);
    };

    return self;
};

module.exports = JsonData;
