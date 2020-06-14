<script>

export default {
    name: "StartPage",
    components: {  },

    props:{
    },
    watch: {
        '$route': 'fetchData'
    },

    created () {
        this.fetchData()
    },

    methods:{
        fetchData(){
            this.$store.dispatch('load_full_room_list');
        }
    },

    data: () => ({
    }),

}
</script>

<template>
    <div id="left">
        <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
             <v-btn class="ma-2" v-bind="attrs" v-on="on">quick cleaning</v-btn>
            </template>
            <v-list>
                <v-list-item v-for="room in $store.state.roomList" :key="i" @click="() => {}">
                    <v-list-item-title>{{ room.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-btn to="/floors">robots and rooms</v-btn>
        <v-btn to="/floors">timetables</v-btn>
        <v-btn to="/floors">templates</v-btn>
        <v-btn to="/floors">statistics</v-btn>
    </div>
</template>

<style>
</style>
