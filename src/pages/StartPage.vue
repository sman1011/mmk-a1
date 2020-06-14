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
    <div>
        <h1>Cleaning Organizer</h1>
        <div class="d-flex flex-row justify-center flex-grow-1">
            <div class="d-flex flex-column flex-grow-1 ma-4 mt-9">
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
            </div>
            <div class="d-flex flex-row flex-grow-1">
                <div class="d-flex flex-column flex-grow-1">
                    <v-btn to="/floors" class="ma-4">robots and rooms</v-btn>
                    <v-btn to="/floors" class="ma-4">timetables</v-btn>
                </div>
                <div class="d-flex flex-column flex-grow-1">
                    <v-btn to="/floors" class="ma-4">templates</v-btn>
                    <v-btn to="/floors" class="ma-4">statistics</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>
