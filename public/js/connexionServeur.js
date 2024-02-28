// début de connexion au serveur
var socket, socketClosed = false, showDeconnexionError = true
var socketURL = "ws://192.168.1.30:1880/ws/suiviPosture"
var messages = []
function connect() {

    socket = new WebSocket(socketURL);

    socket.onopen = function () {

        if (socketClosed) swal({
            title: "Connecté au serveur",
            text: "Connexion avec le serveur rétabli",
            icon: "success",
            timer: 1500
        })
    }
    socket.onclose = function(e) {
        socketClosed = true

        console.info("Astuce ! Si vous voulez changer l'url vers le quel pointe le socket changez la valeur de la variable 'socketURL'")

        if (numeroCapteurTorse != -1 && numeroCapteurCuisses != -1 && showDeconnexionError) {
            swal({
            title: "Serveur déconnecté: Tentative de reconnexion automatique",
            text: "Vérifiez la connexion entre le PC et le serveur ...",
            icon: "error",
            buttons: ["ne plus montrer", "OK"]
        }).then((state) => {

            showDeconnexionError = state | false
        })
        }

        setTimeout(function() {
          connect();
        }, 1000);
      };

    // traite les données qui arrivent
    socket.addEventListener("message", (event) => {
    // extrait la donnée de l'angle qui nous intéresse (./js/jsFunctions.js:02)
    angleTorse = searchAndReturnEndDevice(event, numeroCapteurTorse).angleZ == -1000 ? angleTorse : searchAndReturnEndDevice(event, numeroCapteurTorse).angleZ
    angleJambes = searchAndReturnEndDevice(event, numeroCapteurCuisses).angleZ == -1000 ? angleJambes : searchAndReturnEndDevice(event, numeroCapteurCuisses).angleZ

    // si 2 capteurs demandés, alors angleG = angleJ
    if (bool_3capteurs) {

        angleGenoux = searchAndReturnEndDevice(event, numeroCapteurTibias).angleZ == -1000 ? angleGenoux : searchAndReturnEndDevice(event, numeroCapteurTibias).angleZ
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
}
connect()