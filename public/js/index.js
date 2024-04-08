// ~/js/jsFunctions.js
setCompteur()
/* Permet d'afficher le compteur et de mettre à jour le compteur sur le panneau de droite
*/

// ~/js/jsFunctions.js
choixNumerosCapteurs()
/* Permet d'afficher la popup du choix des capteurs
*/

// fonction d'animation s'executant toutes les 15-20ms environ
function animate(t)
{

    // changement de position animé
    // fonction 'built-in'/native de la bibliothéque Mannequin.js
    man.posture = Mannequin.blend(man.posture, posture(angleTorse, angleJambes, angleTibias), 0.03)
    /* (Se référer à la documentation pour une explication plus précise)
    - man.posture est une variable en lecture et écriture permettant d'accéder à la
    position sous forme d'un objet contenant l'angles de tous les 'joints'/articulations du mannequin.
    Cette position peut tout aussi bien être lu que écrit. Ici elle est écrite par une fonction native de Mannequinjs
    - 'Mannequin.blend' (parametres: posture1, posture2, coef) : cette fonction permet d'utiliser une
    'interpolation linéaire des angles d'Euler' qui, pour simplifier, permet de mixer 2 postures selon un coefficient,
    plus le coef est proche de 0 plus la posture mixé qu'est renvoyé par la fonction ressemble à la posture1,
    plus le coef est proche de 1 plus la posture mié qu'est renvoyé ressemble à la posture2
    - Ici la fonction 'posture' est une fonction dans jsFunctions.js permettant d'éditer une position sous le format
    'posture' accepté par man.posture/Mannequin.blend depuis les angles reçus par les ED

    Ce que fait cette ligne : elle change la posture actuelle du mannequin vers la nouvelle position des capteurs selon un coefficient
    0.03, ce qui permet de faire une transition entre une position A à une position B en 500ms
    (la fonction d'animation s'execute environ toute les 15ms, (1/0.03)*15=500)
    */


    // permet de définir sur le panneau de 'contrôle', paneau de gauche doit être visible en
    // fonction que le bouton pour le montrer est appuyé ou non
    boolVisibilite_leftPanel ? leftPanel.style.visibility = "visible" : leftPanel.style.visibility = "hidden"
    boolVisibilite_leftPanel ? commandPanel.style.visibility = "visible" : commandPanel.style.visibility = "hidden"

    // changements liés aux boutons et toggles
    // ce sotn les fonctions d'IHM du programme en quelque sorte
    changementEtatBoutons(angleTorse, angleJambes)        // ./js/jsFunctions.js:45
    toggleRedPoints(toggle_redPoints.checked)             // ./js/initVisualPoints.js:51
    toggleOrbitsControls(toggle_orbitsControls.checked)   // ./js/jsFunctions.js:78

    // ~/js/jsFunctions_Threejs.js
    changementPositionBras()
    /* La fonction changementPositionBras sert à ce que les bras est un mouvement fluide
    en cas de collision avec le sol (d'abord plier avant-bras, bloqué avant bras, plié
        bras complet ...)
    */

    // ~/js/jsFunctions_Threejs.js
    changementPositionY()
    /* Il n'y a pas de système de "gravité" 'built-in'/fait de manière natif dans la librarire Mannequin.js.
    C'est à ça que sert la fonction changementPositionY, il prend la position de différents points (visualisable
        via les 'redpoints')
    et va définir la position en Y (hauteur) du mannequin pour que le point étant le plus bas dans le réfentiel de
    la scène touche le sol, ce qui fait un effet de gravité lorsque le mannequin est en mouvement
    */
    
    
   // ~/js/jsFunctions_Threejs.js
   changementPositionRedPoints()
   /* La visualition de la position des points de collision (permettant de faire un effet de "gravité")
   est défini de manière absolue dans l'espace 3D et non par le référentiel du mannequin
   cette fonction sert à changer leur position en continu par rapport aux nouvelles positions
   du mannequin
   */
}