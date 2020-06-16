<script>

export default {
    name: "NewRobotPage",
    components: { },
    
    props:{
    },
    
    data(){ 
        return {
            name: "",
            floor: 0,
        }; 
    },
    
    computed:{
        floorSelectItems(){
            return this.$store.state.floorList.map( f => ({ text: f.name, value: f.id }) );
        },
    },

    watch: {
        '$route': 'onClear'
    },

    created () {
        this.onClear();
    },
    
    methods:{
        fetchData(id){
            this.$store.dispatch('load_floor_list');
        },
        onSave(){
            let robot = {
                name: this.name,
                floor: this.floor,
            };
            this.$store.dispatch('add_new_robot', robot).then( () => {
                this.$router.push(`/robots/${this.$store.state.robot.id}`);
            });
        },
        onClear(){
            this.name = "";
            this.floor = "";
            this.fetchData();
        },
    }
}
</script>

<template>
    <v-container>
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
                    
                    <v-btn color="success" v-on:click="onSave">Add Robot</v-btn>
                    <v-btn text v-bind:outlined="true" v-on:click="onClear" >Reset Form</v-btn>
                    
                </v-form>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
</style>
