<template>
   <v-card>
        <v-card-title>
            {{ title }}
        </v-card-title>
        
        <v-card-subtitle>
            {{ subtitle }}
        </v-card-subtitle>
        
        <v-card-text>
            {{ text }}
        </v-card-text>
    </v-card>
</template>

<script>

    export default {

        name: "MQTTDevice",

        props: {
            title: String,
            subtitle: String,
            text: String
        }
    }
</script>

<style>
</style>