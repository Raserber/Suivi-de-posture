<template>
  <Parametres></Parametres>
  <Mannequin></Mannequin>
  
  <ChoixBrokerMQTTDialog></ChoixBrokerMQTTDialog>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import ChoixBrokerMQTTDialog from './components/littles-components/choixBrokerMQTTDialog.vue';
import Mannequin from './components/mannequin.vue';
import Parametres from './components/parametres.vue';
import { generalStore } from "./store/index"

// window.electronAPI.onDonneesMQTT((mqttStatus) => {})
// window.electronAPI.returnAdressMQTT()

const store = generalStore()

window.electronAPI.onMessageMQTT(message => {

	console.log(message)
})

onBeforeMount(()=> {
	
	window.addEventListener('beforeunload', () => { window.electronAPI.returnResetMQTT("beforeUnload") })
})

</script>

<style>

</style>