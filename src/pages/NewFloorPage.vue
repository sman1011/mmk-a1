<script>

export default {
    name: "NewFloorPage",
    components: { },
    
    props:{
    },
    
    data(){ 
        return {
            name: "",
            snackbar: false
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
            if(this.name) {
                let floor = {
                    name: this.name,
                };
                this.$store.dispatch('add_new_floor', floor).then(() => {
                    this.$router.go(-1);
                });
            } else{
                this.snackbar = true;
            }
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
                    <v-btn color="error" v-on:click="$router.go(-1)">Cancel</v-btn>
                    <v-btn text v-bind:outlined="true" v-on:click="onClear" >Reset Form</v-btn>
                    
                </v-form>
                
            </v-col>
        </v-row>
        <v-snackbar
                v-model="snackbar"
        >
            <span>Please enter a valid name.</span>
        </v-snackbar>
    </v-container>
</template>

<style>
</style>
