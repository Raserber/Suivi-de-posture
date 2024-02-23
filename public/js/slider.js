
var updateValTorse = function(val) {
    angleTorse = parseInt(val*360/100 - 180)
};

var updateValJambes = function(val) {
    angleJambes = parseInt(val*360/100 - 180)

    if (!bool_3capteurs) {

        angleGenoux = parseInt(val*360/100 - 180)
        rangeGenoux.value = val
    }
};

var updateValGenoux = function(val) {
    angleGenoux = parseInt(val*360/100 - 180)

    if (!bool_3capteurs) {

        angleJambes = parseInt(val*360/100 - 180)
        rangeJambes.value = val
    }
};