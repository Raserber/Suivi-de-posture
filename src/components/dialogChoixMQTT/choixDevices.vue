<template>
    <v-card
        color="grey-lighten-2"
        variant="flat"
      >
        <v-card-title>
            <v-btn icon variant="text"
                v-if="store.dialogBrokerMQTT.step > 1"
                @click="store.dialogBrokerMQTT.step--"
            >
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            Choix des appareils
        </v-card-title>

        <v-card-text>
            <v-row>
                <v-col v-for="i in 20" cols="4">
                    <MQTTDevices :title="i" :subtitle="i" :text="i"></MQTTDevices>
                </v-col>
            </v-row>
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
    import { generalStore } from '../../store';
import MQTTDevices from './MQTTDevices.vue';

    export default {
    name: "choixDevices",
    setup() {
        const store = generalStore();
        return {
            store
        };
    },
    components: { MQTTDevices }
}
</script>

<style>
</style>