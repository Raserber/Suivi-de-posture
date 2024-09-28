<template>
   <div id="menuBouton" @click="affichageMenu = !affichageMenu"><img src="../icon/icon.png" /></div>

   <div v-if="affichageMenu">
     heho
   </div>
</template>
  
<script>

  export default {

    name: "parametres",
    
    data: () => ({

      affichageMenu : false
    }),
  }
</script>

<style lang="scss" scoped>

  #menuBouton {

    position: absolute;

    width: 60px;
    height: 40px;

    left: 0;

    margin: 0.3em;
    padding: 0.3em;

    border-radius: 1em;
    border: solid 1px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 0 1em rgba(0, 0, 0, 0.1);
      

    img {

        position: relative;
        left: 50%;

        translate: -50%;
        
        height: 100%
    }
  }
</style>