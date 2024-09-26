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
                
            </v-window-item>
        </v-window>
    </v-dialog>
</template>

<script>
import { generalStore } from '../../store';
import ChoixBroker from './choixBroker.vue';

    export default {
        name: "dialogChoixBrokerMQTT",

        components: { ChoixBroker },

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