// fonction prenant en paramêtre le numero de End Device pour effectuer un filtre sur devEUI et renvoyer les données voulues
function searchAndReturnEndDevice(receiveArray, deviceNumber) {

    if (receiveArray.deviceName === "eid430_" + deviceNumber) {

      // Valeurs de receiveArray.data sont les composantes du vecteur gravité 'unitaire' (1.57 len)
      // utilisation de l'angle Y et Z pour calculer l'angleX
      var angleX = Math.atan2(-receiveArray.data.angleZ, receiveArray.data.angleY) - Math.PI/2
      angleX = (angleX < 0 ? 2*Math.PI + angleX : angleX) * 180/Math.PI

      // Valeurs de receiveArray.data sont les composantes du vecteur gravité 'unitaire' (1.57 len)
      // utilisation de l'angle X et Z pour calculer l'angle Y
      var angleY = Math.atan2(receiveArray.data.angleX, -receiveArray.data.angleZ) - Math.PI/2
      angleY = (angleY < 0 ? 2*Math.PI + angleY : angleY) * 180/Math.PI

      // Valeurs de receiveArray.data sont les composantes du vecteur gravité 'unitaire' (1.57 len)
      // utilisation de l'angle X et Y pour calculer l'angleZ
      var angleZ = Math.atan2(receiveArray.data.angleX, receiveArray.data.angleY) - Math.PI/2
      angleZ = (angleZ < 0 ? 2*Math.PI + angleZ : angleZ) * 180/Math.PI

      return {
        angleX : angleX,
        angleY : angleY,
        angleZ : angleZ
      };
 }

 return {
  angleX : -1000,
  angleY : -1000,
  angleZ : -1000
 }
}

