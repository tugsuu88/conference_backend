const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    // API routes
    fs.readdirSync(__dirname).forEach((file) => {
        let fileFirstIndex = file.substr(0, file.indexOf('.'));
        if (fileFirstIndex != 'index') {
            require(`./${file.split(/\.(?=[^\.]+$)/)[0]}`)(app);
        }
    });
};