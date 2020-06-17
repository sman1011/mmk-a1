<script>
    import {mdiPlus, mdiDelete, mdiCalendar, mdiPencil} from '@mdi/js'

    export default {
        name: "FloorPage",
        components: {},

        props: {},

        data() {
            return {
                mdiPlus,
                mdiCalendar,
                mdiPencil,
                mdiDelete,
                edit: false,
                name:""
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
                this.$store.dispatch('load_robot_list_for_floors', {floorId: parseInt(this.$route.params.floor_id)});
            },

            onDelete(){
                this.$store.dispatch('delete_floor', this.$store.state.floor).then( () => {
                    this.$router.go(-1);
                });
            },

            onSave(){
                let floor = {
                    id: this.$store.state.floor.id,
                    name: this.name,
                };
                this.$store.dispatch('update_floor', floor).then( () => {
                    this.edit = false;
                });
            },
            onClear(){
                this.name = this.$store.state.room.name;
            },
            onCancel(){
                this.onClear();
                this.edit = false;
            }
        }
    }
</script>

<template>
    <v-container>
        <v-row>
            <v-toolbar dense>
                <v-toolbar-title>Room {{this.$store.state.floor.name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                icon
                                v-on:click="onDelete()"
                                v-bind="attrs"
                                v-on="on"
                        >
                            <v-icon>{{mdiDelete}}</v-icon>
                        </v-btn>
                    </template>
                    <span>Delete room</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                icon
                                v-on:click="edit = !edit"
                                v-bind="attrs"
                                v-on="on"
                        >
                            <v-icon>{{mdiPencil}}</v-icon>
                        </v-btn>
                    </template>
                    <span>Edit room</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                icon
                                v-on:click="$router.push('/timetables')"
                                v-bind="attrs"
                                v-on="on"
                        >
                            <v-icon>{{mdiCalendar}}</v-icon>
                        </v-btn>
                    </template>
                    <span>Open Timetable</span>
                </v-tooltip>
            </v-toolbar>
        </v-row>
        <v-row>
            <template v-if="edit">
                <v-col lg="5">
                    <v-form>

                        <v-text-field
                                v-model="name"
                                label="Floor name"
                                required
                        ></v-text-field>

                        <v-btn color="success" v-on:click="onSave">Save</v-btn>
                        <v-btn color="error" v-on:click="onCancel">Cancel</v-btn>
                        <v-btn text v-bind:outlined="true" v-on:click="onClear">Reset Form</v-btn>

                    </v-form>
                </v-col>
            </template>
            <template v-else>
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
            </template>
        </v-row>
    </v-container>
</template>

<style>
</style>
