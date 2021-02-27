import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sample } from "../model/Sample";
import sampleStore from "../stores/SampleStore";
import classStore from "../stores/ClassStore"

interface Props {};

const SamplesGraph: React.FC<Props> = () => {
  const [samples, setSamples] = useState<Sample[]>([]);

  useEffect(() => {
    sampleStore.attach(setSamples)
    return function cleanup() {
      sampleStore.dettach(setSamples)
    }
  }, []);

  return (
    <div>
      <LineChart
        width={1000}
        height={300}
        data={samples.map((sample) => sample.toJSON())}
      >
        <XAxis
          dataKey="date"
          tick={({ x, y, payload }) => {
            return (
              <text x={x - 60} y={y + 20}>
                {payload.value}
              </text>
            );
          }}
        />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="values?.find(obj => obj['class_id'] === classStore.getSelected().id).value" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default SamplesGraph;
