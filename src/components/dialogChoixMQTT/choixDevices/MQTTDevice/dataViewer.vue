<template>
    <v-dialog
        v-model="visible"
    >
        <v-card
            width="700"
            class="mx-auto"
        >
            <v-card-title>
                <v-btn
                    icon="mdi-close"
                    size="small"
                    variant="outlined" color="red"
                    @click="visible=false" 
                ></v-btn>

                {{ device.deviceName }} - JSON Object
                
                    <v-chip
                        variant="outlined"
                        color="error"
                        v-if="timer >= 10"
                    >
                        {{ timer }}s
                    </v-chip>
            </v-card-title>
            
            <v-card-subtitle>
                <v-chip variant="outlined">Topic</v-chip>
                {{ device.topic }}
            </v-card-subtitle>
            
            <v-card-text>
                <SshPre language="json">
                    {{ device.rawData }}
                </SshPre>
            </v-card-text>
            
            <v-card-actions>
                <v-chip variant="outlined">
                    angleX : {{ device.angleX.toFixed(3) }}
                </v-chip>
                <v-chip variant="outlined">
                    angleY : {{ device.angleY.toFixed(3) }}
                </v-chip>
                <v-chip variant="outlined">
                    angleZ : {{ device.angleZ.toFixed(3) }}
                </v-chip>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import SshPre from 'simple-syntax-highlighter'
    import 'simple-syntax-highlighter/dist/sshpre.css'

    export default {

        name: "dataViewer",
        
        data: () => ({

            visible: false
        }),

        props: {

            device: Object,
            timer: Number,
            dataVisible: Boolean
        },

        watch: {

            dataVisible: function (newD, oldD) {

                this.visible = newD
            }
        },

        components: { SshPre }
    }
</script>

<style>
</style>