import React from "react";
import { useClassSelect } from "../../contexts/ClassSelectContext";
import { useSampleList } from "../../contexts/SampleListContext";
import { useGraphType } from "../../contexts/GraphTypeContext";
import LineGraphType from "./graphs/LineGraphType";
import BarGraphType from "./graphs/BarGraphType";
import { ResponsiveContainer } from "recharts";
import { Sample } from "../../model/Sample";

interface Props {
  height: number;
  width: number;
  handleClickOpen: (sample: Sample) => void;
}

const SamplesGraph: React.FC<Props> = ({ height, width, handleClickOpen }) => {
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
            handleClickOpen={handleClickOpen}
          />
        );
      case "line":
        return (
          <LineGraphType
            sampleListState={sampleListState}
            classSelectState={classSelectState}
            width={width}
            height={height}
            handleClickOpen={handleClickOpen}
          />
        );
    }
  };

  return (
    <>
      {classSelectState.classes && sampleListState.samples?.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          {renderGraph()}
        </ResponsiveContainer>
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default SamplesGraph;