// fonction créant un objet javascript "posture" (voir documentation) necessaire à des transitions 'smooth'
function posture(angleTorse, angleCuisses, angleJambes) {

  /* Les 2 prochains if servent à empécher certains angles qui feraient buguer le mmanequin.
  Cela ne devrait pas empécher le mannequin de bouger plutôt librement, même dans des positions
  non possible par un humain
  */

  if ((Math.abs(angleCuisses) + Math.abs(angleTorse) > 180) &&
  ((angleCuisses > 0 && angleTorse < 0) || (angleCuisses < 0 && angleTorse > 0))) {

    angleCuisses += (angleTorse-(angleCuisses-180))%360
  }

  if ((Math.abs(angleJambes) + Math.abs(angleCuisses) > 180) &&
  ((angleJambes > 0 && angleCuisses < 0) || (angleJambes < 0 && angleCuisses > 0))) {

    angleJambes += (angleCuisses-(angleJambes-180))%360
  }

  CORPS = angleTorse
  CUISSE = -(angleCuisses-angleTorse)
  TIBIA = angleJambes-angleCuisses

  if (Math.abs(angleJambes) >= 80) {
    PIED = 0  
  }
  else {  
    PIED = -(CORPS - CUISSE + TIBIA)
  }


  return {"version":7,"data":[[0,3.8,0],[CORPS,-90,0],[0,0,-2],[0,0,5],[6,0,CUISSE],[TIBIA],[-6,-6,PIED],[-6,0,CUISSE],[TIBIA],[6,6,PIED],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}
         
}

// fonction utilisée dans la fonction changementEtatBoutons (fonction suivante)
function changementEtatAssise(angleTorse, angleCuisses) {

  if (Math.abs(angleCuisses) <= 50) {
    return 0
  }

  else if (Math.abs(angleTorse) <= 45 && -angleCuisses >= 45) {
    return 1
  }

  else {
    return 2
  }
}

// fonction attribuant au bon bouton l'état "actif" en fonction de la position de la personne
function changementEtatBoutons (angleTorse, angleCuisses) {
bouton_debout.classList.remove("buttonActivate"); bouton_assis.classList.remove("buttonActivate"); bouton_allonge.classList.remove("buttonActivate")
switch (changementEtatAssise(angleTorse, angleCuisses)) {

   case 0 :
      bouton_debout.classList.add("buttonActivate")
      break;
   case 1 :
      bouton_assis.classList.add("buttonActivate")
      break;
   case 2 :
      bouton_allonge.classList.add("buttonActivate")
      break;
}
}

// fonction ramenant une valeur comprise entre +/- 360 à +/- 180
// necessaire car le Mannequin.blend() (../index.html:84)
// nécessite des valeurs comprises entre -180 et +180 sinon
// il tournera sur lui même n'atteignant jamais la valeur cherchée
function rebaseAngle(angle) {

  return Math.abs(angle) >= 180 ? angle <= 0 ? angle + 360 : angle - 360 : angle
}


previousPosition = -1 // état n-1 de 'posActuelle'
tempsAvantAlerte = 10 // temps défini en dur pouvant être redéfini par l'utilisateur

// fonction lançant un setInterval de 1000ms changeant la valeur de la variable de comptage
function setCompteur() {
  setInterval(() => {
    time = parseInt(compteurVariable.innerText) // valeur actuelle de comptage
  
    const posActuelle = changementEtatAssise(angleTorse, angleCuisses) // position actuelle

    if (previousPosition != posActuelle) {
  
      compteurVariable.innerText = time = 0
  
      previousPosition = posActuelle
    }
  
    else if ((toggle_alerteAssis.checked && posActuelle == 1) || posActuelle == 2) {
  
      compteurVariable.innerText = time = time + 1
    }

    if (time < tempsAvantAlerte) {

      //change la couleur de sombre à rouge en fonction de tempsAvantAlerte
      compteur.style.color = `rgb(${time*(255/(tempsAvantAlerte + 1))}, 25, 25)`
      compteurAlerte.innerText = null // n'affiche pas le paneau attention
    }

    else {

      compteurAlerte.innerText = "⚠"
    }
  }, 1000)
}

// fonction affichant une boite de dialogue pour parametrer le temps avant alerte
function setTimeBeforeAlert() {

    Swal.fire({
      title: "Nombre de secondes avant alerte",
      input: "text",
      inputPlaceholder: "10, 20, 30 ...",
      inputValidator: (value) => {
        if (parseInt(value) <= 0 || !parseInt(value)) {

          return "vous devez sélectionner un temps positif"
        }

        else {
          tempsAvantAlerte = parseInt(value)
          spanTempsDeclenchement.innerText = tempsAvantAlerte
        }
      }
    })
}


function choixNumerosCapteurs() {

  Swal.fire({
    title: "Combien de capteurs sont équipés",
    showDenyButton: true,
    confirmButtonText: "2 capteurs",
    denyButtonText: "3 capteurs",
    icon: "question",
    allowOutsideClick: false
  }).then(result => {

    bool_3capteurs = !result.isConfirmed // true si 3 capteurs, false si 2 capteurs 

    if (result.isConfirmed) {
      steps = [1, 2]
    }
    else {
      steps = [1, 2, 3]
    }
    
    dataValidator = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E" ]

    const Queue = Swal.mixin({
      progressSteps: steps,
      confirmButtonText: 'Next ➥',
      // optional classes to avoid backdrop blinking between steps
      showClass: { backdrop: 'swal2-noanimation' },
      hideClass: { backdrop: 'swal2-noanimation' },
      input: "text",
      inputPlaceholder: "1, 2, 3 ...",
      allowOutsideClick: false,
      inputValidator: (data) => {

        if (!dataValidator.includes(data.toUpperCase())) {
          return "Veuillez donner un chiffre entre 1 et 9, ou une lettre en A et E"
        }
      }
    })
    
    ;(async () => {
      const {value: torse} = await Queue.fire({
        title: 'Numéro du capteur du torse',
        currentProgressStep: 0,
      })
      numeroCapteurTorse = torse

      var {value: cuisses} = await Queue.fire({
        title: 'Numéro du capteur de la cuisse',
        currentProgressStep: 1,
      })
      numeroCapteurCuisses = cuisses

      if (!result.isConfirmed) {
        const {value: jambes} = await Queue.fire({
          title: 'Numéro du capteur du tibia',
          currentProgressStep: 2,
          confirmButtonText: 'Ok',
        })
        numeroCapteurJambes = jambes
        window.electronAPI.returnChoosenEndDevices([numeroCapteurTorse, numeroCapteurCuisses, numeroCapteurJambes])
      }
      
      else {
        window.electronAPI.returnChoosenEndDevices([numeroCapteurTorse, numeroCapteurCuisses])
      }

      await Swal.fire({
        title: "Données prise en compte",
        text: `Vous pouvez changer les valeurs rentrées (${numeroCapteurTorse}, ${numeroCapteurCuisses}${bool_3capteurs ? ", "+numeroCapteurJambes : ""}) dans le menu de gauche`,
        icon: "success",
        timer: 3500
      })

      boutonAff_numDevices.innerText = `${numeroCapteurTorse}, ${numeroCapteurCuisses}${bool_3capteurs ? ", "+numeroCapteurJambes : ""}`
      boolVisibilite_leftPanel = false
    })()
  })
}