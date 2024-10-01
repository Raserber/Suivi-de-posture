function customPosture (angleTorse, angleCuisses, angleJambes) {

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

function changementPositionBras(man) {
    
  if (man.l_wrist.point(1, 5, 0).y+29.5 <= 0 || man.l_wrist.point(1, 2, -1.5).y+29.5 <= 0) {
      while (man.l_wrist.point(1, 5, 0).y+29.5 <= 0 || man.l_wrist.point(1, 2, -1.5).y+29.5 <= 0) {
          man.l_arm.raise   += 0.005
          man.r_arm.raise   += 0.005
          man.l_elbow.bend  += man.l_elbow.bend >= 90 ? 0 : 0.01
          man.r_elbow.bend  += man.r_elbow.bend >= 90 ? 0 : 0.01
  
      }
  }
  
  // boucle descendant les bras si loin du sol
  else {
      
      if (man.l_arm.raise > 0) {
          man.l_arm.raise   -= 0.3 + man.l_arm.raise * 0.005
          man.r_arm.raise   -= 0.3 + man.r_arm.raise * 0.005
      }
  
      else if (man.l_elbow.bend > 15) {
          
          man.l_elbow.bend  -= 0.6 + man.l_elbow.bend * 0.02
          man.r_elbow.bend  -= 0.6 + man.r_elbow.bend * 0.02
      }
  }
}

function positionY_pointBas(man) {

  // controle du point le plus bas
  return Math.min(

      // pied gauche
      man.l_ankle.point(6, 2, 0).y,
      man.l_ankle.point(-2, 2.5, 0).y,
      man.l_ankle.point(2, 2.5, 2).y,
      man.l_ankle.point(2, 2.5, -2).y,
      man.l_ankle.point(1.35, -0.35, 0).y,
      man.l_ankle.point(-1.35, -0.35, 0).y,

      // pied droit
      man.r_ankle.point(6, 2, 0).y,
      man.r_ankle.point(-2, 2.5, 0).y,
      man.r_ankle.point(2, 2.5, 2).y,
      man.r_ankle.point(2, 2.5, -2).y,
      man.r_ankle.point(1.35, -0.35, 0).y,
      man.r_ankle.point(-1.35, -0.35, 0).y,

      // jambes gauche et droite
      man.l_leg.point(2.75, -5, 0).y,
      man.l_leg.point(-2.75, -5, 0).y,
      man.r_leg.point(2.75, -5, 0).y,
      man.r_leg.point(-2.75, -5, 0).y,

      // torse
      man.torso.point(-3.5, 13, 0).y,
      man.torso.point(3.2, 11.3, 0).y,

      // bassin
      man.pelvis.point(-5, -0.5, 0).y,
      man.pelvis.point(-1.5, -4, 0).y,

      // tête
      man.head.point(-3.5, 4, 0).y,
      man.head.point(3, 1.75, 0).y,
      man.head.point(0, 7, 0).y,

      // genoux
      man.l_knee.point(1.25, 0, 0).y,
      man.l_knee.point(-1.25, 0, 0).y,
      man.r_knee.point(1.25, 0, 0).y,
      man.r_knee.point(-1.25, 0, 0).y,
      
      // coudes
      man.l_elbow.point(1, 0, 0).y,
      man.r_elbow.point(1, 0, 0).y)
}

function changementPositionY(man) {
    
  console.log(positionY_pointBas(man))
  // relevage de la position y du mannequin si proche du sol
  man.position.y += (-29.5 - positionY_pointBas(man));
}

export {
  customPosture,
  changementPositionBras,
  positionY_pointBas
}