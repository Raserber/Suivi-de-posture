<template>
  <Parametres class="panel"></Parametres>
  <Mannequin></Mannequin>
</template>

<script setup>
import Mannequin from './components/mannequin.vue';
import Parametres from './components/parametres.vue';

// window.electronAPI.onDonneesMQTT((mqttStatus) => {})
// window.electronAPI.returnAdressMQTT()
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