<template>
    <v-card
        color="grey-lighten-2"
        variant="flat"
      >
        <v-card-title>
            <v-btn
                icon="mdi-arrow-left"
                v-if="store.dialogBrokerMQTT.step > 1"
                @click="store.dialogBrokerMQTT.step--;$refs.form2.reset()"
                variant="text"
            ></v-btn>

            Affectations des End Devices
        </v-card-title>

        <v-form ref="form2"
            @submit.prevent="submit"
            validate-on="input"
        >
            <v-card-text>
                <v-row dense>
                    <v-col
                        cols="12"
                        v-for="device in store.endDevices.selectedDevices"
                    >
                        <MQTTDevice
                            :disabled="submitting"
                            :device="device" :select-options="{items : items(device.position)}"
                        ></MQTTDevice>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    variant="tonal"
                    type="submit"
                    prepend-icon="mdi-check"
                    :loading="submitting"
                    :disabled="store.endDevices.selectedDevices.length < 1"
                >
                    Valider
                </v-btn>
            </v-card-actions>
        </v-form>
      </v-card>

      <messageErreur
                :errorAlert="errorAlert"
                :hostValue="store.hostMQTT"
                @afterLeave="errorAlert = false"
        ></messageErreur>
</template>

<script>
    import { generalStore } from '../../../store';
    import MQTTDevice from './MQTTDevice.vue';
    import messageErreur from '../messageErreur.vue';

    export default {

    name: "choixDevices",
        
    setup() {
        const store = generalStore();
        
        return {
            store
        };
    },
        
    data: () => ({
        errorAlert: false,
        submitting: false,
        timeoutSubmitting: null
    }),
        
    methods: {
        submit : async function (event) {
            
            const isValid = (await event).valid
            
            if (isValid) {
                
                this.submitting = true
                
                window.electronAPI.returnTopicsMQTTSelected({
                    host: this.store.hostMQTT,
                    selectedTopics: [...this.store.endDevices.selectedTopics]
                })

                this.timeoutSubmitting =  setTimeout(() => {
                    console.log("timeout pop")
                    window.electronAPI.returnTopicsMQTTSelected({
                    host: this.store.hostMQTT,
                    selectedTopics: [...this.store.endDevices.selectedTopics]
                })
                }, 20000);
            }
        },

        items(position) {

            switch (this.store.endDevices.selectedDevices.length) {

                case 1 :
                    return ["corps", "torse", "cuisses", "jambes"]

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
                    return ([
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
                    ].filter(option => ((position != null ? position.includes(option.value) : false) || !this.selected.includes(option.value))))
                    break;
            }
            
            return []
        },
    },

    computed : {
        selected: function () {

            return [this.store.endDevices.torse ? "torse" : '', this.store.endDevices.cuisses ? "cuisses" : '', this.store.endDevices.jambes ? "jambes" : '']
        },
        
        watchStatutMQTT: ({ store }) => (store.statutMQTT)
    },

    watch: {

        watchStatutMQTT(statut) {

            if (this.store.dialogBrokerMQTT.visible && this.submitting && this.store.dialogBrokerMQTT.step == 3) {

                clearTimeout(this.timeoutSubmitting)

                if (statut == "connect") {

                    this.submitting = false;
                    this.store.dialogBrokerMQTT.visible = false;
                    this.store.dialogBrokerMQTT.step = 1;
                    
                    if (this.store.endDevices.corps) {
                        this.store.endDevices.corps.position = ["torse", "cuisses", "jambes"]
                    }
                }
                if (statut == "error") {

                    this.submitting = false;
                    this.errorAlert = true;
                    window.electronAPI.returnResetMQTT("front:errorDuringDevicesConnect")
                }
            }
        }
    },
    components: { MQTTDevice, messageErreur }
}
</script>

<style>
</style>