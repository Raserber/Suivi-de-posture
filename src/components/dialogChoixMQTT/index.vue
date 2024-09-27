<template>
    <v-dialog v-model="store.dialogBrokerMQTT.visible"
          persistent
          max-width="600"
    >
        <v-window v-model="store.dialogBrokerMQTT.step">

            <v-window-item :value="1">
                <ChoixBroker></ChoixBroker>
            </v-window-item>
            
            <v-window-item :value="2">
                <ChoixDevices></ChoixDevices>
            </v-window-item>
        </v-window>
    </v-dialog>
</template>

<script>
import { generalStore } from '../../store';
import ChoixBroker from './choixBroker.vue';
import ChoixDevices from './choixDevices.vue';

    export default {
        name: "dialogChoixMQTT",

        components: { ChoixBroker, ChoixDevices },

        setup() {

            const store = generalStore()

            return {
                store
            }
        }
}
</script>

<style>
</style>