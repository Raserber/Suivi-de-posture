var angleTorse = 0, angleCuisses = 0, angleJambes = 0
rangeTorse.value = 50; rangeCuisses.value = 50; rangeJambes.value = 50
var numeroCapteurTorse = -1, numeroCapteurCuisses = -1, numeroCapteurJambes = -1
var bool_3capteurs = false, boolVisibilite_leftPanel = false


// définition des variables correspondant aux boutons et toggle (IHM)
commandPanel = document.getElementById("commandPanel")

toggle_orbitsControls = document.getElementById("toggle_orbitsControls")
toggle_redPoints = document.getElementById("toggle_redPoints")

bouton_alerteText = document.getElementById('spanTempsDeclenchement')
toggle_alerteAssis = document.getElementById("toggle_alerteAssis")

bouton_choixNumerosDevices = document.getElementById('choixNumerosDevices')
boutonAff_numDevices = document.getElementById('numbersDevices')

rangeTorse = document.getElementById('rangeTorse')
rangeCuisses = document.getElementById('rangeCuisses')
rangeJambes = document.getElementById('rangeJambes')

bouton_debout = document.getElementById("debout")
bouton_assis = document.getElementById("assis")
bouton_allonge = document.getElementById("allonge")

compteur = document.getElementById("compteur")
compteurAlerte = document.querySelector("#compteur div")
compteurVariable = document.querySelector("#compteur span")