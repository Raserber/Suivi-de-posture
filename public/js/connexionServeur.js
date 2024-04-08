// début de connexion au serveur via des websocket
var socket, socketClosed = false, showDeconnexionError = true
var socketURL = "ws://192.168.1.30:1880/ws/suiviPosture"
var messages = []

// fonction qui sera utilisé en cas de problemes de connexion avec le serveur
// elle sert à donner plus d'information dans la popup que simplement
// "probleme de connexion" (comme probleme de connexion ethernet, probleme allumage/cablage serveur ...)
async function diagnosticDeconnexion() {

    var status;

    const controller = new AbortController()
    const signal = controller.signal
    var timeoutBaie = setTimeout(() => { controller.abort("null") }, 100)
    var timeoutNS = setTimeout(() => { controller.abort("null") }, 200)   
    var timeoutAS = setTimeout(() => { controller.abort("null") }, 300)


    // test ('ping') de connexion au routeur
    await fetch("http://192.168.1.3/", { signal })
    .then(response => {clearTimeout(timeoutBaie)})
    .catch(err => { status = "baieDeconnectee" })
    if (status) return status;
    
    // test ('ping') de connexion au Network Server à l'adresse 192.168.1.20
    await fetch("http://192.168.1.20:8080/icon.png", { signal })
    .then(() => { clearTimeout(timeoutNS) })
    .catch(() => { status = "networkServerDeconnecte" })
    if (status) return status;

    // test ('ping') de connexion à l'Application Server
    await fetch("http://192.168.1.30:1880/favicon.ico", { signal })
        .then(() => { clearTimeout(timeoutAS); status = "bonneConnexion" })
        .catch(() => { status = "applicationServerDeconnecte" })
    if (status) return status;
}


// fonction lancant la connexion websocket, traitant les erreurs et mettant en forme les angles reçus
function connect() {

    socket = new WebSocket(socketURL);

    socket.onopen = function () {

        if (socketClosed) Swal.fire({
            title: "Connecté au serveur",
            text: "Connexion avec le serveur rétabli",
            icon: "success",
            timer: 1500
        })
    }
    socket.onclose = function(e) {
        socketClosed = true

        var titleAlert, textAlert;
        diagnosticDeconnexion().then(diagnostic => {
            
            // empeche le message d'erreur de s'afficher tant que le choix des capteurs n'a pas été réalisé
            if (numeroCapteurTorse != -1 && numeroCapteurCuisses != -1 && showDeconnexionError) {

                switch (diagnostic) {
    
                    case "baieDeconnectee" :
                        titleAlert = "Problème de connexion entre la baie et l'ordinateur"
                        textAlert = "Vérifiez le câble ethernet entre l'ordinateur et la baie informatique"
                        break;
                    case "networkServerDeconnecte" : 
                        titleAlert = "Network Server hors ligne"
                        textAlert = "Vérifiez que le Network Server est allumé, essayez de déconnecter et reconnecter le câble ethernet du NS, de l'allumer et l'éteindre"
                        break;
                    case "applicationServerDeconnecte" :
                        titleAlert = "Application Server hors ligne"
                        textAlert = "Vérifiez que l'Application Server est allumé, essayez de déconnecter et reconnecter le câble ethernet de l'AS, de l'allumer et l'éteindre"
                        break;
                    case "bonneConnexion" :
                        titleAlert = "Problème de programmation Application Server"
                        textAlert = "Nous n'arrivons pas à trouver l'accès aux données sur l'application server. Cela peut s'expliquer par un problème de programmation, veuillez contacter un technicien"
                        break;
                    default : 
                        titleAlert = "Problème de connexion"
                        textAlert = "Tentative de résolution automatique ... Si le problème persite, demander conseil."
                }
    
                Swal.fire({
                title: titleAlert,
                text: textAlert,
                icon: "error",
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: "Ne plus montrer"
            }).then((result) => { showDeconnexionError = !result.isDismissed })
            }
    
            setTimeout(function() {
              connect();
            }, 1000);
        })
      };

    // traite les données qui arrivent
    socket.addEventListener("message", (event) => {
    // extrait la donnée de l'angle qui nous intéresse (./js/jsFunctions.js)
    angleTorse_temp = searchAndReturnEndDevice(event, numeroCapteurTorse).angleZ
    angleJambes_temp = searchAndReturnEndDevice(event, numeroCapteurCuisses).angleZ
    
    angleTorse = angleTorse_temp == -1000 ? angleTorse : angleTorse_temp
    angleJambes = angleJambes_temp == -1000 ? angleJambes : angleJambes_temp
    /* explication du -1000 :
        Si la fonction searchAndReturnEndDevice reçoit un message ne contenant pas le endDevice cherché, la fonction renvoit -1000
        permettant de ne pas changer la valeur de l'angle pour une valeur n'existant pas ce qui ferait crash une partie du programme
        (La gestion des erreurs étant peu fine par la suite)
    */


    // si 2 capteurs demandés, alors angleG = angleJ
    if (bool_3capteurs) {

        angleGenoux_temp = searchAndReturnEndDevice(event, numeroCapteurTibias).angleZ
        
        angleGenoux = angleGenoux_temp == -1000 ? angleGenoux : angleGenoux_temp
    } 

    else {

        angleGenoux = angleJambes
    }

        // transfere la plage de valeurs possibles de +/- 360 à +/- 180 (./js/jsFunctions.js:83)
        angleTorse = rebaseAngle(angleTorse)
        angleJambes = rebaseAngle(angleJambes)
        angleGenoux = rebaseAngle(angleGenoux)

        /* La bibliothéque MannequinJS utilise des angles entre +/- 180 alors que nous recevons des angles de +/-360 par le ED
        */

        rangeTorse.value = (angleTorse + 180)*100/360
        rangeJambes.value = (angleJambes + 180)*100/360
        rangeGenoux.value = (angleGenoux + 180)*100/360
    });
}
connect()