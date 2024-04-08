
/* Ces variables sont directement utlisé dans le fichier index.html dans la
définition des balises pour update les valeurs de angleTorse en fonction des
valeurs donnés par l'utilisateur
*/

var updateValTorse = function(val) {
    angleTorse = parseInt(val*360/100 - 180)
};

var updateValJambes = function(val) {
    angleJambes = parseInt(val*360/100 - 180)

    if (!bool_3capteurs) {

        angleTibias = parseInt(val*360/100 - 180)
        rangeGenoux.value = val
    }
};

var updateValGenoux = function(val) {
    angleTibias = parseInt(val*360/100 - 180)

    if (!bool_3capteurs) {

        angleJambes = parseInt(val*360/100 - 180)
        rangeJambes.value = val
    }
};