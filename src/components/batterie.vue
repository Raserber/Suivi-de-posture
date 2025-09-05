<template>
    <v-btn
    v-if="store.pourcentageBatterie != -1"
        id="batterie"
    >
        
        <v-icon
            :start="true" size="x-large"
            color="blue-grey-darken-1"
        >    
            mdi-battery-{{ store.pourcentageBatterie <= 9 ? 10 : (store.pourcentageBatterie%10 < 5 ? store.pourcentageBatterie-store.pourcentageBatterie%10 : store.pourcentageBatterie+10-store.pourcentageBatterie%10) }}-bluetooth
        </v-icon>
        <span color="blue-grey-darken-1" style="font-weight: 800;">{{store.pourcentageBatterie}}%</span>
    </v-btn>
</template>
  
<script>
    import { generalStore } from '../store'

  export default {
    name: "batterie",

    setup: function () {

        const store = generalStore();
        return { store };
    },
}
</script>

<style lang="scss">

#batterie {

  position: absolute;

  width: 85px;
  height: 50px;

  left: 0;
  bottom: 0;

  margin-bottom: 8px;
  margin-left: 12px;

	background: rgba(100, 100, 100, 0.1);

	border: solid 1px rgba(0, 0, 0, 0.05);
	border-radius: 1em;
	box-shadow: inset 0 0 0.1em rgba(0, 0, 0, 0.1);

	backdrop-filter: blur(0.3em);
  

  .icon {

    position: relative;
    left: 50%;

    translate: -50%;
    
    height: 40px;
  }
}

</style>