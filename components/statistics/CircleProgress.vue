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
  data() {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "radialBar",
        },
        responsive: [
          {
            breakpoint: 1000,
            options: {
              plotOptions: {
                bar: {
                  horizontal: false,
                },
              },
              legend: {
                position: "bottom",
                show: false,
              },
            },
          },
          {
            breakpoint: 1900,
            options: {
              plotOptions: {
                bar: {
                  horizontal: false,
                },
              },
              legend: {
                show: false,
              },
            },
          },
        ],
        legend: {
          horizontalAlign: "top",
          show: false,
          floating: true,
          fontSize: "16px",
          position: "right",
          offsetX: 0,
          offsetY: 50,
          labels: {
            useSeriesColors: true,
          },
          itemMargin: {
            vertical: 10,
            horizontal: 5,
          },
          markers: {
            width: 12,
            height: 20,
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: undefined,
            radius: 5,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 10,
            offsetY: 5,
          },
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
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249;
                },
              },
            },
          },
        },
        labels: [
          "حجوزات منتهية وقتها",
          "حجوزات قريب وقتها",
          "حجوزات لم ينتهى وقتها",
          "حجوزات منازل",
        ],
      },
      series: [
        {
          value: 50,
          name: "حجوزات منتهية وقتها",
        },
        {
          value: 30,
          name: "حجوزات قريب وقتها",
        },
        {
          value: 20,
          name: "حجوزات لم ينتهى وقتها",
        },
        {
          value: 10,
          name: "حجوزات منازل",
        },
      ],
    };
  },
};
</script>

<style></style>
