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
                item-title="title"
                item-value="value"
                single-line
                :rules="rules"
                clearable
                v-model="device.position"
            >
            </v-select>
            
            <v-radio-group
                inline
                true-icon="mdi-check-circle"
                label="Angle surveillé"
                :rules="rules"
                v-model="device.angleWatch"
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
        
        data: () => ({
            rules: [
                value => {
                    if (value) return true

                    return 'Veuillez saisir une valeur'
                },
            ], 
        }),

        props: {
            device: Object,
            selectOptions: Object
        }
}
</script>

<style>
</style>