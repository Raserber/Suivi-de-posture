<template>
   <v-card max-height="200">
        <v-card-title>
            {{ title }}
        </v-card-title>
        
        <v-card-subtitle>
            {{ subtitle }}
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
        :title="title"
        :subtitle="subtitle"
        :data="data"
        :dataVisible="secondWindowVisible && boutonPress"
        @closeClick="boutonPress=false"
    ></DataViewer>
</template>

<script>
import { generalStore } from '../../../store';
import DataViewer from './dataViewer.vue';

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
        
        data: () => {
            return {
                boutonPress: false
            }
        },

        props: {
            title: String,
            subtitle: String,
            data: Object
        },

        components: { DataViewer }
}
</script>

<style>
</style>