<template>
   <v-card max-height="200">
        <v-card-title>
            {{ device.deviceName }}
        </v-card-title>
        
        <v-card-subtitle>
            {{ device.topic }}
        </v-card-subtitle>
        
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                variant="outlined"
                color="primary"
                @click="boutonPress = true"
            >
                <v-icon>mdi-code-json</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>

    <DataViewer
        :title="device.deviceName"
        :subtitle="device.topic"
        :data="device.rawData"
        :dataVisible="secondWindowVisible && boutonPress"
        @afterLeave="boutonPress=false"
    ></DataViewer>
</template>

<script>
    import { generalStore } from '../../../../store';
    import DataViewer from "./dataViewer.vue"

    export default {

        name: "MQTTDevice",

        setup() {
            const store = generalStore();
            return { store };
        },
        
        computed: {
            secondWindowVisible () {
                return this.store.dialogBrokerMQTT.visible && this.store.dialogBrokerMQTT.step == 2
            }
        },
        
        data: () => ({

            boutonPress: false
        }),

        props: {

            device: Object
        },

        components: { DataViewer }
}
</script>

<style>
</style>