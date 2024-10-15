<template>
    <v-card
        color="grey-lighten-2"
        variant="flat"
      >
        <v-card-title>
            <v-btn
                icon="mdi-arrow-left"
                variant="text"
                v-if="store.dialogBrokerMQTT.step > 1"
                :disabled="submitting"
                @click="store.dialogBrokerMQTT.step--;$refs.form2.reset()"
            ></v-btn>

            <v-btn
                icon="mdi-rotate-orbit"
                color="purple-darken-3"
                variant="tonal"
                :ripple="false"
            ></v-btn>

            Affectations des End Devices
        </v-card-title>

        <v-form
            ref="form2"
            @submit.prevent="submit"
            validate-on="input"
        >
            <v-card-text>
                <v-row dense>
                    <v-col
                        :cols="this.store.endDevices.selectedDevices.length <= 3 ? '12' : '6'"
                        v-for="device in store.endDevices.selectedDevices"
                    >
                        <MQTTDevice
                            :disabled="submitting"
                            :device="device"
                            :select-options="{items : items(device.position)}"
                        ></MQTTDevice>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    variant="tonal"
                    prepend-icon="mdi-rotate-orbit"
                    type="submit"
                    :disabled="store.endDevices.selectedDevices.length < 1"
                    :loading="submitting"
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
        
        return { store };
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

                // si MQTT event "connect" ou "error" n'est pas renvoyé
                // il est possible que ce soit dû au fait que le main.js s'est bien connecté
                // mais n'a pas renvoyé de statut. Dans ce cas là : reconnexion au bout de 20s
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

            this.$emit("dialogWidth", 600)

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
                
                case 5 :
                    this.$emit("dialogWidth", 1200)
                    return ([
                        "torse",
                        "cuisseGauche",
                        "cuisseDroite",
                        "jambeGauche",
                        "jambeDroite"
                    ].filter(option => ((position != null ? position.includes(option) : false) || !this.selected.includes(option))))
                    break;
            }
            
            return []
        },
    },

    computed : {
        selected: function () {

            return [
                this.store.endDevices.torse ? "torse" : '', this.store.endDevices.cuisses ? "cuisses" : '', this.store.endDevices.jambes ? "jambes" : '',
                this.store.endDevices.cuisseGauche ? "cuisseGauche" : '', this.store.endDevices.cuisseDroite ? "cuisseDroite" : '',
                this.store.endDevices.jambeGauche ? "jambeGauche" : '', this.store.endDevices.jambeDroite ? "jambeDroite" : '',
            ]
        },
        
        watchStatutMQTT: ({ store }) => (store.statutMQTT)
    },

    watch: {

        watchStatutMQTT(statut) {

            if (this.store.dialogBrokerMQTT.visible && this.submitting && this.store.dialogBrokerMQTT.step == 3) {

                if (statut == "connect") {

                    this.$emit("dialogWidth", 600)
                    clearTimeout(this.timeoutSubmitting)

                    this.submitting = false;
                    this.store.dialogBrokerMQTT.visible = false;
                    this.store.dialogBrokerMQTT.step = 1;
                    
                    if (this.store.endDevices.corps) {
                        this.store.endDevices.corps.position = ["torse", "cuisses", "jambes"]
                    }
                }
                if (statut == "error") {
                    
                    this.$emit("dialogWidth", 600)
                    clearTimeout(this.timeoutSubmitting)

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