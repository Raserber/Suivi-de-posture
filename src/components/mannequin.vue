<script>
  import { Male, createStage, getStage, blend, getGroundLevel } from '../mannequinJS/mannequin';
  import { customPosture, positionY_pointBas } from '../js/mannequinFonctions';
import { generalStore } from '../store';

  export default {

    name: "mannequin",

    data: () => ({
      mannequin: new Male
    }),
    
    mounted() {

      createStage(this.animate)
      // getStage().scene.translateY(-0.25)
    },
    

    
    methods: {
      animate: function (t) {
        if (!this.store.dialogBrokerMQTT.visible) {
          
          if (Math.abs(this.store.endDevices.angleTorse) < 160) {

            this.mannequin.posture = blend(
            this.mannequin.posture,
            customPosture(this.store.endDevices.angleTorse|0, this.store.endDevices.angleCuisses|0, this.store.endDevices.angleJambes|0),
            0.05)
          }
          
          else {
            this.mannequin.posture = customPosture(this.store.endDevices.angleTorse|0, this.store.endDevices.angleCuisses|0, this.store.endDevices.angleJambes|0)
          }

          this.mannequin.position.y += this.ground()
        }
      },

      ground: function () {
        
        const bottom = Math.min(

          // pied gauche
          this.mannequin.l_ankle.point(6, 2, 0).y,
          this.mannequin.l_ankle.point(-2, 2.5, 0).y,
          this.mannequin.l_ankle.point(2, 2.5, 2).y,
          this.mannequin.l_ankle.point(2, 2.5, -2).y,
          this.mannequin.l_ankle.point(1.35, -0.35, 0).y,
          this.mannequin.l_ankle.point(-1.35, -0.35, 0).y,

          // pied droit
          this.mannequin.r_ankle.point(6, 2, 0).y,
          this.mannequin.r_ankle.point(-2, 2.5, 0).y,
          this.mannequin.r_ankle.point(2, 2.5, 2).y,
          this.mannequin.r_ankle.point(2, 2.5, -2).y,
          this.mannequin.r_ankle.point(1.35, -0.35, 0).y,
          this.mannequin.r_ankle.point(-1.35, -0.35, 0).y,

          // jambes gauche et droite
          this.mannequin.l_leg.point(2.75, -5, 0).y,
          this.mannequin.l_leg.point(-2.75, -5, 0).y,
          this.mannequin.r_leg.point(2.75, -5, 0).y,
          this.mannequin.r_leg.point(-2.75, -5, 0).y,

          // torse
          this.mannequin.torso.point(-3.5, 13, 0).y,
          this.mannequin.torso.point(3.2, 11.3, 0).y,

          // bassin
          this.mannequin.pelvis.point(-5, -0.5, 0).y,
          this.mannequin.pelvis.point(-1.5, -4, 0).y,

          // tête
          this.mannequin.head.point(-3.5, 4, 0).y,
          this.mannequin.head.point(3, 1.75, 0).y,
          this.mannequin.head.point(0, 7, 0).y,

          // genoux
          this.mannequin.l_knee.point(1.25, 0, 0).y,
          this.mannequin.l_knee.point(-1.25, 0, 0).y,
          this.mannequin.r_knee.point(1.25, 0, 0).y,
          this.mannequin.r_knee.point(-1.25, 0, 0).y,

          // coudes
          this.mannequin.l_elbow.point(1, 0, 0).y,
          this.mannequin.r_elbow.point(1, 0, 0).y)

        return (getGroundLevel()-bottom-0.04);
      }
    },
    
    setup() {

      const store = generalStore()
      
      getStage().scene.rotateX(0.3)
      getStage().scene.rotateY(-1.5)


      return { store }
    }
  }
</script>

<template>
</template>