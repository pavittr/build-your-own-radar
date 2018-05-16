const fs = require('fs');
const marked = require('marked');

function RossWebpackPlugin() { };

function RossWebpackPlugin(options) {
    this.folder = options.folder;
}

RossWebpackPlugin.prototype.apply = function (compiler) {
    //now you have access to all the compiler instance methods
    compiler.plugin('emit', function (compilation, callback) {
        console.log(marked('I am using __markdown__.'));

        const testFolder = compiler.context + "/" + this.folder + "/";

        var blips = [];

        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                var delim = "---";
                var delimLength = delim.length;
                var text = fs.readFileSync(testFolder + "/" + file, 'utf8');
                var startOfBlock = text.indexOf(delim);
                var endOfBlock = text.indexOf(delim, startOfBlock + delimLength + 1);
                var block = text.substring(startOfBlock+delimLength, endOfBlock).trim();
                var someBlip = {};

                var attrs = block.split("\n");
                attrs.forEach(attr => {
                    var trimmedAttr = attr.trim();
                    var key = trimmedAttr.substring(0, trimmedAttr.indexOf(":"));
                    var value = trimmedAttr.substr( trimmedAttr.indexOf(":") + 1).trim();
                    someBlip[key] = value;
                });

                var descBlock = text.substr(endOfBlock + delimLength).trim();
                //someBlip["description"] = marked(descBlock);
                someBlip["description"] = descBlock;
                blips.push(someBlip);
            });
            
            var stringifiedBlips = JSON.stringify(blips);

            // Insert this list into the Webpack build as a new file asset:
            compilation.assets['data.json'] = {
                source: function () {
                    return stringifiedBlips;
                },
                size: function () {
                    return stringifiedBlips.length;
                }
            };
            callback();
        })
    }.bind(this));
}
module.exports = RossWebpackPlugin;