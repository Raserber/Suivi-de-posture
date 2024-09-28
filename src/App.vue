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

window.electronAPI.onMessageMQTT(({topic, data}) => {

  store.endDevices.update(topic, data)
  store.messageMQTT = {topic, data}
})
function createGNAGNA(topicM) {

  store.endDevices.update(`application/iotize/IoTize2039209242${topicM}/uplink`,
    {
      accX: 1,
      accY: 0.0003,
      accZ: 0.012,
      gyrX: 0.0023,
      gyrY: 0.0013,
      gyrZ: 0.010,
      dt: 100
    }
  )
}

createGNAGNA(1)
createGNAGNA(2)
createGNAGNA(3)
createGNAGNA(4)
createGNAGNA(5)
createGNAGNA(6)
createGNAGNA(7)
createGNAGNA(8)
createGNAGNA(9)

window.electronAPI.onStatutMQTT(statut => {

  store.statutMQTT = statut
})

onBeforeMount(()=> {
	
	window.addEventListener('beforeunload', () => { window.electronAPI.returnResetMQTT("front:beforeUnload") })
})

</script>

<style>

</style>