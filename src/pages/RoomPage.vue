<script>

import { mdiPencil, mdiCalendar, mdiDelete } from '@mdi/js'

export default {
    name: "RoomPage",
    components: {  },
    
    props:{
    },
    
    data(){ 
        return {
            name: "",
            floor: 0,
            edit: false,
            mdiPencil,
            mdiCalendar,
            mdiDelete
        }; 
    },
    
    computed:{
        floorSelectItems(){
            return this.$store.state.floorList.map( f => ({ text: f.name, value: f.id }) );
        },
        floorName(){
            return this.$store.getters.floorName(this.$store.state.room.floor);
        },
    },

    watch: {
        '$route': 'fetchData'
    },

    created () {
        this.fetchData()
    },
    
    methods:{
        fetchData(id){
            let roomId = parseInt(this.$route.params.room_id);
            
            this.$store.dispatch('load_room', { roomId }).then( () => {
                this.name = this.$store.state.room.name;
                this.floor = this.$store.state.room.floor;
            });
            
            if( this.$store.state.floorList.length == 0 ){
                this.$store.dispatch('load_floor_list');
            }
        },

        onDelete(){
            this.$store.dispatch('delete_room', this.$store.state.room).then( () => {
                this.$router.go(-1);
            });
        },

        onSave(){
            let room = {
                id: this.$store.state.room.id,
                name: this.name,
                floor: this.floor,
            };
            this.$store.dispatch('update_room', room).then( () => {
                this.edit = false;
            });
        },
        onClear(){
            this.name = this.$store.state.room.name;
            this.floor = this.$store.state.room.floor;
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
            <v-toolbar dense >
                <v-toolbar-title>Room {{this.$store.state.room.name}}</v-toolbar-title>
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
            <v-col lg="4">
                <template v-if="edit" >
                    <v-form>
                        
                        <v-text-field
                            v-model="name"
                            label="Room Name"
                            required
                        ></v-text-field>
                        
                        <v-select
                            v-bind:items="floorSelectItems"
                            v-model="floor"
                            label="Floor"
                        >
                        </v-select>
                        
                        <v-btn color="success" v-on:click="onSave">Save</v-btn>
                        <v-btn color="error" v-on:click="onCancel">Cancel</v-btn>
                        <v-btn text v-bind:outlined="true" v-on:click="onClear" >Reset Form</v-btn>
                        
                    </v-form>
                </template>
                
                <template v-else >

                    <v-list two-line>
                        <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle>Room Name</v-list-item-subtitle>
                              <v-list-item-title>{{this.$store.state.room.name}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>Floor</v-list-item-subtitle>
                                <v-list-item-title>{{floorName}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>Last use</v-list-item-subtitle>
                                <v-list-item-title>01.05.20 11:00</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>Added on</v-list-item-subtitle>
                                <v-list-item-title>03.06.16</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    
                </template>
                
            </v-col>
        </v-row>
        
    </v-container>
</template>

<style>
</style>
