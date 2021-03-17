import React from "react";
import { SampleListAction } from "./reducers/sampleList/SampleListActions";
import { SampleListState } from "./reducers/sampleList/SampleListState";
import sampleReducer from "./reducers/sampleList/SampleListReducer";

type Dispatch = (action: SampleListAction) => void;
type SampleProviderProps = { children: React.ReactNode };

const SampleListContext = React.createContext<
  { sampleListState: SampleListState; sampleListDispatch: Dispatch } | undefined
>(undefined);

function SampleListProvider({ children }: SampleProviderProps) {
  const [sampleListState, sampleListDispatch] = React.useReducer(
    sampleReducer,
    { samples: [] }
  );
  const value = { sampleListState, sampleListDispatch };
  return (
    <SampleListContext.Provider value={value}>
      {children}
    </SampleListContext.Provider>
  );
}

function useSampleList() {
  const context = React.useContext(SampleListContext);
  if (context === undefined) {
    throw new Error("useSampleList must be used within a SampleListProvider");
  }
  return context;
}

export { SampleListProvider, useSampleList };
