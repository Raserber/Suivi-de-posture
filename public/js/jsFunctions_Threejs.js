function positionY_pointBas() {

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

function changementPositionY() {
    
    // relevage de la position y du mannequin si proche du sol
    man.position.y += (-29.5 - positionY_pointBas());
}

function changementPositionRedPoints() {

    // affichage des points rouges PIEDS
    lfeet1.position.copy(man.l_ankle.point(6, 2, 0));
    lfeet2.position.copy(man.l_ankle.point(-2, 2.5, 0));
    lfeet3.position.copy(man.l_ankle.point(2, 2.5, 2));
    lfeet4.position.copy(man.l_ankle.point(2, 2.5, -2));
    lfeet5.position.copy(man.l_ankle.point(1.35, -0.35, 0));
    lfeet6.position.copy(man.l_ankle.point(-1.35, -0.35, 0));
    rfeet1.position.copy(man.r_ankle.point(6, 2, 0));
    rfeet2.position.copy(man.r_ankle.point(-2, 2.5, 0));
    rfeet3.position.copy(man.r_ankle.point(2, 2.5, 2));
    rfeet4.position.copy(man.r_ankle.point(2, 2.5, -2));
    rfeet5.position.copy(man.r_ankle.point(1.35, -0.35, 0));
    rfeet6.position.copy(man.r_ankle.point(-1.35, -0.35, 0));

    // affichage des points rouges JAMBES
    lleg1.position.copy(man.l_leg.point(2.75, -5, 0));
    lleg2.position.copy(man.l_leg.point(-2.75, -5, 0));
    rleg1.position.copy(man.r_leg.point(2.75, -5, 0));
    rleg2.position.copy(man.r_leg.point(-2.75, -5, 0));

    // affichage des points rouges TORSE
    torso1.position.copy(man.torso.point(3.2, 11.3, 0));
    torso2.position.copy(man.torso.point(-3.5, 13, 0));

    // affichage des points rouges PELVIEN
    pelvis1.position.copy(man.pelvis.point(-5, -0.5, 0));
    pelvis2.position.copy(man.pelvis.point(-1.5, -4, 0));

    // affichage des points rouges TETE
    head1.position.copy(man.head.point(0, 7, 0));
    head2.position.copy(man.head.point(3, 1.75, 0));
    head3.position.copy(man.head.point(-3.5, 4, 0));

    // affichages des points noires MAINS
    lfinger1.position.copy(man.l_wrist.point(1, 5, 0));
    rfinger1.position.copy(man.r_wrist.point(1, 5, 0));

    // affichages des points noires MAINS
    genoux1.position.copy(man.l_knee.point(1.25, 0, 0));
    genoux2.position.copy(man.r_knee.point(1.25, 0, 0));
    genoux3.position.copy(man.l_knee.point(-1.25, 0, 0));
    genoux4.position.copy(man.r_knee.point(-1.25, 0, 0));

    // affichages des points noires MAINS
    coude1.position.copy(man.l_elbow.point(1, 0, 0));
    coude2.position.copy(man.r_elbow.point(1, 0, 0));
}

// boucle descendant les bras si loin du sol
function changementPositionBras() {
    
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
