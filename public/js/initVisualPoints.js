// initialisation des parametres Threejs

geometry = new THREE.SphereGeometry(0.5);
material = new THREE.MeshBasicMaterial({color: 'crimson'});
material2 = new THREE.MeshBasicMaterial({color: 'black'});

// pieds
lfeet1 = new THREE.Mesh(geometry, material);
lfeet2 = new THREE.Mesh(geometry, material);
lfeet3 = new THREE.Mesh(geometry, material);
lfeet4 = new THREE.Mesh(geometry, material);
lfeet5 = new THREE.Mesh(geometry, material);
lfeet6 = new THREE.Mesh(geometry, material);
rfeet1 = new THREE.Mesh(geometry, material);
rfeet2 = new THREE.Mesh(geometry, material);
rfeet3 = new THREE.Mesh(geometry, material);
rfeet4 = new THREE.Mesh(geometry, material);
rfeet5 = new THREE.Mesh(geometry, material);
rfeet6 = new THREE.Mesh(geometry, material);

// jambes
lleg1 = new THREE.Mesh(geometry, material);
lleg2 = new THREE.Mesh(geometry, material);
rleg1 = new THREE.Mesh(geometry, material);
rleg2 = new THREE.Mesh(geometry, material);

// torse
torso1 = new THREE.Mesh(geometry, material);
torso2 = new THREE.Mesh(geometry, material);

// pelvien
pelvis1 = new THREE.Mesh(geometry, material);
pelvis2 = new THREE.Mesh(geometry, material);

// tete
head1 = new THREE.Mesh(geometry, material);
head2 = new THREE.Mesh(geometry, material);
head3 = new THREE.Mesh(geometry, material);

// mains
lfinger1 = new THREE.Mesh(geometry, material2);
rfinger1 = new THREE.Mesh(geometry, material2);

// genoux
genoux1 = new THREE.Mesh(geometry, material);
genoux2 = new THREE.Mesh(geometry, material);
genoux3 = new THREE.Mesh(geometry, material);
genoux4 = new THREE.Mesh(geometry, material);


function toggleRedPoints(redPointsVisibility) {

    lfeet1.visible = redPointsVisibility
    lfeet2.visible = redPointsVisibility
    lfeet3.visible = redPointsVisibility
    lfeet4.visible = redPointsVisibility
    lfeet5.visible = redPointsVisibility
    lfeet6.visible = redPointsVisibility
    rfeet1.visible = redPointsVisibility
    rfeet2.visible = redPointsVisibility
    rfeet3.visible = redPointsVisibility
    rfeet4.visible = redPointsVisibility
    rfeet5.visible = redPointsVisibility
    rfeet6.visible = redPointsVisibility
    lleg1.visible = redPointsVisibility
    lleg2.visible = redPointsVisibility
    rleg1.visible = redPointsVisibility
    rleg2.visible = redPointsVisibility
    torso1.visible = redPointsVisibility
    torso2.visible = redPointsVisibility
    pelvis1.visible = redPointsVisibility
    pelvis2.visible = redPointsVisibility
    head1.visible = redPointsVisibility
    head2.visible = redPointsVisibility
    head3.visible = redPointsVisibility
    lfinger1.visible = redPointsVisibility
    rfinger1.visible = redPointsVisibility
    genoux1.visible = redPointsVisibility
    genoux2.visible = redPointsVisibility
    genoux3.visible = redPointsVisibility
    genoux4.visible = redPointsVisibility
}

// ajout des points visuels à la scene Threejs (./js/initVisualPoints.js)
// scene.add(lfeet1, lfeet2, lfeet3, lfeet4, rfeet1, rfeet2, rfeet3, rfeet4, lleg1, lleg2, rleg1, rleg2, torso1, torso2, pelvis1, pelvis2, head1, head2, head3, lfinger1, rfinger1, genoux1, genoux2, genoux3, genoux4)
      

// affichage des points rouges PIEDS
// lfeet1.position.copy(man.l_ankle.point(6, 2, 0));
// lfeet2.position.copy(man.l_ankle.point(-2, 2.5, 0));
// lfeet3.position.copy(man.l_ankle.point(2, 2.5, 2));
// lfeet4.position.copy(man.l_ankle.point(2, 2.5, -2));
// rfeet1.position.copy(man.r_ankle.point(6, 2, 0));
// rfeet2.position.copy(man.r_ankle.point(-2, 2.5, 0));
// rfeet3.position.copy(man.r_ankle.point(2, 2.5, 2));
// rfeet4.position.copy(man.r_ankle.point(2, 2.5, -2));

// affichage des points rouges JAMBES
// lleg1.position.copy(man.l_leg.point(2.75, -5, 0));
// lleg2.position.copy(man.l_leg.point(-2.75, -5, 0));
// rleg1.position.copy(man.r_leg.point(2.75, -5, 0));
// rleg2.position.copy(man.r_leg.point(-2.75, -5, 0));

// affichage des points rouges TORSE
// torso1.position.copy(man.torso.point(3.2, 11.3, 0));
// torso2.position.copy(man.torso.point(-3.5, 13, 0));

// affichage des points rouges PELVIEN
// pelvis1.position.copy(man.pelvis.point(-5, -0.5, 0))
// pelvis2.position.copy(man.pelvis.point(-1.5, -4, 0))

// affichage des points rouges TETE
// head1.position.copy(man.head.point(0, 7, 0))
// head2.position.copy(man.head.point(3, 1.75, 0))
// head3.position.copy(man.head.point(-3.5, 4, 0))

// affichages des points noires MAINS
// lfinger1.position.copy(man.l_wrist.point(1, 5, 0))
// rfinger1.position.copy(man.r_wrist.point(1, 5, 0))