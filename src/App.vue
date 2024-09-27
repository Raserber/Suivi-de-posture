<template>
  <Parametres></Parametres>
  <Mannequin></Mannequin>
  
  <dialogChoixMQTT></dialogChoixMQTT>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import dialogChoixMQTT from './components/dialogChoixMQTT/index.vue';
import Mannequin from './components/mannequin.vue';
import Parametres from './components/parametres.vue';
import { generalStore } from './store';

// window.electronAPI.onDonneesMQTT((mqttStatus) => {})
// window.electronAPI.returnAdressMQTT()
const store = generalStore()

var essai = new managerED

window.electronAPI.onMessageMQTT(({topic, data}) => {

  store.messageMQTT = {topic, data}
  
  essai.update(topic, data)
})

onBeforeMount(()=> {
	
	window.addEventListener('beforeunload', () => { window.electronAPI.returnResetMQTT("front:beforeUnload") })
})

</script>

<style>

</style>