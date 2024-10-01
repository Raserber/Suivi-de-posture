<template>
    
    <v-hover v-slot="{isHovering, props}">
        <v-card
            max-height="200"
            v-bind="props"
            @click="device.isValid ? vCardClick() : ''"
            :ripple="device.isValid ? true : false"
            :color="device.isValid ? (device.selected ? 'teal-lighten-5' : (timer > 10 ? 'red-lighten-4' : '')) : 'grey-lighten-1'"
        >
            <v-card-title>
                <v-badge dot :color="dataValidity.color" :model-value="!device.isValid || !device.isValidOptional">
                    <v-icon v-if="!device.isValid">mdi-alert-decagram</v-icon>
                    <v-icon color="secondary" v-else-if="device.selected">{{ isHovering ? "mdi-check-circle-outline" : "mdi-check-circle" }}</v-icon>
                    <v-icon color="secondary" v-else>{{ isHovering ? "mdi-plus-circle-outline" : "mdi-plus-circle" }}</v-icon>
                </v-badge>

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
                    :class="device.isValid ? '' : 'bg-grey-lighten-5'"
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
        :dataValidity="dataValidity"
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
            secondWindowVisible: ({ store }) => (store.dialogBrokerMQTT.visible && store.dialogBrokerMQTT.step == 2),
            
            dataValidity: function () {

                var vars = [
                    "accX", "accY", "accZ", "gyrX", "gyrY", "gyrZ", 
                ]
                var undefinedVars = vars.filter(value => (!this.device[value]))
                var options = ["deviceName", "dt"].filter(value => (!this.device.rawData[value]))
                
                if (undefinedVars.length != 0) {
                    return {
                        color: "red-darken-4",
                        phrase: this.dataValidityString(undefinedVars)
                    }
                }
                
                else if (options.length != 0) {
                    return {
                        color: "orange-darken-3",
                        phrase: this.dataValidityString(options)
                    }
                }
                
                else {
                    return {
                        color: "black",
                        phrase: ""
                    }
                }
            }
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
            },
        
            dataValidityString(liste) {
                if (liste.length === 1) {

                    return `Variable ${liste[0]} non trouvée.`;
                }
                
                else if (liste.length === 2) {

                    return `Variables ${liste.join(' et ')} non trouvées.`; // Si 2 variables, juste "et" entre les deux
                }
                
                else {

                    const lastVar = liste.pop();
                    return `Variables ${liste.join(', ')} et ${lastVar} non trouvées.`;
                }               
            }
        },

        props: { device: Object },

        components: { DataViewer }
}
</script>

<style>
</style>