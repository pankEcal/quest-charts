import "./App.css";
import Chart from "./components/chart/Chart";
import Controls from "./components/controls/Controls";

function App() {
  return (
    <>
      <div>
        <h2 className="text-blue-600 text-2xl font-bold">EI TimeSeries Data</h2>
        <Controls />
        <Chart />
      </div>
    </>
  );
}

export default App;
