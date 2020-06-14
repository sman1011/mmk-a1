<script>

export default {
    name: "FloorListPage",
    components: {  },
    
    props:{
    },
    
    data: function(){ 
        return {
        }; 
    },
    
    computed:{
    },
    
    watch: {
      '$route': 'fetchData'
    },

    created () {
      this.fetchData()
    },
    
    methods:{
        fetchData(id){
            this.$store.dispatch('load_floor_list');
        }
    }
    
}
</script>

<template>
    <div>
        <h2>Stockwerke</h2>
        <ul>
            <li
                v-for="floor in $store.state.floorList"
            >
                <router-link 
                    v-bind:to="'/floors/' + floor.id.toString()"
                >
                    {{floor.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style>
</style>
