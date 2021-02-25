import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url:
        "http://localhost:5000/api/v0.1/samples?start_time=1&end_time=2000000000",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: {
        start_time: 1,
        end_time: 2000000000,
      },
    }).then((data) => {
      console.log(data.data);
      setData(data.data.samples);
    });
  }, []);

  return (
    <div className="App">
      <h1>Plancton visualizer</h1>
      <LineChart width={1000} height={300} data={data}>
        <XAxis
          dataKey="date_retrieved"
          tick={({ x, y, payload }) => {
            return (
              <text x={x - 60} y={y + 20}>
                {new Date(parseInt(payload.value) * 1000).toDateString()}
              </text>
            );
          }}
        />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line
          type="monotone"
          dataKey="sample_classes[0]['value']"
          stroke="#8884d8"
        />
        <Line
          type="monotone"
          dataKey="sample_classes[1]['value']"
          stroke="#82ca9d"
        />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default App;
