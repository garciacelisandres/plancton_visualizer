import { Class } from "../../../model/Class";

export const ACTION_CLASS_LIST_UPDATE_START = "ACTION_CLASS_LIST_UPDATE_START";
export const ACTION_CLASS_LIST_UPDATE_FINISH =
  "ACTION_CLASS_LIST_UPDATE_FINISH";
export const ACTION_CLASS_LIST_UPDATE_ERROR = "ACTION_CLASS_LIST_UPDATE_ERROR";

export interface ClassListStartUpdateAction {
  type: typeof ACTION_CLASS_LIST_UPDATE_START;
  params: {};
}

export interface ClassListFinishUpdateAction {
  type: typeof ACTION_CLASS_LIST_UPDATE_FINISH;
  params: {
    classes: Class[];
  };
}

export interface ClassListErrorUpdateAction {
  type: typeof ACTION_CLASS_LIST_UPDATE_ERROR;
  params: {
    error: string;
  };
}

export type ClassListAction =
  | ClassListStartUpdateAction
  | ClassListFinishUpdateAction
  | ClassListErrorUpdateAction;
