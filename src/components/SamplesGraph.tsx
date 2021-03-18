import React, { useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sample } from "../model/Sample";
import { useClassSelect } from "../contexts/ClassSelectContext";
import { useSampleList } from "../contexts/SampleListContext";
import { updateSampleList } from "../contexts/util/SampleListUtil";

interface Props {}

const SamplesGraph: React.FC<Props> = () => {
  const { sampleListState, sampleListDispatch } = useSampleList();
  const { classSelectState } = useClassSelect();

  useEffect(() => {
    updateSampleList(sampleListDispatch);
  }, []);

  return (
    <div>
      <LineChart
        width={1000}
        height={300}
        data={sampleListState.samples.map((sample) => sample.toJSON())}
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
        <Line
          type="monotone"
          dataKey={(sample: Sample) => {
            let value = sample.values.find(
              (obj) => obj["class_id"] === classSelectState.class?.id
            )?.value;
            return value;
          }}
          stroke="#8884d8"
        />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default SamplesGraph;
