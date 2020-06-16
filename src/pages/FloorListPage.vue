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
        <h3 v-if="$store.state.floorList===0">There are no Floors yet.</h3>
        <v-fab-transition>
            <v-btn
                    to="/floors/new"
                    class="mb-3 mr-3"
                    v-bind:style="{bottom:0, right:0}"
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
    </v-container>
</template>

<style>
</style>
