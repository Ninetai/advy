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
  name: 'CampaignStatChart',
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
      chartColors: ['rgb(253, 159, 0)', 'rgb(236, 64, 122)', 'rgb(59, 153, 213)'],
    }
  },
  computed: {
    chartData() {
      return {
        labels: Object.keys(Object.values(this.data)[0]),
        datasets: Object.entries(this.data).map((el, i) => {
          return {
            label: el[0] === 'conversions' ? this.$gettext('ПЕРЕХОДЫ') : (el[0] === 'spend' ? this.$gettext('РАСХОД') : this.$gettext('ОХВАТ')),
            data: Object.values(el[1]),
            backgroundColor: this.chartColors[i],
            borderColor: this.chartColors[i],
            lineTension: 0.5,
            pointRadius: 5,
            pointHoverRadius: 6,
            pointHitRadius: 30,
            pointBorderWidth: 2,
          }
        }),
      }
    },
  }
}
</script>

<style scoped>

</style>
