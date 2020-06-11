<script>
import HelloWorld from './HelloWorld.vue';

export default {
    name: "App",
    components: { HelloWorld },
    
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
    </div>
</template>

<style>
</style>
