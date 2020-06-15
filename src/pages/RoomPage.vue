<script>

import { mdiPencil } from '@mdi/js'

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
        }; 
    },
    
    computed:{
        floorSelectItems(){
            return this.$store.state.floorList.map( f => ({ text: f.name, value: f.id }) );
        },
        /*floorName(){
            let floors = this.$store.state.floorList.filter( f => f.id == this.$store.state.room.floor );
            return floors.length > 0 ? floors[0].name : "";
        }*/
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
                <v-btn icon v-on:click="edit = !edit">
                  <v-icon>{{mdiPencil}}</v-icon>
                </v-btn>
            </v-toolbar>
        </v-row>
        
        <template v-if="edit" >
            <v-row>
                <v-col lg="4">
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
                </v-col>
            </v-row>

        </template>
        <template v-else >
            <v-container>
                <v-row>
                    <v-col lg="3">Name</v-col>
                    <v-col>{{this.$store.state.room.name}}</v-col>
                </v-row>
                <v-row>
                    <v-col lg="3">Floor</v-col>
                    <v-col>{{this.$store.getters.floorName(this.$store.state.room.floor)}}</v-col>
                </v-row>
                <v-row>
                    <v-col lg="3">Last use</v-col>
                    <v-col>01.05.20 11:00</v-col>
                </v-row>
                <v-row>
                    <v-col lg="3">Added on</v-col>
                    <v-col>03.06.16</v-col>
                </v-row>
            </v-container>
        </template>
        
    </v-container>
</template>

<style>
</style>
