<script>

export default {
    name: "NewRoomPage",
    components: {  },
    
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
            let room = {
                name: this.name,
                floor: this.floor,
            };
            this.$store.dispatch('add_new_room', room).then( () => {
                this.$router.go(-1);
            });
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
                    
                    <v-btn color="success" v-on:click="onSave">Add Room</v-btn>
                    <v-btn text v-bind:outlined="true" v-on:click="onClear" >Reset Form</v-btn>
                    
                </v-form>
            </v-col>
        </v-row>
        
    </v-container>
</template>

<style>
</style>
