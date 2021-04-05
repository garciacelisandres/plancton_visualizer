import "./GridLayout.css";

import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import ClassesList from "../ClassesList/ClassesList";
import SamplesGraph from "../SamplesGraph/SamplesGraph";
import VisualizationOptions from "../VisualizationOptions/VisualizationOptions";

const ReactGridLayout = WidthProvider(RGL);

const GridLayout = () => {
  const rowHeight = 50;
  const rowWidth = 50;
  const layout = [
    {
      x: 0,
      y: 0,
      w: 12,
      h: 3,
      i: "vis-options"
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
  ];

  return (
    <div>
      <ReactGridLayout
        layout={layout}
        onLayoutChange={() => {}}
        className="layout"
        rowHeight={50}
        cols={12}
        isDraggable={false}
        isResizable={false}
      >
        <div key="class-list" className="react-grid-item item">
          <ClassesList height={rowHeight * 6} width={rowWidth * 6} />
        </div>
        <div key="graph">
          <SamplesGraph height={rowHeight * 6} width={rowWidth * 18} />
        </div>
        <div key="vis-options">
          <VisualizationOptions height={rowHeight * 6} width={rowWidth * 6} />
        </div>
      </ReactGridLayout>
    </div>
  );
};

export default GridLayout;
