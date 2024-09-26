<template>
  <Parametres class="panel"></Parametres>
  <Mannequin></Mannequin>
  
  <ChoixMQTTDialog></ChoixMQTTDialog>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import ChoixMQTTDialog from './components/littles-components/choixMQTTDialog.vue';
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

.panel {
  position: fixed;
	top: 0;

	width: 12em;

	margin: 0.3em;
	padding: 0.3em;
}

</style>