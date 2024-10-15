<template>
    <v-card
        color="grey-lighten-2"
        variant="flat"
      >
        <v-card-title>
            <v-btn
                icon="mdi-arrow-left"
                v-if="store.dialogBrokerMQTT.step > 1"
                @click="clickBack"
                variant="text"
            ></v-btn>

            <v-btn
                variant="tonal"
                :ripple="false"
                color="purple-darken-3"
                icon="mdi-robot"
            ></v-btn>

            Choix des End Devices
            
            <v-hover v-slot="{isHovering, props}">
                <v-btn
                    variant="outlined"
                    rounded
                    size="small"
                    v-bind="props"
                    :color="store.endDevices.selectedDevices.length >= 2 ? 'success' : ''"
                    
                    @click="() => { store.endDevices.removeSelected() }"
                >
                    <template v-if="isHovering && store.endDevices.selectedDevices.length != 0">
                        <small>
                            <v-icon append>mdi-trash-can</v-icon> Désélectionner
                        </small>
                    </template>
                    <template v-else>
                        {{ store.endDevices.selectedDevices.length }} sélectionné{{ store.endDevices.selectedDevices.length <= 1 ? '' : 's'}}
                    </template>
                </v-btn>
            </v-hover>
        </v-card-title>

        <v-card-text>
            <v-empty-state
                v-if="Object.keys(store.endDevices.list).length == 0"
                icon="mdi-magnify"
                title="Il semblerait qu'il n'y ait pas de End devices émettant"
            ></v-empty-state>
            <v-data-iterator
                :items="Object.values(store.endDevices.list)"
                :page="page" :items-per-page="6"
            >
                <template v-slot:default="{ items }">
                        <v-row dense>
                            <v-col
                                cols="6"
                                v-for="(device, i) in items"
                            >
                                    <MQTTDevice :device="device.raw"></MQTTDevice>
                            </v-col>
                        </v-row>
                </template>
                <template v-slot:footer="{ pageCount }">
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                </template>
        </v-data-iterator>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                variant="tonal"
                type="submit"
                append-icon="mdi-arrow-right"
                :disabled="store.endDevices.selectedDevices.length < 1 || store.endDevices.selectedDevices.length == 4"
                @click="store.dialogBrokerMQTT.step++"
            >
                Suivant
            </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
    import { generalStore } from '../../../store';
    import MQTTDevice from './MQTTDevice/index.vue';

    export default {

    name: "choixDevices",
        
    data: () => ({
        page: 1
    }), 
        
    methods: {
        clickBack: function () {

            this.store.dialogBrokerMQTT.step--
            window.electronAPI.returnResetMQTT('front:backOnDevices')
        }
    },
        
    setup() {
        const store = generalStore();
        
        return {
            store
        };
    },
        
    computed: {

        watchStatutMQTT: ({store}) => (store.statutMQTT)
    },

    watch: {

        watchStatutMQTT: function (statut) {

            if (statut == "end" && this.store.dialogBrokerMQTT.step == 2 && this.store.dialogBrokerMQTT.visible) {
            
                this.store.endDevices.reset()
            }
        }
    },

    components: { MQTTDevice }
}
</script>

<style>
</style>