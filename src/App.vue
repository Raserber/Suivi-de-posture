<template>
  <Parametres></Parametres>
  <Mannequin></Mannequin>
  
  <dialogChoixMQTT></dialogChoixMQTT>
  <notifications></notifications>

  <Informations></Informations>
  <v-container
    id="logos"
  >
  <v-img 
    src="IUT1.png"
    style="margin-bottom: 15px;"
  ></v-img>
  <v-img
    src="FAME.png"
  >
  </v-img>
  </v-container>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import dialogChoixMQTT from './components/dialogChoixMQTT/index.vue';
import Mannequin from './components/mannequin.vue';
import Parametres from './components/parametres/index.vue';
import notifications from './components/notifications/index.vue';
import { generalStore } from './store';
import Informations from './components/informations.vue';

// window.electronAPI.onDonneesMQTT((mqttStatus) => {})
// window.electronAPI.returnAdressMQTT()
const store = generalStore()
var lastTime = 0

window.electronAPI.onMessageMQTT(({topic, data}) => {

  if (data) {
    
    store.endDevices.update(topic, data)
  }
})

window.electronAPI.onStatutMQTT(statut => {

  store.statutMQTT = statut
})

window.addEventListener("keydown", (event) => {

  if (event.key == "F11") {

    event.preventDefault()
    window.electronAPI.returnAskFullscreen(!store.isFullscreen)
    store.isFullscreen = !store.isFullscreen
  }
  
  else if (event.key == "r" && event.ctrlKey) {

    window.electronAPI.returnAskFullscreen(false)
    store.isFullscreen = false
  }
});

onBeforeMount(()=> {
	
	window.addEventListener('beforeunload', () => { window.electronAPI.returnResetMQTT("front:beforeUnload") })
})

</script>

<style>

#logos {

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