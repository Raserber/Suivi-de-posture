<template>
    <v-card
        color="grey-lighten-2"
        variant="flat"
      >
        <v-card-title>
            <v-btn
                icon="mdi-arrow-left"
                v-if="store.dialogBrokerMQTT.step > 1"
                @click="store.dialogBrokerMQTT.step--"
                variant="text"
            ></v-btn>

            Choix des End Devices
        </v-card-title>

        <v-card-text>
            <v-row dense>
                <v-col
                    cols="12"
                    v-for="device in store.endDevices.selectedDevices"
                >
                        <MQTTDevice :device="device" :select-options="selectOptions"></MQTTDevice>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                variant="tonal"
                type="submit"
                append-icon="mdi-arrow-right"
                :disabled="store.endDevices.selectedDevices.length < 1"
            >
                Fin
            </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
    import { generalStore } from '../../../store';
    import MQTTDevice from './MQTTDevice.vue';

    export default {

    name: "choixDevices",
        
    setup() {
        const store = generalStore();
        
        return {
            store
        };
    },
        
    computed: {
        selectOptions: function () {

            switch (this.store.endDevices.selectedDevices.length) {

                case 1 :
                    return {items: ['torse']}
                    break;

                case 2 :
                    return {items: ['torse', 'cuisses + jambes']}
                    break;

                case 3 :
                    return {items: ['torse', 'cuisses', 'jambes']}
                    break;
            }
        }
    },

    components: { MQTTDevice }
}
</script>

<style>
</style>