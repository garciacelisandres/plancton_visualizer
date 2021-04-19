import React from "react";
import { useClassSelect } from "../../contexts/ClassSelectContext";
import { useSampleList } from "../../contexts/SampleListContext";
import { useGraphType } from "../../contexts/GraphTypeContext";
import LineGraphType from "./graphs/LineGraphType";
import BarGraphType from "./graphs/BarGraphType";
import PieGraphType from "./graphs/PieGraphType";
import { ResponsiveContainer } from "recharts";

interface Props {
  height: number;
  width: number;
}

const SamplesGraph: React.FC<Props> = ({ height, width }) => {
  const { sampleListState } = useSampleList();
  const { classSelectState } = useClassSelect();
  const { graphTypeState } = useGraphType();

  const renderGraph = (): JSX.Element => {
    switch (graphTypeState.name) {
      case "bar":
        return (
          <BarGraphType
            sampleListState={sampleListState}
            classSelectState={classSelectState}
            width={width}
            height={height}
          />
        );
      case "line":
        return (
          <LineGraphType
            sampleListState={sampleListState}
            classSelectState={classSelectState}
            width={width}
            height={height}
          />
        );
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {renderGraph()}
    </ResponsiveContainer>
  );
};

export default SamplesGraph;
