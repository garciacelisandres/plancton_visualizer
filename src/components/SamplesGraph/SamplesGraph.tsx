import React, { ReactElement } from "react";
import { useClassSelect } from "../../contexts/ClassSelectContext";
import { useSampleList } from "../../contexts/SampleListContext";
import { useGraphType } from "../../contexts/GraphTypeContext";
import LineGraphType from "./graphs/LineGraphType";
import BarGraphType from "./graphs/BarGraphType";
import { ResponsiveContainer } from "recharts";
import { Sample } from "../../model/Sample";
import AreaGraphType from "./graphs/AreaGraphType";
import {
  isSampleListErrorState,
  isSampleListLoadingState,
  isSampleListSuccessState,
} from "../../contexts/reducers/sampleList/SampleListState";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import { useRequestProgress } from "../../contexts/RequestProgressContext";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

interface Props {
  height: number;
  width: number;
  handleClickOpen: (sample: Sample) => void;
}

const SamplesGraph: React.FC<Props> = ({ height, width, handleClickOpen }) => {
  const { sampleListState } = useSampleList();
  const { classSelectState } = useClassSelect();
  const { graphTypeState } = useGraphType();
  const { requestProgressState } = useRequestProgress();

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
      case "area":
        return (
          <AreaGraphType
            sampleListState={sampleListState}
            classSelectState={classSelectState}
            width={width}
            height={height}
            handleClickOpen={handleClickOpen}
          />
        );
    }
  };

  function graphState(): ReactElement {
    if (isSampleListLoadingState(sampleListState)) {
      return <CircularProgressWithLabel value={requestProgressState.value} />;
    } else if (isSampleListSuccessState(sampleListState)) {
      return (
        <>
          {classSelectState.classes && sampleListState.samples?.length > 0 ? (
            <ResponsiveContainer width="95%" height="95%">
              {renderGraph()}
            </ResponsiveContainer>
          ) : (
            <p>No data</p>
          )}
        </>
      );
    } else if (isSampleListErrorState(sampleListState)) {
      return (
        <p>
          An error ocurred while retrieving samples. Please, reload the page.
        </p>
      );
    } else {
      return <p>No data</p>;
    }
  }

  return <>{graphState()}</>;
};

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default SamplesGraph;