import {
  ACTION_REQUEST_PROGRESS_UPDATE,
  RequestProgressAction,
} from "./RequestProgressActions";
import { RequestProgressState } from "./RequestProgressState";

export default (state: RequestProgressState, action: RequestProgressAction) => {
  switch (action.type) {
    case ACTION_REQUEST_PROGRESS_UPDATE: {
      let newState: RequestProgressState = { value: action.params.value };
      return newState;
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};
