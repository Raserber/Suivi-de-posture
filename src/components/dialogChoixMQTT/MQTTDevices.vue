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
                @click="dataVisible = true"
            >
                <v-icon>mdi-code-json</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {

        name: "MQTTDevice",
        
        props: {
            title: String,
            subtitle: String,
            data: Object
        },
        
        data: () => {
            return {
                dataVisible: false
            }
        }
    }
</script>

<style>
</style>