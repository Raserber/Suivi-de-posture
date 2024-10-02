<template>
  <Parametres></Parametres>
  <Mannequin></Mannequin>
  
  <dialogChoixMQTT></dialogChoixMQTT>
  <snackbar></snackbar>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import dialogChoixMQTT from './components/dialogChoixMQTT/index.vue';
import Mannequin from './components/mannequin.vue';
import Parametres from './components/parametres.vue';
import snackbar from './components/snackbar.vue';
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

</style>