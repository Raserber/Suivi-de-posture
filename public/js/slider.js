
/* Ces variables sont directement utlisé dans le fichier index.html dans la
définition des balises pour update les valeurs de angleTorse en fonction des
valeurs donnés par l'utilisateur
*/

var updateValTorse = function(val) {
    angleTorse = parseInt(val*360/100 - 180)
};

var updateValCuisses = function(val) {
    angleCuisses = parseInt(val*360/100 - 180)

    if (!bool_3capteurs) {

        angleJambes = parseInt(val*360/100 - 180)
        rangeJambes.value = val
    }
};

var updateValJambes = function(val) {
    angleJambes = parseInt(val*360/100 - 180)

    if (!bool_3capteurs) {

        angleCuisses = parseInt(val*360/100 - 180)
        rangeJambes.value = val
    }
};