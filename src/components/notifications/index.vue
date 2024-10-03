<template>

    <Snackbar
        @update:model-value="connect = false"
        :is-visible="snackbarConnect"
        text="Connexion rétablie"
        icon="mdi-wifi-check"
        color="success"
    ></Snackbar>

    <Snackbar
        @update:model-value="error = false"
        :is-visible="snackbarError"
        text="Connexion au serveur perdue"
        icon="mdi-wifi-strength-4-alert"
        color="warning"
    ></Snackbar>
</template>

<script>
    import { generalStore } from '../../store';
import Snackbar from './snackbar.vue';

    export default {
    name: "notifications",
    data: () => ({
        error: false,
        connect: false
    }),
    setup() {
        const store = generalStore();
        return { store };
    },
    watch: {
        watchStatutMQTT(statut, oldStatut) {
            if (statut == "error" && oldStatut == "connect") {
                this.error = true;
            }
            else if (statut == "connect" && oldStatut == "reconnect") {
                this.connect = true;
            }
        }
    },
    computed: {
        watchStatutMQTT: ({ store }) => (store.statutMQTT),
        snackbarError: ({ error, snackbarConnect }) => (error && !snackbarConnect),
        snackbarConnect: ({ connect, snackbarError }) => (connect && !snackbarError),
    },
    components: { Snackbar }
}
</script>

<style>
</style>