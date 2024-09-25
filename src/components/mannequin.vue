<template>
</template>
  
<script>
  import { Male, createStage } from '../mannequinJS/mannequin';


  export default {
    name: "mannequin",

    mounted() {
      
      createStage()

      var mannequin = new Male;
      
      mannequin.stepOnGround()
    }
  }
</script>