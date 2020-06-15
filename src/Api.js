
import { mockData } from './MockData.js'

let findById = function(arr, id){
    let r = arr.filter( x => x.id == id );
    return r.length > 0 ? r[0] : null;
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
        if( floorId >= this.data.robots.length || floorId < 0 ){
            return this.apiCall({ message: "robot not found", code: 404 }, true);
        }else{
            return this.apiCall(this.data.robots[robotId]);
        }
    }

}

export class Api{
    
}