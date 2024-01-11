import axios from "axios";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

// const highchartsData_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const highchartsData_2_ = [10, 5, 2, 6, 7, 8, 9, 3, 4, 5, 10];

const BACKEND_URL = "http://localhost:3333/quest/get";

const Chart = () => {
  const [graphTimeData, setGraphTimeData] = useState([]);
  const [graphRpmData, setGraphRpmData] = useState([]);

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
        data: graphRpmData,
        color: "#aa2233",
      },
      {
        type: "area",
        data: graphTimeData,
        color: "#aa22aa",
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

  useEffect(() => {
    axios.get(BACKEND_URL).then((response: any) => {
      const apiData: any = response?.data?.data;
      let timeData_d: any = [];
      let rpmData_d: any = [];

      apiData.map((currentData: any) => {
        const { engineLoad, rpm } = currentData;
        timeData_d.push(engineLoad);
        rpmData_d.push(Number(rpm));
      });

      setGraphTimeData(timeData_d);
      setGraphRpmData(rpmData_d);

      timeData_d = [];
      rpmData_d = [];
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
