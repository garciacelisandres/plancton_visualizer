import { Sample } from "../../../model/Sample";

export const ACTION_SAMPLE_LIST_UPDATE_START =
  "ACTION_SAMPLE_LIST_UPDATE_START";
export const ACTION_SAMPLE_LIST_UPDATE_FINISH =
  "ACTION_SAMPLE_LIST_UPDATE_FINISH";
export const ACTION_SAMPLE_LIST_UPDATE_ERROR =
  "ACTION_SAMPLE_LIST_UPDATE_ERROR";
export const ACTION_SAMPLE_LIST_UPDATE_QUANT_METHOD =
  "ACTION_SAMPLE_LIST_UPDATE_QUANT_METHOD";

export interface SampleListStartUpdateAction {
  type: typeof ACTION_SAMPLE_LIST_UPDATE_START;
  params: {};
}

export interface SampleListFinishUpdateAction {
  type: typeof ACTION_SAMPLE_LIST_UPDATE_FINISH;
  params: {
    samples: Sample[];
    method: string;
  };
}

export interface SampleListErrorUpdateAction {
  type: typeof ACTION_SAMPLE_LIST_UPDATE_ERROR;
  params: {
    error: string;
  };
}

export interface SampleListUpdateQuantMethod {
  type: typeof ACTION_SAMPLE_LIST_UPDATE_QUANT_METHOD;
  params: {
    method: string;
  };
}

export type SampleListAction =
  | SampleListStartUpdateAction
  | SampleListFinishUpdateAction
  | SampleListErrorUpdateAction
  | SampleListUpdateQuantMethod;
