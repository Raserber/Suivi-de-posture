<template>
    <v-dialog
        v-model="visible"
    >
        <v-card min-width="600" class="mx-auto">
            <v-card-title>
                <v-btn
                    icon="mdi-close"
                    size="small"
                    variant="outlined" color="red"
                    @click="visible=false" 
                ></v-btn>

                {{ title }} - JSON Object
            </v-card-title>
            
            <v-card-subtitle>
                <v-chip variant="outlined">Topic</v-chip>
                {{ subtitle }}
            </v-card-subtitle>
            
            <v-card-text>
                <SshPre language="json">
                    {{ data }}
                </SshPre>
            </v-card-text>
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

            title: String,
            subtitle: String,
            data: Object,
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