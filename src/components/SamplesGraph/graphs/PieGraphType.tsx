import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Class } from "../../../model/Class";
import { Sample } from "../../../model/Sample";

interface Props {
  sampleData: Sample;
  selectedQuantMethod: string;
  classList: Class[];
}

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

const PieGraphType: React.FC<Props> = ({
  sampleData,
  selectedQuantMethod,
  classList,
}) => {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={sampleData.values.map((values) => {
          let name = classList.find(
            (_class) => _class.id === values.class_id
          )?.name;
          let value = values.values.find(
            (value) => value.method === selectedQuantMethod
          )?.value;
          return {
            name: name,
            value: value,
          };
        })}
        cx="50%"
        cy="50%"
        isAnimationActive={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {sampleData.values
          .map((value) => value.values)
          .map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={palette[index % palette.length]}
            />
          ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieGraphType;
