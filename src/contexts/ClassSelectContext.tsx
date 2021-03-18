import React from "react";
import { ClassSelectAction } from "./reducers/classSelect/ClassSelectActions";
import { ClassSelectState } from "./reducers/classSelect/ClassSelectState";
import classReducer from "./reducers/classSelect/ClassSelectReducer"

export type ClassSelectDispatch = (action: ClassSelectAction) => void;
type ClassProviderProps = { children: React.ReactNode };

const ClassSelectContext = React.createContext<
  { classSelectState: ClassSelectState; classSelectDispatch: ClassSelectDispatch } | undefined
>(undefined);

function ClassSelectProvider({ children }: ClassProviderProps) {
  const [classSelectState, classSelectDispatch] = React.useReducer(classReducer, { class: undefined });
  const value = { classSelectState, classSelectDispatch };
  return (
    <ClassSelectContext.Provider value={value}>
      {children}
    </ClassSelectContext.Provider>
  );
}

function useClassSelect() {
  const context = React.useContext(ClassSelectContext);
  if (context === undefined) {
    throw new Error("useClassSelect must be used within a ClassSelectProvider");
  }
  return context;
}

export { ClassSelectProvider, useClassSelect };
