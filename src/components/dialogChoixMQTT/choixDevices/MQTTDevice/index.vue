<template>
    
    <v-hover v-slot="{isHovering, props}">
        <v-card
            max-height="200"
            v-bind="props"
            @click="vCardClick()"
            :color="device.selected ? 'teal-lighten-5' : timer > 10 ? 'red-lighten-5' : ''"
        >
            <v-card-title>
                <v-icon color="secondary" v-if="device.selected">{{ isHovering ? "mdi-check-circle-outline" : "mdi-check-circle" }}</v-icon>
                <v-icon color="secondary" v-else>{{ isHovering ? "mdi-plus-circle-outline" : "mdi-plus-circle" }}</v-icon>

                {{ device.deviceName }}
            </v-card-title>
            
            <v-card-subtitle>
                {{ device.topic }}
            </v-card-subtitle>
            
            <v-card-actions>
                <v-chip
                    variant="outlined"
                    color="error"
                    v-if="timer >= 10"
                >
                    {{ timer }}s
                </v-chip>
                <v-spacer></v-spacer>
                <v-btn
                    variant="outlined"
                    color="primary"
                    @click.stop="dataViewerVisible = true"
                >
                    <v-icon>mdi-code-json</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-hover>
    
    <DataViewer
        :device="device"
        :timer="timer"
        :dataVisible="secondWindowVisible && dataViewerVisible"
        @afterLeave="dataViewerVisible=false"
    >
    </DataViewer>
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
        
        mounted() {
            
            setInterval(()=>{

                this.timer = this.device.time
            }, 1000)

            this.timer = this.device.time
        },
        
        computed: {
            secondWindowVisible: ({ store }) => (store.dialogBrokerMQTT.visible && store.dialogBrokerMQTT.step == 2)
        },
        
        data: () => ({

            dataViewerVisible: false,
            timer: 0
        }),
        
        methods: {
            
            vCardClick: function () {

                this.store.endDevices.select(this.device)
                
                if (this.store.endDevices.selectedDevices.length > 3) {

                    this.store.endDevices.removeFirstSelected()
                }
            }
        },

        props: { device: Object },

        components: { DataViewer }
}
</script>

<style>
</style>