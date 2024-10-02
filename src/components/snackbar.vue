<template>
    <v-snackbar
      v-model="snackbarError"
      location="top right"
      min-width="10"
      min-heigth="1"
      timer="warning"
      transition="slide-x-reverse-transition"
    >
        <v-btn variant="outlined" size="small" color="warning" icon="mdi-wifi-strength-4-alert" :ripple="false"></v-btn>
        Connexion au serveur perdue
    </v-snackbar>

    <v-snackbar
      v-model="snackbarConnect"
      location="top right"
      min-width="10"
      min-heigth="1"
      timer="success"
      transition="slide-x-reverse-transition"
    >
        <v-btn variant="outlined" size="small" color="success" icon="mdi-wifi-check" :ripple="false"></v-btn>
        Connexion rétablie
    </v-snackbar>
</template>

<script>
    import { generalStore } from '../store';

    export default {
        name: "messageConnexionPerdue",

        components: { VSonner },

        data: () => ({
            snackbarError: false,
            snackbarConnect: false
        }),

        setup() {

            const store = generalStore()

            return { store }
        },

        watch : {
            watchStatutMQTT (statut, oldStatut) {

                console.log(statut, oldStatut)
                if (statut == "error" && oldStatut == "connect") {

                    this.snackbarError = true
                }

                else if (statut == "connect" && oldStatut == "reconnect") {

                    this.snackbarConnect = true
                }
            }
        },

        computed: {
            watchStatutMQTT: ({store}) => (store.statutMQTT)
        }
    }
</script>

<style>
</style>