<script>
    import { Bar } from 'vue-chartjs'

    export default {
        data(){
            return {
                chartData: {
                    labels: ["Robie Robot", "Määh", "Meddie Robot", "Rocky Wisch", "Braava Wisch", "Xi", "Meddie Wisch"],
                    datasets: [
                        {
                            label: "Summed hours of operation per Robot",
                            backgroundColor: ["#003f5c", "#374c80", "#7a5195", "#bc5090", "#ef5675", "#ff764a", "#ffa600"],
                            data: [321, 82, 63, 132, 102, 240, 21]
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
