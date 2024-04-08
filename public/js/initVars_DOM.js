var angleTorse = 0, angleJambes = 0, angleGenoux = 0
rangeTorse.value = 50; rangeJambes.value = 50; rangeGenoux.value = 50
var numeroCapteurTorse = -1, numeroCapteurCuisses = -1, numeroCapteurTibias = -1
var bool_3capteurs = false, boolVisibilite_leftPanel = false


// définition des variables correspondant aux boutons et toggle (IHM)
toggle_leftPanel = document.getElementById("toggle_leftPanel")
commandPanel = document.getElementById("commandPanel")

toggle_orbitsControls = document.getElementById("toggle_orbitsControls")
toggle_redPoints = document.getElementById("toggle_redPoints")

bouton_alerteText = document.getElementById('spanTempsDeclenchement')
toggle_alerteAssis = document.getElementById("toggle_alerteAssis")

bouton_choixNumerosDevices = document.getElementById('choixNumerosDevices')
boutonAff_numDevices = document.getElementById('numbersDevices')
bouton_reload = document.getElementById('reload')

rangeTorse = document.getElementById('rangeTorse')
rangeJambes = document.getElementById('rangeJambes')
rangeGenoux = document.getElementById('rangeGenoux')

bouton_debout = document.getElementById("debout")
bouton_assis = document.getElementById("assis")
bouton_allonge = document.getElementById("allonge")

bouton_alerte = document.getElementById("alerte")
compteur = document.getElementById("compteur")
compteurAlerte = document.querySelector("#compteur div")
compteurVariable = document.querySelector("#compteur span")

// EventListeners
toggle_leftPanel.addEventListener("click", () => {boolVisibilite_leftPanel = !boolVisibilite_leftPanel})
bouton_alerte.addEventListener("click", setTimeBeforeAlert)
bouton_reload.addEventListener("click", reload)
bouton_choixNumerosDevices.addEventListener("click", choixNumerosCapteurs)