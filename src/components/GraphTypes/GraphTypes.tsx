import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { useGraphType } from "../../contexts/GraphTypeContext";
import { ACTION_GRAPH_TYPE_UPDATE } from "../../contexts/reducers/graphType/GraphTypeActions";
import { TypesList } from "../../contexts/reducers/graphType/GraphTypeState";

import "./GraphTypes.css";

const GraphTypes = () => {
  const { graphTypeState, graphTypeDispatch } = useGraphType();

  const selectGraphType = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    let graphTypeString = event.target.value as string
    let graphTypeName = TypesList[graphTypeString as keyof typeof TypesList]
    graphTypeDispatch({
      type: ACTION_GRAPH_TYPE_UPDATE,
      typeName: graphTypeName,
    });
  };

  return (
    <div>
      <Select
        native
        labelId="graph-types-select-label"
        id="graph-types-select"
        value={graphTypeState.name}
        onChange={selectGraphType}
        className="capitalize"
      >
        {Object.keys(TypesList)
          .map((_key, index) => TypesList[index])
          .filter((value) => typeof value === "string")
          .map((graphType) => (
            <option value={graphType} className="capitalize">{graphType.toString()}</option>
          ))}
      </Select>
    </div>
  );
};

export default GraphTypes;
