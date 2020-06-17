<script>
    import RobotChart from '../components/RobotChart.vue';
    import WeekdayChart from '../components/WeekdayChart.vue';

    export default {
        name: "StatisticsPage",
        components: {RobotChart, WeekdayChart},
        data() {
            return {
                myStyles: {
                    height: "40vh",
                    position: 'relative'
                }
            };
        }
    }
</script>

<template>
    <div>
        <v-row>
            <v-col lg="5">
                <RobotChart :styles="myStyles"/>
            </v-col>
            <v-col lg="5">
                <WeekdayChart :styles="myStyles"/>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>

</style>