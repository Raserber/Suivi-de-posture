geometry = new THREE.SphereGeometry(0.5);
material = new THREE.MeshBasicMaterial({color: 'crimson'});
material2 = new THREE.MeshBasicMaterial({color: 'black'});

lfeet1 = new THREE.Mesh(geometry, material);
lfeet2 = new THREE.Mesh(geometry, material);
lfeet3 = new THREE.Mesh(geometry, material);
lfeet4 = new THREE.Mesh(geometry, material);
rfeet1 = new THREE.Mesh(geometry, material);
rfeet2 = new THREE.Mesh(geometry, material);
rfeet3 = new THREE.Mesh(geometry, material);
rfeet4 = new THREE.Mesh(geometry, material);

lleg1 = new THREE.Mesh(geometry, material);
lleg2 = new THREE.Mesh(geometry, material);
rleg1 = new THREE.Mesh(geometry, material);
rleg2 = new THREE.Mesh(geometry, material);

torso1 = new THREE.Mesh(geometry, material);
torso2 = new THREE.Mesh(geometry, material);
pelvis1 = new THREE.Mesh(geometry, material);
head1 = new THREE.Mesh(geometry, material);
head2 = new THREE.Mesh(geometry, material);
head3 = new THREE.Mesh(geometry, material);

lfinger = new THREE.Mesh(geometry, material2);
rfinger = new THREE.Mesh(geometry, material2);