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
        dateList: [],
        
        floor: {},
        room: {},
        robot: {},
        date: {},
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
        set_date_list(state, data){
            state.dateList = data;
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
        set_date(state, data){
            state.date = data;
        }
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

        load_full_robot_list({ commit }){
            return api.getFullRobotList().then( data => {
                commit('set_robot_list', data) 
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

        update_floor({ commit }, floor){
            return api.patchFloor(floor).then( data => {
                commit('set_floor', data)
            });
        },

        delete_robot({ commit }, robot){
            return api.deleteRobot(robot).then( data => {
                commit('set_robot_list', data)
            });
        },

        delete_room({ commit }, room){
            return api.deleteRoom(room).then( data => {
                commit('set_room_list', data)
            });
        },

        delete_floor({ commit }, floor){
            return api.deleteFloor(floor).then( data => {
                commit('set_floor_list', data)
	    })
	},

        load_date_list({ commit }) {
            return api.getDateList().then(data => {
                commit('set_date_list', data)
            });
        },

        load_date({ commit }, { dateId }) {
            return api.getDate(dateId).then(data => {
                commit('set_date', data)
            });
        },

        update_date({ commit }, date){
            return api.putDate(date).then( data => {
                commit('set_date', date)
            });
        },

        add_new_date({ commit }, robot){
            return api.postDate(robot).then( data => {
                commit('set_date', data);
            });
        },

    }
    
});
