import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClassSelectState } from "../../../contexts/reducers/classSelect/ClassSelectState";
import { SampleListState } from "../../../contexts/reducers/sampleList/SampleListState";
import { Sample } from "../../../model/Sample";

interface Props {
  sampleListState: SampleListState;
  classSelectState: ClassSelectState;
  width: number;
  height: number;
  handleClickOpen: (sample: Sample) => void;
}

const LineGraphType: React.FC<Props> = ({
  sampleListState,
  classSelectState,
  width,
  height,
  handleClickOpen,
}) => {
  return (
    <LineChart
      width={width}
      height={height}
      data={sampleListState.samples.map((sample) => sample.toJSON())}
    >
      <XAxis
        dataKey="date.toDateString()"
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
            activeDot={{
              onClick: (event, data) => {
                let dataWithPayload = data as any;
                let payload = dataWithPayload.payload;
                let sample = payload as Sample;
                console.log(sample)
                handleClickOpen(sample);
              },
            }}
          />
        ) : (
          <></>
        )
      )}
      <Tooltip />
    </LineChart>
  );
};

export default LineGraphType;
