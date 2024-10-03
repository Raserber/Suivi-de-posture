<template>
    <v-card
        color="grey-lighten-2"
        variant="flat"
      >
        <v-card-title>
            <v-btn variant="text"
                @click="store.dialogBrokerMQTT.visible = false"
                icon="mdi-close"
                >
            </v-btn>

            <v-btn
                variant="tonal"
                :ripple="false"
                color="purple-darken-3"
                icon="mdi-access-point"
            ></v-btn>
            Connexion au Broker MQTT
        </v-card-title>

        <v-form ref="form"
            @submit.prevent="submit"
            validate-on="submit"
        >
            <v-card-text>
                <v-row dense>
                    <v-col cols="2">
                        <v-select
                            :items="['mqtt://', 'ws://', 'wss://']"
                            label="protocole"
                            :disabled="disableForm"
                            v-model="protocolValue"
                            variant="underlined"
                        ></v-select>
                    </v-col>

                    <v-col cols="5">
                        <v-text-field
                            label="Host (IP/adresse)"
                            :disabled="disableForm"
                            v-model="hostValue"
                            variant="underlined"
                            :rules="rules.host"
                        ></v-text-field>
                    </v-col>
                    
                    <v-col cols="4">
                        <v-text-field
                            hint="le plus souvent 1883 (non sécurisé) ou 8883 (sécurisé)"
                            label="port"
                            :disabled="disableForm"
                            v-model="portValue"
                            variant="underlined"
                            :rules="rules.port"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row dense>
                    <v-col cols="8">
                        <v-text-field
                            hint="topic général (avec #), non spécifique à un appareil, choix de l'appareil après, ex : application/8/#"
                            label="topic MQTT"
                            :disabled="disableForm"
                            v-model="topicValue"
                            variant="outlined"
                            :rules="rules.topic"
                        ></v-text-field>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col cols="7">
                        <v-select
                            clearable
                            :items="['Didalab (LoRaWAN)', 'IoTize (Wifi)']"
                            label="Connexion MQTT pré-configurée"
                            variant="outlined"
                            :disabled="submitting"
                            v-model="connexionMQTTPreConfiguree"
                        ></v-select>
                    </v-col>
                </v-row>

                <small
                    :style="preConfigSelectionne ? 'opacity: 1;' : 'opacity: 0;'"
                    class="text-caption text-medium-emphasis font-italic"
                >
                    Modifications non-autorisées avec "{{ connexionMQTTPreConfiguree }}" sélectionné
                </small>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    variant="tonal"
                    :loading="submitting"
                    type="submit"
                    prepend-icon="mdi-connection"
                >
                    Connexion
                </v-btn>
            </v-card-actions>
        </v-form>
      </v-card>
        <MessageErreur
                :errorAlert="errorAlert"
                :hostValue="hostValue"
                @afterLeave="errorAlert = false"
        ></MessageErreur>
</template>
    
<script>
    import { generalStore } from '../../../store'
    import MessageErreur from '../messageErreur.vue'
        
    export default {

        name: "choixBroker",

        setup: function () {

            const store = generalStore();
            return { store };
        },

        data: () => ({

            activatorProps: true,
            preConfigSelectionne: false,
            submitting: false,
            timeoutSubmitting: null,
            errorAlert: false,
            connexionMQTTPreConfiguree: "",
            hostValue: "",
            portValue: "",
            topicValue: "",
            protocolValue: "mqtt://",
            rules: {
                host: [
                    (text) => {
                        return /^([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|([a-z][a-zA-Z0-9]{2,}\.[a-zA-Z]{2,})$/.test(text) ? true : "Le host doit être une adresse IP ou une adresse web valide";
                    }
                ],
                port: [
                    (text) => {
                        return /[0-9]+/.test(text) ? true : "Le port doit être valide";
                    }
                ],
                topic: [
                    (text) => {
                        return /\#/.test(text) ? true : "Le topic doit contenir '#'";
                    }
                ]
            }
        }),
        
        methods: {

            submit: async function (event) {

                var isValid = (await event).valid;

                if (isValid) {

                    this.submitting = true;

                    this.store.hostMQTT = `${this.protocolValue}${this.hostValue}:${this.portValue}`
                    this.store.generalTopicMQTT = this.topicValue
                    
                    window.electronAPI.returnHostAndTopicMQTT({
                        host: `${this.protocolValue}${this.hostValue}:${this.portValue}`,
                        topic: this.topicValue
                    });

                    this.timeoutSubmitting = setTimeout(() => {
                        console.log("timeout pop")
                        window.electronAPI.returnHostAndTopicMQTT({
                            host: `${this.protocolValue}${this.hostValue}:${this.portValue}`,
                            topic: this.topicValue
                        });
                    }, 20000)
                }
            }
        },

        watch: {

            watchStatutMQTT(statut) {

                if (this.store.dialogBrokerMQTT.visible && this.submitting && this.store.dialogBrokerMQTT.step == 1) {

                    if (statut == "connect") {

                        clearTimeout(this.timeoutSubmitting)

                        this.submitting = false;
                        this.store.endDevices.reset()
                        this.store.dialogBrokerMQTT.step = 2;
                    }
                    if (statut == "error") {

                        clearTimeout(this.timeoutSubmitting)

                        this.submitting = false;
                        this.errorAlert = true;
                        window.electronAPI.returnResetMQTT("front:errorDuringGlobalConnect")
                    }
                }
            },

            connexionMQTTPreConfiguree(newData, oldData) {

                this.preConfigSelectionne = true;

                if (newData == "Didalab (LoRaWAN)") {

                    this.protocolValue = "mqtt://";
                    this.hostValue = "192.168.1.20";
                    this.portValue = "1883";
                    this.topicValue = "application/8/device/#";
                }

                else if (newData == "IoTize (Wifi)") {

                    this.protocolValue = "mqtt://";
                    this.hostValue = "192.168.1.20";
                    this.portValue = "1883";
                    this.topicValue = "application/iotize/#";
                }

                else {

                    this.preConfigSelectionne = false;
                    this.$refs.form.reset();
                    this.protocolValue = "mqtt://";
                }
            }
        },

        computed: {

            watchStatutMQTT: ({ store }) => (store.statutMQTT),

            disableForm: ({ preConfigSelectionne, submitting }) => (preConfigSelectionne || submitting)
        },

        components: { MessageErreur }
}
</script>
    
<style>
</style>