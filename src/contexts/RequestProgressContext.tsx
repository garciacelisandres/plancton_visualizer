import React from "react";
import { RequestProgressAction } from "./reducers/requestProgress/RequestProgressActions";
import progressReducer from "./reducers/requestProgress/RequestProgressReducer";
import { RequestProgressState } from "./reducers/requestProgress/RequestProgressState";

export type RequestProgressDispatch = (action: RequestProgressAction) => void;
type RequestProgressProviderProps = { children: React.ReactNode };

const RequestProgressContext = React.createContext<
  | {
      requestProgressState: RequestProgressState;
      requestProgressDispatch: RequestProgressDispatch;
    }
  | undefined
>(undefined);

function RequestProgressProvider({ children }: RequestProgressProviderProps) {
  const [requestProgressState, requestProgressDispatch] = React.useReducer(
    progressReducer,
    {
      value: 0,
    }
  );
  const value = { requestProgressState, requestProgressDispatch };
  return (
    <RequestProgressContext.Provider value={value}>
      {children}
    </RequestProgressContext.Provider>
  );
}

function useRequestProgress() {
  const context = React.useContext(RequestProgressContext);
  if (context === undefined) {
    throw new Error(
      "useRequestProgress must be used within a RequestProgressProvider"
    );
  }
  return context;
}

export { RequestProgressProvider, useRequestProgress };
