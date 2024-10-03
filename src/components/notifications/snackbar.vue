<template>
    <v-snackbar
    :model-value="isVisible"
    location="top right"
    min-width="10"
    min-heigth="1"
    :timer="color"
    transition="slide-x-reverse-transition"
    :open-delay="500"
>
    <v-btn
        variant="outlined" size="small"
        :color="color" :icon="icon"
        :ripple="false"
    ></v-btn>
    {{ text }}
</v-snackbar>
</template>

<script>

    export default {

        name: "snackbar",

        props: {
            isVisible: Boolean,
            text: String,
            icon: String,
            color: String
        }
    }
</script>

<style>
</style>