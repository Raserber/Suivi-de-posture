<template>
    <v-dialog
        v-model="visible"
        persistent
    >
        <v-card>
            <v-card-title>
                <v-btn prevent variant="outlined" color="red" @click="$emit('closeClick')" icon><v-icon>mdi-close</v-icon></v-btn>

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
            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import SshPre from 'simple-syntax-highlighter'
    import 'simple-syntax-highlighter/dist/sshpre.css'

    export default {

        name: "dataViewer",
        
        data: function () {
            return {
                visible: false
            }
        },

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

        components: {
            SshPre
        }
    }
</script>

<style>
</style>