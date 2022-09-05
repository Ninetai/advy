<template>
  <LineChart
      :chart-options="chartOptions"
      :chart-data="chartData"
      :height="height"
  />
</template>

<script>
import {Line as LineChart} from 'vue-chartjs/legacy'
import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement)

export default {
  name: 'InfluencerViewHour',
  components: {LineChart},
  props: {
    data: Object,
    height: {
      type: Number,
      default: 280
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: true,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            x: [{
              display: true,
            }],
            y: [{
              display: false,
              scaleLabel: {
                display: true,
              },
            }]
          }
        },
      },
      chartColors: ['#367bf2'],
    }
  },
  computed: {
    chartData() {
      return {
        labels: Object.keys(this.data),
        datasets: [
            {
                label: this.$gettext('ПРОСМОТРЫ'),
                data: Object.values(this.data),
                backgroundColor: this.chartColors[0],
                borderColor: this.chartColors[0],
                lineTension: 0.5,
                pointRadius: 5,
                pointHoverRadius: 6,
                pointHitRadius: 30,
                pointBorderWidth: 2,
            }
        ]
      }
    },
  }
}
</script>

<style scoped>

</style>
