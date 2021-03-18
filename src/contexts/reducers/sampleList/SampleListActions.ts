import { Class } from "../../../model/Class";
import { Sample } from "../../../model/Sample";

export const ACTION_SAMPLE_LIST_UPDATE_START =
  "ACTION_SAMPLE_LIST_UPDATE_START";
export const ACTION_SAMPLE_LIST_UPDATE_FINISH =
  "ACTION_SAMPLE_LIST_UPDATE_FINISH";
export const ACTION_SAMPLE_LIST_UPDATE_ERROR =
  "ACTION_SAMPLE_LIST_UPDATE_ERROR";

export interface SampleListStartUpdateAction {
  type: typeof ACTION_SAMPLE_LIST_UPDATE_START;
  params: {
    start_time?: Date | undefined;
    end_time?: Date | undefined;
    sample_classes?: Class[] | undefined;
    quant_method?: undefined;
  };
}

export interface SampleListFinishUpdateAction {
  type: typeof ACTION_SAMPLE_LIST_UPDATE_FINISH;
  params: {
    samples: Sample[];
  };
}

export interface SampleListErrorUpdateAction {
  type: typeof ACTION_SAMPLE_LIST_UPDATE_ERROR;
  params: {
    error: string;
  };
}

export type SampleListAction =
  | SampleListStartUpdateAction
  | SampleListFinishUpdateAction
  | SampleListErrorUpdateAction;
