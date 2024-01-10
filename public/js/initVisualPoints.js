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

// coudes
coude1 = new THREE.Mesh(geometry, material);
coude2 = new THREE.Mesh(geometry, material);


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
    coude1.visible = redPointsVisibility
    coude2.visible = redPointsVisibility
}