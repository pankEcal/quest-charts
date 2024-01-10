import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const highchartsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const chartOptions: Highcharts.Options = {
  title: {
    text: "Title",
  },
  subtitle: {
    text: "subtitle",
  },
  yAxis: {
    title: {
      text: "Y Axis",
    },
  },
  xAxis: {
    title: {
      text: "X Axis",
    },
  },
  series: [
    {
      type: "area",
      data: highchartsData,
      color: "#002233",
    },
  ],
  credits: {
    enabled: false,
  },
  chart: {
    zooming: {
      type: "x",
    },
  },
};
const Chart = () => {
  return (
    <div className="border-gray-400 border-2 p-4 min-h-[500px] my-4 rounded-md">
      <h2 className="font-semibold text-xl text-orange-600">
        HighCharts Visualization
      </h2>
      <hr className="mt-2" />
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />{" "}
    </div>
  );
};

export default Chart;