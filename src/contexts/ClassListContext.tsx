import React from "react";
import { ClassListAction } from "./reducers/classList/ClassListActions";
import classReducer from "./reducers/classList/ClassListReducer";
import { ClassListState } from "./reducers/classList/ClassListState";

export type ClassListDispatch = (action: ClassListAction) => void;
type ClassProviderProps = { children: React.ReactNode };

const ClassListContext = React.createContext<
  { classListState: ClassListState; classListDispatch: ClassListDispatch } | undefined
>(undefined);

function ClassListProvider({ children }: ClassProviderProps) {
  const [classListState, classListDispatch] = React.useReducer(classReducer, {
    classes: [],
  });
  const value = { classListState, classListDispatch };
  return (
    <ClassListContext.Provider value={value}>
      {children}
    </ClassListContext.Provider>
  );
}

function useClassList() {
  const context = React.useContext(ClassListContext);
  if (context === undefined) {
    throw new Error("useClassList must be used within a ClassListProvider");
  }
  return context;
}

export { ClassListProvider, useClassList };
