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
            <v-data-iterator :items="Object.values(store.endDevices.list)" :page="page" :items-per-page="6">
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
            >
                <v-icon start icon="mdi-check-circle"></v-icon>
                Confirmer
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

    setup() {
        const store = generalStore();
        
        return {
            store
        };
    },

    components: { MQTTDevice }
}
</script>

<style>
</style>