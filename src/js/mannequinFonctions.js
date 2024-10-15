function customPosture (angleTorse, angleCuisseGauche, angleCuisseDroite, angleJambeGauche, angleJambeDroite) {

    /* Les 2 prochains if servent à empécher certains angles qui feraient buguer le mannequin.
    Cela ne devrait pas empécher le mannequin de bouger plutôt librement, même dans des positions
    non possible par un humain
    */

    if ((Math.abs(angleCuisseGauche) + Math.abs(angleTorse) > 180) &&
    ((angleCuisseGauche > 0 && angleTorse < 0) || (angleCuisseGauche < 0 && angleTorse > 0))) {

      angleCuisseGauche += (angleTorse-(angleCuisseGauche-180))%360
    }

    if ((Math.abs(angleJambeGauche) + Math.abs(angleCuisseGauche) > 180) &&
    ((angleJambeGauche > 0 && angleCuisseGauche < 0) || (angleJambeGauche < 0 && angleCuisseGauche > 0))) {

      angleJambeGauche += (angleCuisseGauche-(angleJambeGauche-180))%360
    }

    if ((Math.abs(angleCuisseDroite) + Math.abs(angleTorse) > 180) &&
    ((angleCuisseDroite > 0 && angleTorse < 0) || (angleCuisseDroite < 0 && angleTorse > 0))) {

      angleCuisseDroite += (angleTorse-(angleCuisseDroite-180))%360
    }

    if ((Math.abs(angleJambeDroite) + Math.abs(angleCuisseDroite) > 180) &&
    ((angleJambeDroite > 0 && angleCuisseDroite < 0) || (angleJambeDroite < 0 && angleCuisseDroite > 0))) {

      angleJambeDroite += (angleCuisseDroite-(angleJambeDroite-180))%360
    }

    var CORPS = angleTorse
    var CUISSE_GAUCHE = -(angleCuisseGauche-angleTorse)
    var CUISSE_DROITE = -(angleCuisseDroite-angleTorse)
    var JAMBE_DROITE = angleJambeDroite-angleCuisseDroite
    var JAMBE_GAUCHE = angleJambeGauche-angleCuisseGauche

    if (Math.abs(angleJambeDroite) >= 80) {
      var PIED_DROIT = 0  
    }
    else {  
      var PIED_DROIT = -(CORPS - CUISSE_DROITE + JAMBE_DROITE)
    }

    if (Math.abs(angleJambeGauche) >= 80) {
      var PIED_GAUCHE = 0  
    }
    else {  
      var PIED_GAUCHE = -(CORPS - CUISSE_GAUCHE + JAMBE_GAUCHE)
    }


    return {"version":7,"data":[[0,3.8,0],[CORPS,-90,0],[0,0,-2],[0,0,5],[6,0,CUISSE_GAUCHE],[JAMBE_GAUCHE],[-6,-6,PIED_GAUCHE],[-6,0,CUISSE_DROITE],
            [JAMBE_DROITE],[6,6,PIED_DROIT],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],
            [0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],
            [0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}
            
}

export {
  customPosture
}