import { Class } from "../../model/Class";
import SampleStore from "../../stores/SampleStore";
import {
  ACTION_SAMPLE_LIST_UPDATE_ERROR,
  ACTION_SAMPLE_LIST_UPDATE_FINISH,
  ACTION_SAMPLE_LIST_UPDATE_START,
} from "../reducers/sampleList/SampleListActions";
import { RequestProgressDispatch } from "../RequestProgressContext";
import { SampleListDispatch } from "../SampleListContext";

interface UpdateSampleListParams {
  start_time?: Date | undefined;
  end_time?: Date | undefined;
  sample_classes?: Class[] | undefined;
  quant_method?: undefined;
}

export async function updateSampleList(
  dispatch: SampleListDispatch,
  progressDispatch: RequestProgressDispatch,
  { start_time, end_time, sample_classes, quant_method }: UpdateSampleListParams
) {
  dispatch({ type: ACTION_SAMPLE_LIST_UPDATE_START, params: {} });
  try {
    await SampleStore.updateState(
      start_time,
      end_time,
      sample_classes,
      quant_method,
      progressDispatch
    );
    let sampleList = SampleStore.getState();
    dispatch({
      type: ACTION_SAMPLE_LIST_UPDATE_FINISH,
      params: {
        samples: sampleList,
        method: sampleList[0].values[0].values[0].method,
      },
    });
  } catch (e) {
    dispatch({ type: ACTION_SAMPLE_LIST_UPDATE_ERROR, params: { error: e } });
  }
}
