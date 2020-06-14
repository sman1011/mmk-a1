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
                                <v-icon right>mdi-menu-down</v-icon>
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
                        @load="updateRange"
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
                <v-menu
                        v-model="selectedOpen"
                        :close-on-content-click="false"
                        :activator="selectedElement"
                        offset-x
                >
                    <v-card
                            color="grey lighten-4"
                            min-width="350px"
                            flat
                    >
                        <v-toolbar
                                :color="selectedEvent.color"
                                dark
                        >
                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <span v-html="selectedEvent.details"></span>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                    text
                                    color="secondary"
                                    @click="selectedOpen = false"
                            >
                                Cancel
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
    </v-row>
</template>


<script>
    import { store } from '../Store.js'

    export default {
        watch: {
            '$route': 'fetchData'
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
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
            dragEvent: null,
            dragStart: null,
            createEvent: null,
            createStart: null,
            extendOriginal: null,
        }),

        mounted() {
            this.$refs.calendar.checkChange()
        },

        methods: {
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

            updateRange({start, end}) {
                this.fetchData()
                const min = new Date(`${start.date}T00:00:00`)
                const max = new Date(`${end.date}T23:59:59`)
                const days = (max.getTime() - min.getTime()) / 86400000;

                let events = [];
                store.state.dateList.forEach((date) => {
                    let begin = new Date(`${date.startDate}T${date.begin}`)
                    let stop = undefined;
                    if(begin.getTime() > max.getTime()) {
                        return;
                    }

                    if(date.end !== undefined) {
                        stop = new Date(`${date.endDate}T${date.end}`)
                        if (date.end !== null && stop.getTime() < min.getTime()) {
                            return;
                        }
                    }

                    switch (date.repeat) {
                        case "daily":
                            let sDays = days;
                            if(stop !== undefined){
                                if(stop.getTime() < max.getTime()) {
                                    sDays = (begin.getTime() - stop.getTime()) / 86400000;
                                }
                            }
                            for(let i = 0; i <= sDays; i++) {
                                let d = new Date();
                                d.setDate(min.getDate() + i + 1); // +1 to fix time zone

                                events.push({
                                    name: date.name,
                                    start: `${d.toISOString().split('T')[0]}T${date.begin}`,
                                    end: `${d.toISOString().split('T')[0]}T${date.end}`,
                                    color: date.color,
                                    details: `Room: ${date.room} - Robot: ${date.robot}`
                                })
                            }
                            break;
                        case "weekly":
                            let sWeek = days / 7;
                            if(stop !== undefined){
                                if(stop.getTime() < max.getTime()) {
                                    sWeek = (begin.getTime() - stop.getTime()) / 86400000 / 7;
                                }
                            }
                            for(let i = 0; i <= sWeek; i++) {
                                let d = new Date();
                                d.setDate(min.getDate() + (i * 7) + 1); // +1 to fix time zone

                                events.push({
                                    name: date.name,
                                    start: `${d.toISOString().split('T')[0]}T${date.begin}`,
                                    end: `${d.toISOString().split('T')[0]}T${date.end}`,
                                    color: date.color,
                                    details: `Room: ${date.room} - Robot: ${date.robot}`
                                })
                            }
                            break;
                        default:
                            events.push({
                                name: date.name,
                                start: `${date.startDate}T${date.begin}`,
                                end: `${date.startDate}T${date.end}`,
                                color: date.color,
                                details: `Room: ${date.room} - Robot: ${date.robot}`
                            })
                    }

                })

                console.log(events)
                this.events = events
            },

            rnd(a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },

            startDrag ({ event, timed }) {
                if (event && timed) {
                    this.dragEvent = event
                    this.dragTime = null
                    this.extendOriginal = null
                }
            },

            startTime (tms) {
                const mouse = this.toTime(tms)

                if (this.dragEvent && this.dragTime === null) {
                    const start = this.dragEvent.start

                    this.dragTime = mouse - start
                } else {
                    this.createStart = this.roundTime(mouse)
                    this.createEvent = {
                        name: `Event #${this.events.length}`,
                        color: this.rndElement(this.colors),
                        start: this.createStart,
                        end: this.createStart,
                        timed: true,
                    }

                    this.events.push(this.createEvent)
                }
            },

            extendBottom (event) {
                this.createEvent = event
                this.createStart = event.start
                this.extendOriginal = event.end
            },

            mouseMove (tms) {
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

            endDrag () {
                this.dragTime = null
                this.dragEvent = null
                this.createEvent = null
                this.createStart = null
                this.extendOriginal = null
            },

            cancelDrag () {
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
            },

            roundTime (time, down = true) {
                const roundTo = 15 // minutes
                const roundDownTime = roundTo * 60 * 1000

                return down
                    ? time - time % roundDownTime
                    : time + (roundDownTime - (time % roundDownTime))
            },

            toTime (tms) {
                return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
            },

            rndElement (arr) {
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
