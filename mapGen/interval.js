const fs = require('fs');
const path = require('path');
var input = require('./input.json');
var prevMapGen = fs.readFileSync("./generation.js").toString();
setInterval(() => {
    var curr = fs.readFileSync("./generation.js").toString();
    if (prevMapGen == curr) return;
    prevMapGen = curr;
    console.log("Reevaluating...");
    input = require('./input.json');
    invalidateRequireCacheForFile("./generation.js");
    try {
        mapGen = require('./generation.js');
        output = mapGen(input);
    } catch (e) {
        console.log("Error with input processing. Error: " + e);
        return;
    }
    try {
        fs.writeFileSync("./output.json", JSON.stringify(output));
    } catch (e) {
        console.log("Error with output write.");
        return;
    }
    console.log("Reevaluated.");
}, 300);
var invalidateRequireCacheForFile = function (filePath) {
    delete require.cache[path.resolve(filePath)];
};