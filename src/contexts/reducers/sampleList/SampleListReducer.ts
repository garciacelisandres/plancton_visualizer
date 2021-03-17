import SampleStore from "../../../stores/SampleStore";
import {
  ACTION_SAMPLE_LIST_UPDATE,
  SampleListAction,
} from "./SampleListActions";
import { SampleListState } from "./SampleListState";

export default (state: SampleListState, action: SampleListAction) => {
  switch (action.type) {
    case ACTION_SAMPLE_LIST_UPDATE: {
      SampleStore.updateState();
      console.log(SampleStore.getState())
      let newState: SampleListState = { samples: SampleStore.getState() };
      return newState;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
