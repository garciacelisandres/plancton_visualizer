import { Class } from "../../model/Class";
import SampleStore from "../../stores/SampleStore";
import {
  ACTION_SAMPLE_LIST_UPDATE_ERROR,
  ACTION_SAMPLE_LIST_UPDATE_FINISH,
  ACTION_SAMPLE_LIST_UPDATE_START,
} from "../reducers/sampleList/SampleListActions";
import { SampleListDispatch } from "../SampleListContext";

interface UpdateSampleListParams {
  start_time?: Date | undefined;
  end_time?: Date | undefined;
  sample_classes?: Class[] | undefined;
  quant_method?: undefined;
}

export async function updateSampleList(
  dispatch: SampleListDispatch,
  { start_time, end_time, sample_classes, quant_method }: UpdateSampleListParams
) {
  dispatch({ type: ACTION_SAMPLE_LIST_UPDATE_START, params: {} });
  try {
    await SampleStore.updateState(
      start_time,
      end_time,
      sample_classes,
      quant_method
    );
    let sampleList = SampleStore.getState();
    dispatch({
      type: ACTION_SAMPLE_LIST_UPDATE_FINISH,
      params: { samples: sampleList },
    });
  } catch (e) {
    dispatch({ type: ACTION_SAMPLE_LIST_UPDATE_ERROR, params: { error: e } });
  }
}
