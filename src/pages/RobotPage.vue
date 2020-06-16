<script>

import { mdiPencil } from '@mdi/js'
import { mdiCalendar } from '@mdi/js'

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
            mode: "",
            mdiPencil,
            mdiCalendar,
        }; 
    },
    
    computed:{
        floorSelectItems(){
            return this.$store.state.floorList.map( f => ({ text: f.name, value: f.id }) );
        },
        floorName(){
            return this.$store.getters.floorName(this.$store.state.robot.floor);
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
                this.onClear();
            });
            
            this.$store.dispatch('load_floor_list');
        },
        
        onSave(){
            let robot = {
                id: this.$store.state.robot.id,
                name: this.name,
                floor: this.floor,
                currentMode: this.mode,
            };
            this.$store.dispatch('update_robot', robot).then( () => {
                this.edit = false;
            });
        },
        onClear(){
            this.name = this.$store.state.robot.name;
            this.floor = this.$store.state.robot.floor;
            this.mode = this.$store.state.robot.currentMode;
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
                    <span>Edit robot</span>
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
                            label="Robot Name"
                            required
                        ></v-text-field>
                        
                        <v-select
                            v-bind:items="floorSelectItems"
                            v-model="floor"
                            label="Floor"
                        >
                        </v-select>

                        <v-select
                            v-bind:items="this.$store.state.robot.availableModes"
                            v-model="mode"
                            label="Operation Mode"
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
                              <v-list-item-subtitle>Robot Name</v-list-item-subtitle>
                              <v-list-item-title>{{this.$store.state.robot.name}}</v-list-item-title>
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
                                <v-list-item-subtitle>Operation Mode</v-list-item-subtitle>
                                <v-list-item-title>{{mode}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>Vendor</v-list-item-subtitle>
                                <v-list-item-title>{{this.$store.state.robot.vendor}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>Model</v-list-item-subtitle>
                                <v-list-item-title>{{this.$store.state.robot.model}}</v-list-item-title>
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
