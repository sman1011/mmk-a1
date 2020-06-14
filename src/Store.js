import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { ApiMock } from './Api.js'

let api = new ApiMock();

export { store };

let store = new Vuex.Store({
    state: {
        floorList: [],
        roomList: [],
        robotList:[],
        
        floor: {},
        room: {},
        robot: {},
    },
    mutations: {
        set_floor_list(state, data){
            state.floorList = data;
        },
        set_room_list(state, data){
            state.roomList = data;
        },
        set_robot_list(state, data){
            state.robotList = data;
        },
        
        set_floor(state, data){
            state.floor = data;
        },
        set_room(state, data){
            state.room = data;
        },
        set_robot(state, data){
            state.robot = data;
        },
    },
    
    actions: {
        load_floor_list({ commit }){
            return api.getFloorList().then( data => {
                commit('set_floor_list', data) 
            });
        },

        load_room_list({ commit }, { floorId }){
            return api.getRoomList(floorId).then( data => {
                commit('set_room_list', data) 
            });
        },

        load_robot_list({ commit }){
            return api.getRobotList().then( data => {
                commit('set_robot_list', data) 
            });
        },
        
        load_floor({ commit }, { floorId }){
            return api.getFloor(floorId).then( data => {
                commit('set_floor', data) 
            });
        },
        
    }
    
});
