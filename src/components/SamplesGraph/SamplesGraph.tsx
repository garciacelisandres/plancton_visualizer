import React, { useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sample } from "../../model/Sample";
import { useClassSelect } from "../../contexts/ClassSelectContext";
import { useSampleList } from "../../contexts/SampleListContext";

interface Props {
  height: number;
  width: number;
}

const SamplesGraph: React.FC<Props> = ({ height, width }) => {
  const { sampleListState } = useSampleList();
  const { classSelectState } = useClassSelect();

  return (
    <div>
      <LineChart
        width={width}
        height={height}
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
        {classSelectState.classes?.map((_class) =>
          _class ? (
            <Line
              type="monotone"
              dataKey={(sample: Sample) => {
                let value = sample.values.find(
                  (obj) => obj["class_id"] === _class.id
                )?.value;
                return value;
              }}
              stroke="#8884d8"
              key={_class.name}
            />
          ) : (
            <></>
          )
        )}
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default SamplesGraph;
