<script>
import { VBtn } from 'vuetify/lib';

export default {
    name: "App",
    components: { VBtn },
    
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
    <v-app>
        <div>
            <router-view></router-view>
        </div>
    </v-app>
</template>

<style>
</style>
