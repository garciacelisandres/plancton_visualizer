import React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { Class } from "../../../model/Class";
import { Sample } from "../../../model/Sample";

import palette from "../../../util/ColorPalette";

interface Props {
  sampleData: Sample;
  selectedQuantMethod: string;
  classList: Class[];
}

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
      <Tooltip
        content={(content: any) => {
          let name = content.payload[0]?.name;
          let value = content.payload[0]?.value;
          return (
            <div className="custom-tooltip">
              <p>
                {name}: {value?.toFixed(5)}
              </p>
            </div>
          );
        }}
      />
    </PieChart>
  );
};

export default PieGraphType;
