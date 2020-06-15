<script>

import { mdiPencil } from '@mdi/js'

import FloorMap from '../components/FloorMap.vue';

export default {
    name: "RobotPage",
    components: { FloorMap },
    
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
    },

    watch: {
        '$route': 'fetchData'
    },

    created () {
        this.fetchData()
    },
    
    methods:{
        fetchData(id){
            let robotId = parseInt(this.$route.params.robot_id);
            
            this.$store.dispatch('load_robot', { robotId }).then( () => {
                this.name = this.$store.state.robot.name;
                this.floor = this.$store.state.robot.floor;
            });
            
            this.$store.dispatch('load_floor_list');
        },
        
        onSave(){
            let robot = {
                id: this.$store.state.robot.id,
                name: this.name,
                floor: this.floor,
            };
            this.$store.dispatch('update_robot', robot).then( () => {
                this.edit = false;
            });
        },
        onClear(){
            this.name = this.$store.state.robot.name;
            this.floor = this.$store.state.robot.floor;
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
                <v-toolbar-title>Robot {{this.$store.state.robot.name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon v-on:click="edit = !edit">
                  <v-icon>{{mdiPencil}}</v-icon>
                </v-btn>
            </v-toolbar>
        </v-row>
        
        <v-row>
            <v-col>
                
                <template v-if="edit" >
                    <v-row>
                        <v-col>
                            <v-form>
                                
                                <v-text-field
                                    v-model="name"
                                    label="Robot Name"
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
                            <v-col>{{this.$store.state.robot.name}}</v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="3">Floor</v-col>
                            <v-col>{{this.$store.getters.floorName(this.$store.state.robot.floor)}}</v-col>
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
                
            </v-col>
            <v-col>
                <div>Current floor map of this robot</div>
                <floor-map class="robot-page__map" ></floor-map>
            </v-col>
        </v-row>
        
    </v-container>
</template>

<style>
.robot-page__map{
    max-width: 300px;
    margin: 1em 2em;
}
</style>
