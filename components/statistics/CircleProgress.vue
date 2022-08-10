<template>
  <div>
    <client-only>
      <apexchart
        type="radialBar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    circleProgress: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      series: this.circleProgress.series,
      chartOptions: {
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px",
              },
              value: {
                fontSize: "16px",
              },
              total: {
                show: true,
                label: "Total",
                formatter: function (w) {
                  return "100%";
                },
              },
            },
          },
        },
        labels: this.circleProgress.labels,
      },
    };
  },
};
</script>

<style></style>
