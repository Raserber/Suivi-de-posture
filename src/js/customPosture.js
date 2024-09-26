export function customPosture (angleTorse, angleCuisses, angleJambes) {

    /* Les 2 prochains if servent à empécher certains angles qui feraient buguer le mannequin.
    Cela ne devrait pas empécher le mannequin de bouger plutôt librement, même dans des positions
    non possible par un humain
    */

    if ((Math.abs(angleCuisses) + Math.abs(angleTorse) > 180) &&
    ((angleCuisses > 0 && angleTorse < 0) || (angleCuisses < 0 && angleTorse > 0))) {

      angleCuisses += (angleTorse-(angleCuisses-180))%360
    }

    if ((Math.abs(angleJambes) + Math.abs(angleCuisses) > 180) &&
    ((angleJambes > 0 && angleCuisses < 0) || (angleJambes < 0 && angleCuisses > 0))) {

      angleJambes += (angleCuisses-(angleJambes-180))%360
    }

    var CORPS = angleTorse
    var CUISSE = -(angleCuisses-angleTorse)
    var TIBIA = angleJambes-angleCuisses

    if (Math.abs(angleJambes) >= 80) {
      var PIED = 0  
    }
    else {  
      var PIED = -(CORPS - CUISSE + TIBIA)
    }


    return {"version":7,"data":[[0,3.8,0],[CORPS,-90,0],[0,0,-2],[0,0,5],[6,0,CUISSE],[TIBIA],[-6,-6,PIED],[-6,0,CUISSE],
            [TIBIA],[6,6,PIED],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],
            [0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],
            [0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}
            
}