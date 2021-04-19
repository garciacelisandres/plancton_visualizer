import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ClassSelectState } from "../../../contexts/reducers/classSelect/ClassSelectState";
import { SampleListState } from "../../../contexts/reducers/sampleList/SampleListState";

interface Props {
  sampleListState: SampleListState;
  classSelectState: ClassSelectState;
  width: number;
  height: number;
}

const PieGraphType: React.FC<Props> = ({
  sampleListState,
  classSelectState,
  width,
  height,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={sampleListState.samples[0]?.values}
          cx="50%"
          cy="50%"
          isAnimationActive={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraphType;
