
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

    getRobotList(floorId){
        // GET /robots
        let robots=[];
        if (floorId || floorId===0){
            robots = this.data.robots.filter( r => (r.floor === floorId) ).map( r => ({ id: r.id, name: r.name }) );
        } else{
            robots = this.data.robots.map( r => ({ id: r.id, name: r.name }) );

        }
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

    patchFloor(floor){
        // PATCH /floors/:id
        let oldFloor = findById(this.data.floors, floor.id);
        if( oldFloor === null ){
            return this.apiCall({ message: "floor not found", code: 404 }, true);
        }else{
            let newFloor = Object.assign(oldFloor, floor);
            return this.apiCall(newFloor);
        }
    }

    deleteRobot(robot){
        this.data.robots =  this.data.robots.filter( x => x.id !== robot.id );
        return this.apiCall(this.data.robots);
    }

    deleteRoom(room){
        this.data.rooms =  this.data.rooms.filter( x => x.id !== room.id );
        return this.apiCall(this.data.rooms);
    }

    deleteFloor(floor){
        this.data.floors =  this.data.floors.filter( x => x.id !== floor.id );
        return this.apiCall(this.data.floors);
    }

    getDateList(){
        // GET /date
        let dates = this.data.dates.map(d => ({
            id: d.id,
            name: d.name,
            startDate: d.startDate,
            endDate: d.endDate,
            end: d.end,
            room: d.room,
            robot: d.robot,
            begin: d.begin,
            repeat: d.repeat,
            color: d.color,
        }));
        return this.apiCall(dates)
    }

    getDate(dateId){
        // GET /date/:dateId
        let date = this.data.dates.filter(d => d.id === dateId).map(d => ({
            id: d.id,
            name: d.name,
            startDate: d.startDate,
            endDate: d.endDate,
            end: d.end,
            room: d.room,
            robot: d.robot,
            begin: d.begin,
            repeat: d.repeat,
            color: d.color,
        }));
        return this.apiCall(date)
    }

}

export class Api{

}
