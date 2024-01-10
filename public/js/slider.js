
var updateValTorse = function(val) {
    angleTorse = parseInt(val*360/100 - 180)
};

var updateValJambes = function(val) {
    angleJambes = parseInt(val*360/100 - 180)

    if (!toggle_3capteurs.checked) {

        angleGenoux = parseInt(val*360/100 - 180)
        rangeGenoux.value = val
    }
};

var updateValGenoux = function(val) {
    angleGenoux = parseInt(val*360/100 - 180)

    if (!toggle_3capteurs.checked) {

        angleJambes = parseInt(val*360/100 - 180)
        rangeJambes.value = val
    }
};