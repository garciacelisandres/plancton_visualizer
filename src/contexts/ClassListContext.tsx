import React from "react";
import { Class } from "../model/Class";
import ClassStore from "../stores/ClassStore";
import { ClassListAction } from "./reducers/classList/ClassListActions";
import classReducer from "./reducers/classList/ClassListReducer";
import { ClassListState } from "./reducers/classList/ClassListState";

type Dispatch = (action: ClassListAction) => void;
type ClassProviderProps = { children: React.ReactNode };

const ClassListContext = React.createContext<
  { classListState: ClassListState; classListDispatch: Dispatch } | undefined
>(undefined);

function ClassListProvider({ children }: ClassProviderProps) {
  const [classListState, classListDispatch] = React.useReducer(classReducer, { classes: [] });
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
