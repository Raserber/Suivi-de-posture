<template>
    
    <v-card
    >
        <v-card-title>
            {{ device.deviceName }}
        </v-card-title>
        
        <v-card-actions>
            <v-select
                label="position du capteur"
                variant="outlined"
                width="200"
                v-bind="selectOptions"
                clearable
                v-model="store.endDevices.list[device.deviceName].position"
            >
            </v-select>
            
            <v-radio-group
                inline
                true-icon="mdi-check-circle"
            >
                <v-radio label="Angle X" value="angleX"></v-radio>
                <v-radio label="Angle Y" value="angleY"></v-radio>
                <v-radio label="Angle Z" value="angleZ"></v-radio>
            </v-radio-group>
        </v-card-actions>
    </v-card>
    
</template>

<script>
    import { generalStore } from '../../../store';

    export default {

        name: "MQTTDevice",

        setup() {
            const store = generalStore();
            return { store };
        },
        
        methods: {
            
        },

        props: {
            device: Object,
            selectOptions: Object
        }
}
</script>

<style>
</style>