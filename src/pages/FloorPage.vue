<script>
    import {mdiPlus} from '@mdi/js'

    export default {
        name: "FloorPage",
        components: {},

        props: {},

        data() {
            return {
                mdiPlus
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
                this.$store.dispatch('load_floor', {floorId: parseInt(this.$route.params.floor_id)});
                this.$store.dispatch('load_room_list', {floorId: parseInt(this.$route.params.floor_id)});
                this.$store.dispatch('load_robot_list', {floorId: parseInt(this.$route.params.floor_id)});
            }
        }
    }
</script>

<template>
    <v-container>
    <v-row>
            <v-col lg="5">
                <h4>Rooms in this Floor:</h4>
                <router-link class="text-h6 black--text"
                             v-for="room in $store.state.roomList"
                             v-bind:key="room.id"
                             v-bind:style="{textDecoration: 'none'}"
                             v-bind:to="'/rooms/' + room.id.toString()"
                >
                    <v-card
                            class="pa-3 my-4 text-center"
                    >

                        {{room.name}}
                    </v-card>
                </router-link>
                <h3 v-if="$store.state.roomList.length===0">No Rooms in this Floor</h3>
                <v-fab-transition>
                    <v-btn
                            v-bind:style="{float: 'right'}"
                            to="/rooms/new"
                            class="mb-3 mr-3"
                            color="primary"
                            dark
                            right
                            bottom
                            fab
                    >
                        <v-icon>{{mdiPlus}}</v-icon>
                    </v-btn>
                </v-fab-transition>
            </v-col>

            <v-col lg="5">
                <h4>Robots on this Floor:</h4>
                <router-link class="text-h6 black--text"
                             v-for="robot in $store.state.robotList"
                             v-bind:key="robot.id"
                             v-bind:style="{textDecoration: 'none'}"
                             v-bind:to="'/robots/' + robot.id.toString()"
                >
                    <v-card
                            class="pa-3 my-4 text-center"
                    >

                        {{robot.name}}
                    </v-card>
                </router-link>
                <h3 v-if="$store.state.robotList.length===0">No Robots on this Floor</h3>
                <v-fab-transition>
                    <v-btn
                            v-bind:style="{float: 'right'}"
                            to="/robots/new"
                            class="mb-3 mr-3"
                            color="primary"
                            dark
                            right
                            bottom
                            fab
                    >
                        <v-icon>{{mdiPlus}}</v-icon>
                    </v-btn>
                </v-fab-transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
</style>
