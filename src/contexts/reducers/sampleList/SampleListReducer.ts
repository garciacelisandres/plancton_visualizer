import SampleStore from "../../../stores/SampleStore";
import {
  ACTION_SAMPLE_LIST_UPDATE_START,
  ACTION_SAMPLE_LIST_UPDATE_FINISH,
  ACTION_SAMPLE_LIST_UPDATE_ERROR,
  SampleListAction,
} from "./SampleListActions";
import {
  SampleListErrorState,
  SampleListLoadingState,
  SampleListState,
  SampleListSuccessState,
} from "./SampleListState";

export default (state: SampleListState, action: SampleListAction) => {
  switch (action.type) {
    case ACTION_SAMPLE_LIST_UPDATE_START: {
      let newState: SampleListLoadingState = {
        loading: true,
        samples: state.samples,
        method: state.method,
      };
      return newState;
    }
    case ACTION_SAMPLE_LIST_UPDATE_FINISH: {
      let newState: SampleListSuccessState = {
        samples: action.params.samples,
        method: action.params.method,
      };
      return newState;
    }
    case ACTION_SAMPLE_LIST_UPDATE_ERROR: {
      let newState: SampleListErrorState = {
        samples: state.samples,
        method: state.method,
        error: action.params.error,
      };
      return newState;
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};
