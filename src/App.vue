<template>
  <Parametres></Parametres>
  <Mannequin></Mannequin>
  
  <dialogChoixBrokerMQTT></dialogChoixBrokerMQTT>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import dialogChoixBrokerMQTT from './components/dialogChoixBrokerMQTT/index.vue';
import Mannequin from './components/mannequin.vue';
import Parametres from './components/parametres.vue';

// window.electronAPI.onDonneesMQTT((mqttStatus) => {})
// window.electronAPI.returnAdressMQTT()

window.electronAPI.onMessageMQTT(message => {

	console.log(message)
})

onBeforeMount(()=> {
	
	window.addEventListener('beforeunload', () => { window.electronAPI.returnResetMQTT("beforeUnload") })
})

</script>

<style>

</style>