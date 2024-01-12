import axios from "axios";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

const highchartsData_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const highchartsData_2_ = [10, 5, 2, 6, 7, 8, 9, 3, 4, 5, 10];

const BACKEND_URL = "http://localhost:3333/quest/get/csv";

interface ChartData {
  entry_1: any[];
  entry_3: any[];
  entry_2: any[];
  entry_4: any[];
}

const Chart = () => {
  const [graphData_1, setGraphData_1]: any = useState(highchartsData_1);
  const [graphData_2, setGraphData_2]: any = useState(highchartsData_2_);
  const [graphData_3, setGraphData_3]: any = useState([]);
  const [graphData_4, setGraphData_4]: any = useState([]);

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
        data: graphData_2,
        color: "#3B3486",
      },
      {
        type: "area",
        data: graphData_3,
        color: "#FB8B24",
      },
      {
        type: "area",
        data: graphData_4,
        color: "#5D3587",
      },
      // {
      //   type: "area",
      //   data: graphData_1,
      //   color: "#424769",
      // },
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

  useEffect(() => {
    axios.get(BACKEND_URL).then((response: any) => {
      const apiData: any = response?.data?.data;
      const graphData: ChartData = {
        entry_1: [],
        entry_3: [],
        entry_2: [],
        entry_4: [],
      };

      apiData.map((currentData: any) => {
        const { time, obdRpm, obdManifoldPressure, obdThrottle } = currentData;
        const { entry_1, entry_2, entry_3, entry_4 } = graphData;

        entry_1.push(Number(time));
        entry_2.push(Number(obdRpm));
        entry_3.push(Number(obdManifoldPressure));
        entry_4.push(Number(obdThrottle));

        // console.log(
        //   `time: ${time}, opdRpm: ${obdRpm}, obdManifoldPressure: ${obdManifoldPressure}, obdThrottle: ${obdThrottle}`
        // );
      });

      setGraphData_1(graphData.entry_1);
      setGraphData_2(graphData.entry_2);
      setGraphData_3(graphData.entry_3);
      setGraphData_4(graphData.entry_4);

      // console.log("graphData_1: ", graphData_1);
      // console.log("graphData_2: ", graphData_2);
      // console.log("graphData_3: ", graphData_3);
      // console.log("graphData_4: ", graphData_4);
    });
  }, []);

  return (
    <div className="border-gray-400 border-2 p-4 min-h-[500px] my-4 rounded-md">
      <h2 className="font-semibold text-xl text-orange-600">
        HighCharts Visualization
      </h2>
      <hr className="mt-2" />
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default Chart;
