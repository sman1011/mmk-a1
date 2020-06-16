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
    
    getters: {
        floorName: (state) => (floorId) => {
            let floor = state.floorList.filter( f => f.id == floorId );
            return floor.length > 0 ? floor[0].name : "";
        }
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
        add_new_floor({ commit }, floor){
            return api.postFloor(floor).then( data => {
                commit('set_floor', data);
            });
        },
        add_new_room({ commit }, room){
            return api.postRoom(room).then( data => {
                commit('set_room', data);
            });
        },
        add_new_robot({ commit }, robot){
            return api.postRobot(robot).then( data => {
                commit('set_robot', data);
            });
        },

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

        load_full_room_list({ commit }){
            return api.getFullRoomList().then( data => {
                commit('set_room_list', data)
            });
        },

        load_robot_list({ commit }, { floorId }){
            return api.getRobotList(floorId).then( data => {
                commit('set_robot_list', data) 
            });
        },
        
        load_floor({ commit }, { floorId }){
            return api.getFloor(floorId).then( data => {
                commit('set_floor', data) 
            });
        },
        
        load_room({ commit }, { roomId }){
            return api.getRoom(roomId).then( data => {
                commit('set_room', data) 
            });
        },
        
        load_robot({ commit }, { robotId }){
            return api.getRobot(robotId).then( data => {
                commit('set_robot', data)
            });
        },

        update_room({ commit }, room){
            return api.patchRoom(room).then( data => {
                commit('set_room', data) 
            });
        },

        update_robot({ commit }, robot){
            return api.patchRobot(robot).then( data => {
                commit('set_robot', data)
            });
        },

    }
    
});
