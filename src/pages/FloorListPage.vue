<script>

import {mdiPlus} from '@mdi/js'

export default {
    name: "FloorListPage",

    props: {},

    data: function () {
        return {
            fab: false,
            mdiPlus,
            dialog: false,
            floorNameEdit: "",
        };
    },

    computed: {},

    watch: {
        '$route': 'fetchData'
    },

    created() {
        this.fetchData()
    },

    methods: {
        fetchData(id) {
            this.$store.dispatch('load_floor_list');
        }
    }

}
</script>

<template>
    <v-container>
        <h2>Stockwerke {{floorNameEdit}}</h2>
        <router-link class="text-h6 black--text"
                     v-for="floor in $store.state.floorList"
                     v-bind:key="floor.id"
                     v-bind:style="{textDecoration: 'none'}"
                     v-bind:to="'/floors/' + floor.id.toString()"
        >
            <v-card
                    class="pa-3 my-4 text-center"
            >

                {{floor.name}}
            </v-card>
        </router-link>

        <v-dialog v-model="dialog" scrollable max-width="300px">
            <template v-slot:activator="{ on, attrs }">
                <v-fab-transition>
                    <v-btn
                            class="mb-3 mr-3"
                            v-bind:style="{bottom:0, right:0}"
                            v-bind="attrs"
                            v-on="on"
                            color="primary"
                            contained
                            dark
                            absolute
                            right
                            fab
                    >
                        <v-icon>{{mdiPlus}}</v-icon>
                    </v-btn>
                </v-fab-transition>
            </template>
            <v-card>
                <v-card-title>Enter a floor name</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form>
                        <v-text-field
                                v-model="floorNameEdit"
                                label="Floor name"
                                required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue darken-1" text @click="() => {this.$store.dispatch('add_floor',floorNameEdit); dialog = false; floorNameEdit = ''}">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style>
</style>
