<template>
    <v-dialog
        v-model="store.dialogBrokerMQTT.visible"
        persistent
        :width="store.dialogBrokerMQTT.step == 3 ? dialogWidth : 600"
    >
        <v-window v-model="store.dialogBrokerMQTT.step">

            <v-window-item :value="1">
                <ChoixBroker></ChoixBroker>
            </v-window-item>

            <v-window-item :value="2">
                <ChoixDevices></ChoixDevices>
            </v-window-item>

            <v-window-item :value="3">
                <ChoixAngles
                    @dialogWidth="changeDialogWidth"
                ></ChoixAngles>
            </v-window-item>
 
        </v-window>
    </v-dialog>
</template>

<script>
    import { generalStore } from '../../store';
    import ChoixAngles from './choixAngles/index.vue';
    import ChoixBroker from './choixBroker/index.vue';
    import ChoixDevices from './choixDevices/index.vue';

    export default {

        name: "dialogChoixMQTT",

        data: () => ({
            dialogWidth: 600
        }),

        setup() {

            const store = generalStore()

            return {
                store
            }
        },

        methods: {

            changeDialogWidth: function (width) {

                this.dialogWidth = width
            }
        },

        components: { ChoixBroker, ChoixDevices, ChoixAngles }
}
</script>

<style>
</style>