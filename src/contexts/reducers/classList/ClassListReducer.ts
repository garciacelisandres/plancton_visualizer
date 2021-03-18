import ClassStore from "../../../stores/ClassStore";
import {
  ACTION_CLASS_LIST_UPDATE_ERROR,
  ACTION_CLASS_LIST_UPDATE_FINISH,
  ACTION_CLASS_LIST_UPDATE_START,
  ClassListAction,
} from "./ClassListActions";
import {
  ClassListErrorState,
  ClassListLoadingState,
  ClassListState,
  ClassListSuccessState,
} from "./ClassListState";

export default (state: ClassListState, action: ClassListAction) => {
  switch (action.type) {
    case ACTION_CLASS_LIST_UPDATE_START: {
      let newState: ClassListLoadingState = { classes: state.classes };
      return newState;
    }
    case ACTION_CLASS_LIST_UPDATE_FINISH: {
      let newState: ClassListSuccessState = { classes: action.params.classes };
      return newState;
    }
    case ACTION_CLASS_LIST_UPDATE_ERROR: {
      let newState: ClassListErrorState = {
        classes: ClassStore.getState(),
        error: action.params.error,
      };
      return newState;
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};
