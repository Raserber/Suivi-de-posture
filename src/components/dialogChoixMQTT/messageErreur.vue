<template>
    <v-dialog 
        v-model="visible"
        :close-on-content-click="true"
        transition="dialog-bottom-transition"
    >
        <v-card
          color="error"
          prepend-icon="$error"
          title="Impossible de se connecter au serveur"
          width="500"
          class="mx-auto"
        >
            <template v-slot:append>
                <v-btn
                    icon="mdi-close"
                    variant="text"
                    color="$error"
                ></v-btn>
            </template>
            
            <v-card-text>
                La connexion au serveur n'a pas pu se faire, vérifiez que vous êtes bien connecter à {{ hostValue }}
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    
    export default {

        name: "messageErreur",
        
        props: {

            errorAlert: Boolean,
            hostValue: String
        },

        data: () => ({

            visible: false
        }),

        watch: {

            errorAlert(value) {

                this.visible = value
            }
        }
    }
</script>

<style>
</style>