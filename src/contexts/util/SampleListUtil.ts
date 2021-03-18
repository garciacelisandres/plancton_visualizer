import SampleStore from "../../stores/SampleStore";
import {
  ACTION_SAMPLE_LIST_UPDATE_ERROR,
  ACTION_SAMPLE_LIST_UPDATE_FINISH,
  ACTION_SAMPLE_LIST_UPDATE_START,
} from "../reducers/sampleList/SampleListActions";
import { SampleListDispatch } from "../SampleListContext";

export async function updateSampleList(dispatch: SampleListDispatch) {
  dispatch({ type: ACTION_SAMPLE_LIST_UPDATE_START, params: {} });
  try {
    await SampleStore.updateState();
    let sampleList = SampleStore.getState();
    dispatch({
      type: ACTION_SAMPLE_LIST_UPDATE_FINISH,
      params: { samples: sampleList },
    });
  } catch (e) {
    dispatch({ type: ACTION_SAMPLE_LIST_UPDATE_ERROR, params: { error: e } });
  }
}
