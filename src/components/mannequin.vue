<script>
  import { Male, createStage, getStage, blend, getGroundLevel } from '../mannequinJS/mannequin';
  import { customPosture } from '../js/mannequinFonctions';
  import { generalStore } from '../store';

  export default {

    name: "mannequin",

    data: () => ({
      mannequin: new Male
    }),
    
    mounted() {

      createStage(this.animate)
      getStage().camera.position.set(5, 2, 2)
    },
    
    methods: {
      animate: function (t) {

        if (!this.store.dialogBrokerMQTT.visible && this.store.hostMQTT != "") {

          this.mannequin.posture = blend(
          this.mannequin.posture,
          customPosture(this.store.endDevices.angleTorse, this.store.endDevices.angleCuisses, this.store.endDevices.angleJambes),
          0.05)

          this.mannequin.position.y += this.ground()
          this.changementPositionBras()
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
          this.mannequin.head.point(-4, 10, 0).y,
          this.mannequin.head.point(4.5, 8, 0).y,
          this.mannequin.head.point(0, 11, 0).y,

          // genoux
          this.mannequin.l_knee.point(1.25, 0, 0).y,
          this.mannequin.l_knee.point(-1.25, 0, 0).y,
          this.mannequin.r_knee.point(1.25, 0, 0).y,
          this.mannequin.r_knee.point(-1.25, 0, 0).y,

          // coudes
          this.mannequin.l_elbow.point(1, 0, 0).y,
          this.mannequin.r_elbow.point(1, 0, 0).y)

        return (getGroundLevel()-bottom);
      },

      changementPositionBras: function () {
        
        if (this.mannequin.l_wrist.point(1, 5, 0).y <= getGroundLevel() || this.mannequin.l_wrist.point(1, 2, -1.5).y <= getGroundLevel()) {

          while (this.mannequin.l_wrist.point(1, 5, 0).y <= getGroundLevel()-0.04 || this.mannequin.l_wrist.point(1, 2, -1.5).y <= getGroundLevel()-0.04) {
            this.mannequin.l_arm.raise   += 0.4
            this.mannequin.r_arm.raise   += 0.4
            this.mannequin.l_elbow.bend  += this.mannequin.l_elbow.bend >= 90 ? 0 : 0.01
            this.mannequin.r_elbow.bend  += this.mannequin.r_elbow.bend >= 90 ? 0 : 0.01
    
        }
        }
        
        // boucle descendant les bras si loin du sol
        else {
            
            if (this.mannequin.l_arm.raise > 0) {
                this.mannequin.l_arm.raise   -= 0.3 + this.mannequin.l_arm.raise * 0.005
                this.mannequin.r_arm.raise   -= 0.3 + this.mannequin.r_arm.raise * 0.005
            }
        
            else if (this.mannequin.l_elbow.bend > 15) {
                
                this.mannequin.l_elbow.bend  -= 0.6 + this.mannequin.l_elbow.bend * 0.02
                this.mannequin.r_elbow.bend  -= 0.6 + this.mannequin.r_elbow.bend * 0.02
            }
    }
      }
    },
    
    setup() {

      const store = generalStore()

      return { store }
    }
  }
</script>

<template>
</template>