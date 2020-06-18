<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                        Today
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <span>&lt;</span>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <span>&gt;</span>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right>{{mdiMenuDown}}</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Day</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'week'">
                                <v-list-item-title>Week</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Month</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = '4day'">
                                <v-list-item-title>4 days</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
                <v-calendar
                        ref="calendar"
                        v-model="focus"
                        color="primary"
                        :events="events"
                        :event-color="getEventColor"
                        :event-ripple="false"
                        :type="type"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
                        @change="updateRange"
                        @mousedown:event="startDrag"
                        @mousedown:time="startTime"
                        @mousemove:time="mouseMove"
                        @mouseup:time="endDrag"
                        @mouseleave.native="cancelDrag"
                >
                    <template #event="{ event, timed, eventSummary }">
                        <div class="v-event-draggable" v-html="eventSummary()"/>
                        <div v-if="timed" class="v-event-drag-bottom" @mousedown.stop="extendBottom(event)"/>
                    </template>
                </v-calendar>
                <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
                    <v-card color="grey lighten-4" min-width="350px" flat>
                        <v-toolbar :color="selectedEvent.color" dark>
                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                            <v-spacer/>
                            <v-btn icon @click="selectedEdit = !selectedEdit">
                                <v-icon>{{mdiPencil}}</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-card-text>
                            <template v-if="selectedEdit">
                                <v-form >
                                    <v-text-field v-model="selectedEvent.name" label="Event Name" required/>
                                    <v-select v-bind:items="listRobots(0, 0)" v-model="changedEvent.robot" label="Robot"/>
                                    <v-select v-bind:items="listRooms(0, 0)" v-model="changedEvent.room"  label="Rooms"/>
                                    <v-btn class="success mx-0 mt-3" @click="save">Submit</v-btn>
                                </v-form>
                            </template>
                            <template v-else>
                                <span v-html="selectedEvent.details"></span>
                            </template>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn text color="secondary" @click="selectedOpen = false; selectedEdit = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
    </v-row>
</template>


