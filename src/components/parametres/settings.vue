<template>
    <v-dialog
        v-model="visible"
    >
        <v-card
            width="500"
            class="mx-auto"
        >
            <v-card-title>
                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="visible = false"
                ></v-btn>

                <v-btn
                    icon="mdi-cog"
                    variant="tonal"
                    :ripple="false"
                    color="purple-darken-3"
                ></v-btn>
                
                Paramètres
            </v-card-title>

            <v-card-text>

                <v-text-field
                    label="Temps avant déclenchement"
                    prepend-inner-icon="mdi-counter"
                    variant="solo"
                    suffix="secondes"
                    width="280"
                    :rules="[rules.textField]"
                    v-model="store.timerPosition"
                ></v-text-field>

                <v-switch
                    inset
                    label="Déclenchement position assise"
                    prepend-icon="mdi-seat-passenger"
                    color="secondary"
                    v-model="store.declenchementPosAssise"
                >

                </v-switch>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    color="primary"
                    prepend-icon="mdi-content-save"
                >
                    Sauvegarder
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { generalStore } from '../../store';

    export default {

        name: "settings",

        props: {
            isVisible: Boolean
        },

        data: () => ({
            visible: false,
            rules: {
                textField: value => (`${value}`.match(/^[0-9]+$/) ? true : 'Le temps doit être un nombre entier')
            }
        }),

        watch: {

            isVisible(value) {

                this.visible = value
            }
        },

        setup() {

            const store = generalStore()

            return  {
                store
            }
        }
    }
</script>

<style>
</style>