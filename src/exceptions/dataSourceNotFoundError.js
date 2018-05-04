const DataSourceNotFoundError = function(message, dataSource){
    this.message=message
    this.dataSource = dataSource;
};

Object.setPrototypeOf(DataSourceNotFoundError, Error);
DataSourceNotFoundError.prototype = Object.create(Error.prototype);
DataSourceNotFoundError.prototype.name = "DataSourceNotFoundError";
DataSourceNotFoundError.prototype.message = "";
DataSourceNotFoundError.prototype.dataSource = "";
DataSourceNotFoundError.prototype.constructor = DataSourceNotFoundError;

module.exports = DataSourceNotFoundError;
