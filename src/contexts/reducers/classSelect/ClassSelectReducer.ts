import {
  ACTION_CLASS_SELECT_UPDATE,
  ClassSelectAction,
} from "./ClassSelectActions";
import { ClassSelectState } from "./ClassSelectState";

export default (state: ClassSelectState, action: ClassSelectAction) => {
  switch (action.type) {
    case ACTION_CLASS_SELECT_UPDATE: {
      let newState = { class: action.class };
      return newState;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
