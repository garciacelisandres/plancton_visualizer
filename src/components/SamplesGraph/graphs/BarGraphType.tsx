import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
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

const BarGraphType: React.FC<Props> = ({
  sampleListState,
  classSelectState,
  width,
  height,
  handleClickOpen,
}) => {
  const palette = [
    "#d36135",
    "#7fb069",
    "#ece4b7",
    "#e6aa68",
    "#02020b",
    "#161032",
    "#faff81",
    "#ffc53a",
    "#e06d06",
    "#b26700",
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={sampleListState.samples.map((sample) => sample.toJSON())}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {classSelectState.classes?.map((_class, index) =>
          _class ? (
            <Bar
              dataKey={(sample: Sample) => {
                let value = sample.values.find(
                  (obj) => obj["class_id"] === _class.id
                )?.value;
                return value;
              }}
              stackId="a"
              fill={palette[index % palette.length]}
              key={_class.name}
              onClick={handleClickOpen}
            />
          ) : (
            <></>
          )
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraphType;
