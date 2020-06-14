<script>
import HelloWorld from './HelloWorld.vue';
import { VBtn } from 'vuetify/lib';

export default {
    name: "App",
    components: { HelloWorld, VBtn },
    
    props:{
    },
    
    data: function(){ 
        return {
        }; 
    },
    
    computed:{
    },
}
</script>

<template>
    <div>
        <hello-world></hello-world>
        <v-btn>Hello</v-btn>
    </div>
</template>

<style>
</style>
