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
                    <MQTTDevice :device="device" :select-options="{items : items(device.position)}"></MQTTDevice>
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
        
    methods: {
        items(position) {

            switch (this.store.endDevices.selectedDevices.length) {

                case 2 :
                    return [
                         position == "torse" || !this.selected.includes("torse") ? {
                            title: "torse",
                            value: "torse" 
                        }:
                        {
                            title: "cuisses + jambes",
                            value: ["cuisses", "jambes"]
                        }
                    ]
                    break;

                case 3 :
                    return [
                        {
                            title: "torse",
                            value: "torse"
                        },
                        {
                            title: "cuisses",
                            value: "cuisses"
                        },
                        {
                            title: "jambes",
                            value: "jambes"
                        }
                    ].filter(option => ((position != null ? position.includes(option) : false) || !this.selected.includes(option)))
                    break;
            }
            
            return []
        },
    },

    computed : {
        selected: function () {

            return [this.store.endDevices.torse ? "torse" : '', this.store.endDevices.cuisses ? "cuisses" : '', this.store.endDevices.jambes ? "jambes" : '']
        }
    },

    components: { MQTTDevice }
}
</script>

<style>
</style>