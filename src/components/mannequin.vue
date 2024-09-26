<template>
</template>

<script>
  import { Male, createStage } from '../mannequinJS/mannequin';

  export default {
    name: "mannequin",

    mounted() {
      createStage()

      // getStage().scene.rotateX(0.3)
      // getStage().scene.rotateY(-1.5)
      // getStage().scene.translateY(-0.25)
      
      var mannequin = new Male
    },
  }
</script>