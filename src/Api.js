
import { mockData } from './MockData.js'

let findById = function(arr, id){
    let r = arr.filter( x => x.id == id );
    return r.length > 0 ? r[0] : null;
}

let findNextId = function(arr,){
    let r = arr.map( x => x.id );
    return r.length > 0 ? Math.max(...r) + 1 : 0;
}

export class ApiMock{
    
    constructor(){
        this.data = mockData;
    }
    
    apiCall(data, isError=false){
        // simulate delay from api call
        return new Promise( (resolve, reject) => {
            let func = isError ? reject : resolve;
            setTimeout( () => func(Object.assign(data)) , 100);
        });
    }

    postFloor(floors){
        // POST /floors
        let id = findNextId(this.data.floors);
        let newFloor = Object.assign(floors, {id});
        this.data.floors.push(newFloor);
        return this.apiCall(newFloor);
    }
    
    postRoom(room){
        // POST /rooms
        let id = findNextId(this.data.rooms);
        let newRoom = Object.assign(room, {id});
        this.data.rooms.push(newRoom);
        return this.apiCall(newRoom);
    }
    
    postRobot(robot){
        // POST /robots
        let id = findNextId(this.data.robots);
        let newRobot = Object.assign(robot, {id});
        this.data.robots.push(newRobot);
        return this.apiCall(newRobot);
    }
    
    getFloorList(){
        // GET /floors
        let floors = this.data.floors.map( (f) => ({ id: f.id, name: f.name }) );
        return this.apiCall(floors);
    }

    getFullRoomList(){
        // GET /rooms
        let rooms = this.data.rooms.map( (f) => ({ id: f.id, name: f.name }) );
        return this.apiCall(rooms);
    }

    getFloor(floorId){
        // GET /floors/:id
        let floor = findById(this.data.floors, floorId);
        if( floor === null ){
            return this.apiCall({ message: "floor not found", code: 404 }, true);
        }else{
            return this.apiCall(floor);
        }
    }
    
    getRoomList(floorId){
        // GET /loor/:floorId/rooms
        let rooms = this.data.rooms.filter( r => (r.floor === floorId) ).map( r => ({ id: r.id, name: r.name }) );
        return this.apiCall(rooms);
    }

    getRoom(roomId){
        // GET /rooms/:id
        let room = findById(this.data.rooms, roomId);
        if( room === null ){
            return this.apiCall({ message: "room not found", code: 404 }, true);
        }else{
            return this.apiCall(room);
        }
    }

    getRobotList(){
        // GET /robots
        let robots = this.data.robots.map( r => ({ id: r.id, name: r.name }) );
        return this.apiCall(robots);
    }
    
    getRobot(robotId){
        // GET /robots/:id
        let robot = findById(this.data.robots, robotId);
        if( robot === null ){
            return this.apiCall({ message: "robot not found", code: 404 }, true);
        }else{
            return this.apiCall(robot);
        }
    }
    
    patchRoom(room){
        // PATCH /rooms/:id
        let oldRoom = findById(this.data.rooms, room.id);
        if( oldRoom === null ){
            return this.apiCall({ message: "room not found", code: 404 }, true);
        }else{
            let newRoom = Object.assign(oldRoom, room);
            return this.apiCall(newRoom);
        }
    }

    addFloor(floorName){
        let newFloor = {
            id: this.data.rooms.length,
            name: floorName
        };
        return this.apiCall(newFloor);
    }
  
    patchRobot(robot){
        // PATCH /robots/:id
        let oldRobot = findById(this.data.robots, robot.id);
        if( oldRobot === null ){
            return this.apiCall({ message: "robot not found", code: 404 }, true);
        }else{
            let newRobot = Object.assign(oldRobot, robot);
            return this.apiCall(newRobot);
        }
    }
}

export class Api{
    
}