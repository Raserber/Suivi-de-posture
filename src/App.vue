<template>
  <Parametres></Parametres>
  <Mannequin></Mannequin>
  
  <dialogChoixMQTT></dialogChoixMQTT>
  <notifications></notifications>

  <v-img
    id="logoIUT1"
    src="./src/img/IUT1.png"
  ></v-img>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import dialogChoixMQTT from './components/dialogChoixMQTT/index.vue';
import Mannequin from './components/mannequin.vue';
import Parametres from './components/parametres.vue';
import notifications from './components/notifications/index.vue';
import { generalStore } from './store';

// window.electronAPI.onDonneesMQTT((mqttStatus) => {})
// window.electronAPI.returnAdressMQTT()
const store = generalStore()

window.electronAPI.onMessageMQTT(({topic, data}) => {

    if (data) {
      
      store.endDevices.update(topic, data)
    }
})

window.electronAPI.onStatutMQTT(statut => {

  store.statutMQTT = statut
})

onBeforeMount(()=> {
	
	window.addEventListener('beforeunload', () => { window.electronAPI.returnResetMQTT("front:beforeUnload") })
})

</script>

<style>

#logoIUT1 {

position: absolute;
bottom: 0px;
right: 0px;

margin: 1.75vw;

width: 25vw;
min-width: 200px;

filter: drop-shadow(rgba(255,255,255,0.25) 0px 0px 7px);

z-index: 100;
}
</style>