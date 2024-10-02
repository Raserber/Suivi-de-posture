<template>
    <v-dialog
        v-model="visible"
    >
        <v-card
            width="700"
            min-height="380"
            max-height="400"
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
                <v-chip variant="outlined">topic</v-chip>
                {{ device.topic }}
            </v-card-subtitle>
            
            <v-card-text>
                <vue-json-pretty
                    :data="pause ? rawDataPause : device.rawData"
                    show-line
                    virtual
                    :height="200"
                ></vue-json-pretty>
            </v-card-text>
            
            <v-card-actions>
                <small 
                    v-if="!device.isValid || !device.isValidOptional"
                    :class="`text-${dataValidity.color} ` + 'text-caption font-italic'"
                >
                    {{ dataValidity.phrase }}
                </small>
                
                <v-btn
                    v-else
                    :icon="pause ? 'mdi-play-speed' : 'mdi-speedometer'"
                    variant="outlined"
                    rounded
                    color="secondary"
                    v-model="pause"
                    @click="pause = !pause"
                ></v-btn>
                <v-spacer></v-spacer>
                <v-chip variant="outlined">
                    angleX : {{ pause ? angleXPause.toFixed(3) : device.angleX.toFixed(3) }}
                </v-chip>
                <v-chip variant="outlined">
                    angleY : {{ pause ? angleYPause.toFixed(3) : device.angleY.toFixed(3) }}
                </v-chip>
                <v-chip variant="outlined">
                    angleZ : {{ pause ? angleZPause.toFixed(3) : device.angleZ.toFixed(3) }}
                </v-chip>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import VueJsonPretty from 'vue-json-pretty';
    import 'vue-json-pretty/lib/styles.css';

    export default {

        name: "dataViewer",
        
        data: () => ({

            visible: false,
            pause: false,
            rawDataPause: {},
            angleXPause: 0,
            angleYPause: 0,
            angleZPause: 0,
        }),

        props: {

            device: Object,
            timer: Number,
            dataVisible: Boolean,
            dataValidity: Object
        },

        watch: {

            dataVisible: function (newD, oldD) {

                this.visible = newD
            },

            pause: function () {

                this.rawDataPause = this.device.rawData
                this.angleXPause = this.device.angleX
                this.angleYPause = this.device.angleY
                this.angleZPause = this.device.angleZ
            }
        },

        components: { VueJsonPretty }
    }
</script>

<style scoped>

    .vjs-tree {
        user-select: text;
    }
</style>