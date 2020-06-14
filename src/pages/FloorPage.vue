<script>

export default {
    name: "FloorPage",
    components: {  },
    
    props:{
    },
    
    data(){ 
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
            this.$store.dispatch('load_floor', {floorId: parseInt(this.$route.params.floor_id)});
            this.$store.dispatch('load_room_list', {floorId: parseInt(this.$route.params.floor_id)});
        }
    }
}
</script>

<template>
    <div>
        <h2>Stockwerk {{$store.state.floor.name}}</h2>
        <ul>
            <li
                v-for="room in $store.state.roomList"
            >
                <router-link 
                    v-bind:to="'/room/' + room.id.toString()"
                >
                    {{room.name}}
                </router-link>
            </li>
        </ul>
        
    </div>
</template>

<style>
</style>
