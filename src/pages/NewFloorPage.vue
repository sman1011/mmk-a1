<script>

export default {
    name: "NewFloorPage",
    components: { },
    
    props:{
    },
    
    data(){ 
        return {
            name: "",
        }; 
    },
    
    computed:{
    },

    watch: {
        '$route': 'onClear'
    },

    created () {
        this.onClear();
    },
    
    methods:{
        onSave(){
            let floor = {
                name: this.name,
            };
            this.$store.dispatch('add_new_floor', floor).then( () => {
                this.$router.push(`/floors/${this.$store.state.floor.id}`);
            });
        },
        onClear(){
            this.name = "";
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
                        label="Floor Name"
                        required
                    ></v-text-field>
                    
                    <v-btn color="success" v-on:click="onSave">Add Floor</v-btn>
                    <v-btn text v-bind:outlined="true" v-on:click="onClear" >Reset Form</v-btn>
                    
                </v-form>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
</style>
