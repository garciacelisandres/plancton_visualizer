import "./GridLayout.css";

import { Responsive, WidthProvider } from "react-grid-layout";
import ClassesList from "../ClassesList/ClassesList";
import SamplesGraph from "../SamplesGraph/SamplesGraph";
import VisualizationOptions from "../VisualizationOptions/VisualizationOptions";
import GraphTypes from "../GraphTypes/GraphTypes";
import { GraphTypeProvider } from "../../contexts/GraphTypeContext";
import React from "react";
import SampleModalDialog from "../SampleModalDialog/SampleModalDialog";
import { Sample } from "../../model/Sample";
import { RequestProgressProvider } from "../../contexts/RequestProgressContext";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayout = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedSample, setSelectedSample] =
    React.useState<Sample | undefined>(undefined);

  const handleClickOpen = (sample: Sample) => {
    setSelectedSample(sample);
    if (sample) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rowHeight = 50;
  const rowWidth = 50;
  const layout = {
    lg: [
      {
        x: 0,
        y: 0,
        w: 12,
        h: 2,
        i: "vis-options",
      },
      {
        x: 3,
        y: 7,
        w: 9,
        h: 6,
        i: "graph",
      },
      {
        x: 0,
        y: 7,
        w: 3,
        h: 6,
        i: "class-list",
      },
      {
        x: 0,
        y: 10,
        w: 12,
        h: 1,
        i: "graph-types",
      },
    ],
  };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <div className="grid-layout-container">
      <GraphTypeProvider>
        <RequestProgressProvider>
          <ResponsiveReactGridLayout
            layouts={layout}
            onLayoutChange={() => {}}
            rowHeight={50}
            cols={cols}
            isDraggable={false}
            isResizable={false}
          >
            <div key="class-list">
              <ClassesList height={rowHeight * 6} width={rowWidth * 6} />
            </div>
            <div key="graph">
              <SamplesGraph
                height={rowHeight * 6}
                width={rowWidth * 18}
                handleClickOpen={handleClickOpen}
              />
            </div>
            <div key="graph-types">
              <GraphTypes />
            </div>
            <div key="vis-options">
              <VisualizationOptions
                height={rowHeight * 6}
                width={rowWidth * 6}
              />
            </div>
          </ResponsiveReactGridLayout>
        </RequestProgressProvider>
      </GraphTypeProvider>
      <SampleModalDialog
        open={open}
        onClose={handleClose}
        sampleData={selectedSample}
      />
    </div>
  );
};

export default GridLayout;
