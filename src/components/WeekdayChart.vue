<script>
    import { Bar } from 'vue-chartjs'

    export default {
        data(){
            return {
                chartData: {
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    datasets: [
                        {
                            label: "Avg cleaning tasks per weekday",
                            backgroundColor: ["#003f5c", "#374c80", "#7a5195", "#bc5090", "#ef5675", "#ff764a", "#ffa600"],
                            data: [2.1, 1.3, 3.6, 1.2, 0.5, 0.1652, 0.2]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            };
        },
        extends: Bar,
        props: [],
        mounted () {
            this.renderChart(this.chartData, this.options)
        }
    }
</script>

<style>
</style>
