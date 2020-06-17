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
                snackbar: false
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
                if(this.name && this.floor) {
                    let robot = {
                        name: this.name,
                        floor: this.floor,
                    };
                    this.$store.dispatch('add_new_robot', robot).then(() => {
                        this.$router.go(-1);
                    });
                } else{
                    this.snackbar=true;
                }
            },
            onClear(){
                this.name = "";
                this.floor = this.$store.state.floor.id;
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
                    <v-btn color="error" v-on:click="$router.go(-1)">Cancel</v-btn>
                    <v-btn text v-bind:outlined="true" v-on:click="onClear" >Reset Form</v-btn>
                    
                </v-form>
                
            </v-col>
        </v-row>
            <!--<v-btn dark @click="snackbar = true">Open Snackbar</v-btn>-->
        <v-snackbar
                v-model="snackbar"
        >
            <span>Please enter a valid name.</span>
        </v-snackbar>
    </v-container>
</template>

<style>
</style>
