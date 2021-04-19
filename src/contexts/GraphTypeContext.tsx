import React from "react";
import graphTypeReducer from "./reducers/graphType/GraphTypeReducer";
import { GraphTypeAction } from "./reducers/graphType/GraphTypeActions";
import { GraphTypeState } from "./reducers/graphType/GraphTypeState";

export type GraphTypeDispatch = (action: GraphTypeAction) => void;
type GraphTypeProviderProps = { children: React.ReactNode };

const GraphTypeContext = React.createContext<
  | { graphTypeState: GraphTypeState; graphTypeDispatch: GraphTypeDispatch }
  | undefined
>(undefined);

function GraphTypeProvider({ children }: GraphTypeProviderProps) {
  const [graphTypeState, graphTypeDispatch] = React.useReducer(
    graphTypeReducer,
    { name: "line" }
  );
  const value = { graphTypeState, graphTypeDispatch };
  return (
    <GraphTypeContext.Provider value={value}>
      {children}
    </GraphTypeContext.Provider>
  );
}

function useGraphType() {
  const context = React.useContext(GraphTypeContext);
  if (context === undefined) {
    throw new Error("useGraphType must be used within a GraphTypeProvider");
  }
  return context;
}

export { GraphTypeProvider, useGraphType };
