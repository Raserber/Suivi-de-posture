// lance le setInterval (./js/jsFunctions.js:93)
setCompteur()

// permet la modification de timeBeforeAlert (./js/jsFunctions.js:126)
choixNumerosCapteurs()

// fonction d'animation
function animate(t)
{
    // changement de position animé
    man.posture = Mannequin.blend(man.posture, posture(angleTorse, angleJambes, angleGenoux), 0.03)


    boolVisibilite_leftPanel ? leftPanel.style.visibility = "visible" : leftPanel.style.visibility = "hidden"
    boolVisibilite_leftPanel ? commandPanel.style.visibility = "visible" : commandPanel.style.visibility = "hidden"

    // changements liés aux boutons et toggles
    changementEtatBoutons(angleTorse, angleJambes)        // ./js/jsFunctions.js:45
    toggleRedPoints(toggle_redPoints.checked)             // ./js/initVisualPoints.js:51
    toggleOrbitsControls(toggle_orbitsControls.checked)   // ./js/jsFunctions.js:78

    // boucle relevant les bras si proche du sol
    changementPositionBras()

    changementPositionY()

    changementPositionRedPoints()
}