var angleTorse = 0, angleJambes = 0, angleGenoux = 0
rangeTorse.value = 50; rangeJambes.value = 50; rangeGenoux.value = 50

// définition des variables correspondant aux boutons et toggle
toggle_leftPanel = document.getElementById("toggle_leftPanel")
toggle_restrain = document.getElementById("toggle_restrain")
toggle_posture = document.getElementById("toggle_posture")
toggle_orbitsControls = document.getElementById("toggle_orbitsControls")
toggle_redPoints = document.getElementById("toggle_redPoints")
toggle_3capteurs = document.getElementById("toggle_3capteurs")
bouton_debout = document.getElementById("debout")
bouton_assis = document.getElementById("assis")
bouton_allonge = document.getElementById("allonge")
bouton_alerte = document.getElementById("alerte")
compteur = document.getElementById("compteur")
compteurVariable = document.querySelector("#compteur span")
compteurAlerte = document.querySelector("#compteur div")
leftPanel = document.getElementById("leftPanel")
commandPanel = document.getElementById("commandPanel")
labelRangeGenoux = document.getElementById("labelRangeGenoux")
rangeTorse = document.getElementById('rangeTorse')
rangeJambes = document.getElementById('rangeJambes')
rangeGenoux = document.getElementById('rangeGenoux')


// création de la scene Threejs
createScene();

scene.add(lfeet1, lfeet2, lfeet3, lfeet4, lfeet5, lfeet6, rfeet1, rfeet2, rfeet3, rfeet4, rfeet5, rfeet6, lleg1, lleg2, rleg1, rleg2, torso1, torso2, pelvis1, pelvis2, head1, head2, head3, lfinger1, rfinger1, genoux1, genoux2, genoux3, genoux4, coude1, coude2)

// creation d'un objet mannequin
man = new Male();

// permet à l'utilisateur de tourner la vue
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//défini l'orientation de la vue
scene.rotation.y = -1.3
scene.rotation.x = 0.3

// lance le setInterval (./js/jsFunctions.js:93)
setTimeInPosition()
// permet la modification de timeBeforeAlert (./js/jsFunctions.js:126)
bouton_alerte.addEventListener("click", setTimeBeforeAlert)

// fonction d'animation
function animate(t)
{
// changement de position animé
man.posture = Mannequin.blend(man.posture, posture(angleTorse, angleJambes, angleGenoux), 0.03)
// man.posture = posture(angleTorse, angleJambes, angleGenoux)


toggle_leftPanel.checked ? leftPanel.style.visibility = "visible" : leftPanel.style.visibility = "hidden"
toggle_leftPanel.checked ? commandPanel.style.visibility = "visible" : commandPanel.style.visibility = "hidden"
// changements liés aux boutons et toggles
changementEtatBoutons(angleTorse, angleJambes)        // ./js/jsFunctions.js:45
toggleRedPoints(toggle_redPoints.checked)             // ./js/initVisualPoints.js:51
toggleOrbitsControls(toggle_orbitsControls.checked)   // ./js/jsFunctions.js:78

// boucle relevant les bras si proche du sol
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

// extraction de la hauteur du point le plus bas du mannequin (./js/bottomControlConfiguration.js)
var bottom = configBottom()

// relevage de la position y du mannequin si proche du sol
man.position.y += (-29.5 - bottom);

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

// début de connexion au serveur
const socket = new WebSocket("ws://192.168.1.30:1880/ws/angles/3_ED");

socket.onerror = (e) => {

// alert("Connexion au serveur perdu, veuillez recharger la page")
}

// traite les données qui arrivent
socket.addEventListener("message", (event) => {

// extrait la donnée de l'angle qui nous intéresse (./js/jsFunctions.js:02)
angleTorse = searchAndReturnEndDevice(event, 3).angleZ
angleJambes = searchAndReturnEndDevice(event, 4).angleZ

// si 2 capteurs demandés, alors angleG = angleJ
if (toggle_3capteurs.checked) {

    angleGenoux = searchAndReturnEndDevice(event, 5).angleZ
} 

else {

    angleGenoux = angleJambes
}

    // transfere la plage de valeurs possibles de +/- 360 à +/- 180 (./js/jsFunctions.js:83)
    angleTorse = rebaseAngle(angleTorse)
    angleJambes = rebaseAngle(angleJambes)
    angleGenoux = rebaseAngle(angleGenoux)

    rangeTorse.value = (angleTorse + 180)*100/360
    rangeJambes.value = (angleJambes + 180)*100/360
    rangeGenoux.value = (angleGenoux + 180)*100/360
});