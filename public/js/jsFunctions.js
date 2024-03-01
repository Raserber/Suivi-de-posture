// fonction prenant en paramêtre le numero de End Device pour effectuer un filtre sur devEUI et renvoyer les données voulues
function searchAndReturnEndDevice(receiveArray, deviceNumber) {

  receiveArray = JSON.parse(receiveArray.data)

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
function posture(angleTorse, angleJambes, angleGenoux) {

  CORPS = angleTorse
  JAMBE = -(angleJambes-angleTorse)
  GENOU = angleGenoux-angleJambes

  if (Math.abs(angleGenoux) >= 80) {
    PIED = 0  
  }
  else {  
    PIED = -(CORPS - JAMBE + GENOU)
  }


  return {"version":7,"data":[[0,3.8,0],[CORPS,-90,0],[0,0,-2],[0,0,5],[6,0,JAMBE],[GENOU],[-6,-6,PIED],[-6,0,JAMBE],[GENOU],[6,6,PIED],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}
         
}

// fonction utilisée dans la fonction changementEtatBoutons (fonction suivante)
function changementEtatAssise(angleTorse, angleJambes) {

  if (Math.abs(angleJambes) <= 50) {
    return 0
  }

  else if (Math.abs(angleTorse) <= 45 && -angleJambes >= 45) {
    return 1
  }

  else {
    return 2
  }
}

// fonction attribuant au bon bouton l'état "actif" en fonction de la position de la personne
function changementEtatBoutons (angleTorse, angleJambes) {
bouton_debout.classList.remove("buttonActivate"); bouton_assis.classList.remove("buttonActivate"); bouton_allonge.classList.remove("buttonActivate")
switch (changementEtatAssise(angleTorse, angleJambes)) {

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
  
    const posActuelle = changementEtatAssise(angleTorse, angleJambes) // position actuelle

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

    swal("Nombre de secondes avant alerte", {
      content: {
          element: "input",
          attributes: {
          placeholder: "10, 20, 30 ...",
          },
      },
      }).then ((value) => {

        if (parseInt(value) <= 0 || !parseInt(value)) {

          setTimeBeforeAlert()
        }

        else {

          tempsAvantAlerte = parseInt(value)
          spanTempsDeclenchement.innerText = tempsAvantAlerte
        }
      })
}

// met la scene et les toggle en position intiale
function reload() {

  location.reload()
}


function choixNumerosCapteurs() {

  swal("Le mannequin est équipé de combien de capteurs ?", {
    buttons: ["3 capteurs", "2 capteurs"],
  }).then(value => {

    bool_3capteurs = value ? false : true // true si 3 capteurs, false si 2 capteurs 
  
    swal("Numéro du device de torse", {
      content: {
        element: "input",
        attributes: {
          placeholder: "1, 2, 3 ...",
        },
      },
    }).then ((value) => {
  
      numeroCapteurTorse = value
  
      swal("Numéro du device de cuisses", {
          content: {
              element: "input",
              attributes: {
              placeholder: "1, 2, 3 ...",
              },
          },
          }).then ((value) => {
  
            numeroCapteurCuisses = value
  
            if (bool_3capteurs) {
  
              swal("Numéro du device de tibias", {
                  content: {
                      element: "input",
                      attributes: {
                      placeholder: "1, 2, 3 ...",
                      },
                  },
                  }).then ((value) => {
  
                    numeroCapteurTibias = value
        
                    swal({
                      title: "Données pris en compte",
                      text: `Vous pouvez changer les valeurs rentrées (${numeroCapteurTorse}, ${numeroCapteurCuisses}, ${numeroCapteurTibias}) dans le menu de gauche`,
                      icon: "success",
                      timer: 2575
                    })
                    boutonAff_numDevices.innerText = `${numeroCapteurTorse}, ${numeroCapteurCuisses}, ${numeroCapteurTibias}`
                    boolVisibilite_leftPanel = false
                  });
          }
            }).then(value => {
  
              if (!bool_3capteurs) {

                swal({
                  title: "Données pris en compte",
                  text: `Vous pouvez changer les valeurs rentrées (${numeroCapteurTorse}, ${numeroCapteurCuisses}) dans le menu de gauche`,
                  icon: "success",
                  timer: 2575
              })

              boutonAff_numDevices.innerText = `${numeroCapteurTorse}, ${numeroCapteurCuisses}, ${numeroCapteurTibias}`
              boolVisibilite_leftPanel = false
              }
            })
    })
  });
}