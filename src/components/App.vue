<script>

import { mdiArrowLeft } from '@mdi/js'

export default {
    name: "App",
    components: { },
    
    props:{
    },
    
    data: function(){ 
        return {
            pages: [
                { name: "Start Page",        path: "/" },
                { name: "Robots and Rooms",  path: "/floors" },
                { name: "Timetables",        path: "/timetables" },
                { name: "Templates",         path: "/templates" },
                { name: "Statistics",        path: "/statistics" },
            ],
            
            mdiArrowLeft
        }; 
    },
    
    computed:{
    },
    
    methods: {
        onNavBack(){
            this.$router.go(-1);
        }
    },
}
</script>

<template>
    <v-app>
        
        <v-navigation-drawer app permanent>
            <div class="pa-4">
                <h1>Cleaning Organizer</h1>
            </div>
            
            <v-divider></v-divider>
            
            <v-list dense nav > 
                <v-list-item 
                    v-for="(page, idx) in pages"  
                    v-bind:key="idx"
                    link
                    v-bind:to="page.path"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{page.name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
            
        </v-navigation-drawer>

        <v-app-bar app>
            <v-btn icon v-on:click="onNavBack">
                <v-icon>{{mdiArrowLeft}}</v-icon>
            </v-btn>
            
            <v-toolbar-title></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
        
    </v-app>
</template>

<style>
</style>
