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

// window.electronAPI.onDonneesMQTT((mqttStatus) => {})
// window.electronAPI.returnAdressMQTT()

window.electronAPI.onMessageMQTT(message => {

	console.log(message)
})

onBeforeMount(()=> {
	
	window.addEventListener('beforeunload', () => { window.electronAPI.returnResetMQTT("front:beforeUnload") })
})

</script>

<style>

</style>