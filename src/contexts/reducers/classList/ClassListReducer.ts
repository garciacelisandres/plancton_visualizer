import ClassStore from "../../../stores/ClassStore";
import { ClassListAction, ACTION_CLASS_LIST_UPDATE } from "./ClassListActions";
import { ClassListState } from "./ClassListState";

export default (state: ClassListState, action: ClassListAction) => {
  switch (action.type) {
    case ACTION_CLASS_LIST_UPDATE: {
      ClassStore.updateState();
      console.log(ClassStore.getState())
      let newState = { classes: ClassStore.getState() };
      return newState;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
