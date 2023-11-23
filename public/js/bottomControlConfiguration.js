function configBottom() {

    // controle du point le plus bas
    return Math.min(

        // pied gauche
        man.l_ankle.point(6, 2, 0).y,
        man.l_ankle.point(-2, 2.5, 0).y,
        man.l_ankle.point(2, 2.5, 2).y,
        man.l_ankle.point(2, 2.5, -2).y,
        man.l_ankle.point(1.35, -0.35, 0).y,

        // pied droit
        man.r_ankle.point(6, 2, 0).y,
        man.r_ankle.point(-2, 2.5, 0).y,
        man.r_ankle.point(2, 2.5, 2).y,
        man.r_ankle.point(2, 2.5, -2).y,
        man.r_ankle.point(1.35, -0.35, 0).y,

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
        man.r_knee.point(-1.25, 0, 0).y)
}