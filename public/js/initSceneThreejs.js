// création de la scene Threejs
createScene();

// ajout des composants défini dans iniVisualsPoints.js qui correspondent aux points rouges
scene.add(lfeet1, lfeet2, lfeet3, lfeet4, lfeet5, lfeet6, rfeet1, rfeet2, rfeet3, rfeet4, rfeet5, rfeet6, lleg1, lleg2, rleg1, rleg2, torso1, torso2, pelvis1, pelvis2, head1, head2, head3, lfinger1, rfinger1, genoux1, genoux2, genoux3, genoux4, coude1, coude2)

// creation d'un objet mannequin
man = new Male();

// permet à l'utilisateur de tourner la vue
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//défini l'orientation initiale de la vue
scene.rotation.y = -1.5
scene.rotation.x = 0.3