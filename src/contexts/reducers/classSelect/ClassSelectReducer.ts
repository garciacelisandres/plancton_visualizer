import {
  ACTION_CLASS_SELECT_UPDATE,
  ClassSelectAction,
} from "./ClassSelectActions";
import { ClassSelectState } from "./ClassSelectState";

export default (state: ClassSelectState, action: ClassSelectAction) => {
  switch (action.type) {
    case ACTION_CLASS_SELECT_UPDATE: {
      let newState = { classes: state.classes };
      if(newState.classes && newState.classes.map(_ => _.name).includes(action.class.name)) {
        newState.classes = newState.classes.filter(_ => _.name !== action.class.name)
      } else if(newState.classes) {
        newState.classes.push(action.class)
      } else {
        newState.classes = [action.class]
      }
      return newState;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