<script>
    import {store} from '../Store.js'
    import {mdiPencil} from '@mdi/js'
    import {mdiMenuDown} from '@mdi/js'

    export default {
        watch: {
            '$route': 'fetchData',
            '$store.state.dateList': {
                deep: true,
                handler: function(newData, oldData){
                    this.updateEvents();
                }
            },

        },

        data: () => ({
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days',
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            selectedEdit: false,
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
            dragEvent: null,
            dragStart: null,
            createEvent: null,
            createStart: null,
            extendOriginal: null,
            mdiPencil,
            mdiMenuDown,
            changedEvent: {
                robot: -1,
                room: -1,
            },
            displayRange: { min: null, max: null, days: null }
        }),

        mounted() {
            this.$refs.calendar.checkChange()
        },
        created () {
            this.fetchData()
        },

        methods: {

            save() {
                let date = this.selectedEvent.origin
                date.name = this.selectedEvent.name
                date.room = this.changedEvent.room
                date.robot = this.changedEvent.robot

                // todo add logic of repeated events

                store.dispatch('update_date', {date})
                this.fetchData();
            },

            viewDay({date}) {
                this.focus = date
                this.type = 'day'
            },

            getEventColor(event) {
                return event.color
            },

            setToday() {
                this.focus = ''
            },

            prev() {
                this.$refs.calendar.prev()
            },

            next() {
                this.$refs.calendar.next()
            },

            fetchData() {
                store.dispatch('load_date_list');
                store.dispatch('load_full_robot_list');
                store.dispatch('load_full_room_list')
            },

            showEvent({nativeEvent, event}) {
                const open = () => {
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    setTimeout(() => this.selectedOpen = true, 10)
                }

                if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
                } else {
                    open()
                }

                nativeEvent.stopPropagation()
            },

            listRooms(floorId, roomId) {
                let rooms = []
                store.state.roomList.forEach((room) => {
                    /*if(room.floor !== floorId) {
                        return;
                    }*/
                    if (room.id === roomId) {
                        rooms.unshift({value: room.id, text: room.name})
                    } else {
                        rooms.push({value: room.id, text: room.name})
                    }
                })
                return rooms;
            },

            listRobots(floorId, robotId) {
                let robots = []
                store.state.robotList.forEach((robot) => {
                    /*if(robot.floor !== floorId) {
                        return
                    }*/
                    if (robot.id === robotId) {
                        robots.unshift({value: robot.id, text: robot.name})
                    } else {
                        robots.push({value: robot.id, text: robot.name})
                    }
                })
                return robots;
            },

            updateRange({start, end}) {
                this.displayRange.min = new Date(`${start.date}T00:00:00`)
                this.displayRange.max = new Date(`${end.date}T23:59:59`)
                this.displayRange.days = (this.displayRange.max.getTime() - this.displayRange.min.getTime()) / 86400000;
                this.updateEvents();
            },

            updateEvents() {
                if( this.displayRange.min === null || this.displayRange.max === null || this.displayRange.days === null ){
                    return;
                }
                const min = this.displayRange.min;
                const max = this.displayRange.max;
                const days = this.displayRange.days;

                let events = [];

                store.state.dateList.forEach((date) => {
                    let begin = new Date(`${date.startDate}T${date.begin}`)
                    let stop = undefined;
                    if (begin.getTime() > max.getTime()) {
                        return;
                    }

                    if (date.end !== undefined) {
                        stop = new Date(`${date.endDate}T${date.end}`)
                        if (date.end !== null && stop.getTime() < min.getTime()) {
                            return;
                        }
                    }


                    let robot = this.listRobots(date.robot)[0];
                    robot = robot !== undefined ? robot : { value: "", text: "" };
                    let room = this.listRooms(date.room)[0];
                    room = room !== undefined ? room : { value: "", text: "" };
                    let details = `
                                     <label>room: </label><a href="#/rooms/${room.value}">${room.text}</a>
                                     <br/>
                                     <label>robot: </label><a href="#/robots/${robot.value}">${robot.text}</a>
                                 `
                    switch (date.repeat) {
                        case "daily":
                            let sDays = days;
                            if (stop !== undefined) {
                                if (stop.getTime() < max.getTime()) {
                                    sDays = (begin.getTime() - stop.getTime()) / 86400000;
                                }
                            }


                            for (let i = 0; i <= sDays; i++) {
                                let d = new Date();
                                d.setDate(min.getDate() + i); /*TODO fix timezone*/

                                events.push({
                                    name: date.name,
                                    start: new Date(`${d.toISOString().split('T')[0]}T${date.begin}`).getTime(),
                                    end: new Date(`${d.toISOString().split('T')[0]}T${date.end}`).getTime(),
				    timed: true,
                                    color: date.color,
                                    details: details,
                                    origin: date
                                })
                            }
                            break;
                        case "weekly":
                            let sWeek = days / 7;
                            if (stop !== undefined) {
                                if (stop.getTime() < max.getTime()) {
                                    sWeek = (begin.getTime() - stop.getTime()) / 86400000 / 7;
                                }
                            }
                            for (let i = 0; i <= sWeek; i++) {
                                let d = new Date();
                                d.setDate(min.getDate() + (i * 7) + 1); // +1 to fix time zone

                                events.push({
                                    name: date.name,
                                    start: new Date(`${d.toISOString().split('T')[0]}T${date.begin}`).getTime(),
                                    end: new Date(`${d.toISOString().split('T')[0]}T${date.end}`).getTime(),
				    timed: true,
                                    color: date.color,
                                    details: details,
                                    origin: date
                                })
                            }
                            break;
                        default:
                            events.push({
                                name: date.name,
                                start: new Date(`${date.startDate}T${date.begin}`).getTime(),
                                end: new Date(`${date.startDate}T${date.end}`).getTime(),
                                color: date.color,
                                details: details,
				timed: true,
                                origin: date
                            })
                    }

                })

                this.events = events
            },

            rnd(a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },

            startDrag({event, timed}) {
                if (event && timed) {
                    this.dragEvent = event
                    this.dragTime = null
                    this.extendOriginal = null
                }
            },

            startTime(tms) {
                const mouse = this.toTime(tms)

                if (this.dragEvent && this.dragTime === null) {
                    const start = this.dragEvent.start

                    this.dragTime = mouse - start
                } else {
                    let details = `<label>room: </label><br/><label>robot: </label>`
                    this.createStart = this.roundTime(mouse)
                    let dd = new Date(this.createStart)
                    let hours = dd.getHours()
                    hours = hours<10? `0${hours}` : hours;
                    let minutes = dd.getMinutes()
                    minutes = minutes<10? `0${minutes}` : minutes
                    let date = {
                        name: `Event #${this.events.length}`,
                        color: this.rndElement(this.colors),
                        startDate: dd.toISOString().split('T')[0],
                        begin: `${hours}:${minutes}`,
                        end: `${hours}:${minutes}`,
                    }

                    store.dispatch('add_new_date',{date}).then(()=>{
                        date.id = store.state.date.id;
                    })
                    this.createEvent = {
                        name: date.name,
                        color: date.color,
                        start: this.createStart,
                        end: this.createStart,
                        details: details,
                        origin: date,
                        timed: true
                    }

                    this.events.push(this.createEvent)
                }
            },

            extendBottom(event) {
                this.createEvent = event
                this.createStart = event.start
                this.extendOriginal = event.end
            },

	    convertToTime(date) {
	    	let hours = date.getHours()
		let minutes = date.getMinutes()
                hours = hours<10? `0${hours}` : hours;
                minutes = minutes<10? `0${minutes}` : minutes;
		return `${hours}:${minutes}`
	    },

            mouseMove(tms) {
                const mouse = this.toTime(tms)

                if (this.dragEvent && this.dragTime !== null) {
                    const start = this.dragEvent.start
                    const end = this.dragEvent.end
                    const duration = end - start
                    const newStartTime = mouse - this.dragTime
                    const newStart = this.roundTime(newStartTime)
                    const newEnd = newStart + duration

                    this.dragEvent.start = newStart
                    this.dragEvent.end = newEnd
                } else if (this.createEvent && this.createStart !== null) {
                    const mouseRounded = this.roundTime(mouse, false)
                    const min = Math.min(mouseRounded, this.createStart)
                    const max = Math.max(mouseRounded, this.createStart)

                    this.createEvent.start = min
                    this.createEvent.end = max
                }
            },

            endDrag() {
                let date = null;

                if (this.dragEvent && this.dragTime !== null) {
                    date = this.dragEvent.origin
        		    date.begin = this.convertToTime(new Date(this.dragEvent.start))
        		    date.end = this.convertToTime(new Date(this.dragEvent.end))
                } else if (this.createEvent && this.createStart !== null) {
                    date = this.createEvent.origin
        		    date.begin = this.convertToTime(new Date(this.createEvent.start))
        		    date.end = this.convertToTime(new Date(this.createEvent.end))
                    
                }else{
                    this.dragTime = null
                    this.dragEvent = null
                    this.createEvent = null
                    this.createStart = null
                    this.extendOriginal = null
                    return;
                }
                
                store.dispatch('update_date', {date}).then( () => {
                    this.dragTime = null
                    this.dragEvent = null
                    this.createEvent = null
                    this.createStart = null
                    this.extendOriginal = null
                    this.fetchData();
                })
            },

            cancelDrag() {
                if (this.createEvent) {
                    if (this.extendOriginal) {
                        this.createEvent.end = this.extendOriginal
                    } else {
                        const i = this.events.indexOf(this.createEvent)
                        if (i !== -1) {
                            this.events.splice(i, 1)
                        }
                    }
                }

                this.createEvent = null
                this.createStart = null
                this.dragTime = null
                this.dragEvent = null
                this.fetchData();
            },

            roundTime(time, down = true) {
                const roundTo = 15 // minutes
                const roundDownTime = roundTo * 60 * 1000

                return down
                    ? time - time % roundDownTime
                    : time + (roundDownTime - (time % roundDownTime))
            },

            toTime(tms) {
                return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
            },

            rndElement(arr) {
                return arr[this.rnd(0, arr.length - 1)]
            },
        },
    }
</script>

<style scoped lang="scss">
    .v-event-draggable {
        user-select: none;
        -webkit-user-select: none;
        padding-left: 6px;
    }

    .v-event-drag-bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 4px;
        height: 4px;
        cursor: ns-resize;

        &::after {
            display: none;
            position: absolute;
            left: 50%;
            height: 4px;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            width: 16px;
            margin-left: -8px;
            opacity: 0.8;
            content: '';
        }


        &:hover::after {
            display: block;
        }
    }
</style>
