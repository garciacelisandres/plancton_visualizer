import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { useGraphType } from "../../contexts/GraphTypeContext";
import { ACTION_GRAPH_TYPE_UPDATE } from "../../contexts/reducers/graphType/GraphTypeActions";
import { TypesList } from "../../contexts/reducers/graphType/GraphTypeState";

import "./GraphTypes.css";

const GraphTypes = () => {
  const { graphTypeState, graphTypeDispatch } = useGraphType();

  const selectGraphType = (graphType: string) => {
    let graphTypeName = TypesList[graphType as keyof typeof TypesList];
    graphTypeDispatch({
      type: ACTION_GRAPH_TYPE_UPDATE,
      typeName: graphTypeName,
    });
  };

  return (
    <div className="graph-types">
      {Object.keys(TypesList)
        .map((_key, index) => TypesList[index])
        .filter((value) => typeof value === "string")
        .map((graphType, index) => (
          <button
            key={index}
            onClick={() => selectGraphType(graphType)}
            className={
              graphTypeState.name === graphType
                ? "capitalize graph-types-button graph-types-button-selected"
                : "capitalize graph-types-button"
            }
          >
            {graphType.toString()} chart
          </button>
        ))}
    </div>
  );
};

export default GraphTypes;
