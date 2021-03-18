import ClassStore from "../../stores/ClassStore";
import { ClassListDispatch } from "../ClassListContext";
import { ClassSelectDispatch } from "../ClassSelectContext";
import {
  ACTION_CLASS_LIST_UPDATE_ERROR,
  ACTION_CLASS_LIST_UPDATE_FINISH,
  ACTION_CLASS_LIST_UPDATE_START,
} from "../reducers/classList/ClassListActions";
import { ACTION_CLASS_SELECT_UPDATE } from "../reducers/classSelect/ClassSelectActions";

export async function updateClassList(
  classListDispatch: ClassListDispatch,
  classSelectDispatch: ClassSelectDispatch
) {
  classListDispatch({ type: ACTION_CLASS_LIST_UPDATE_START, params: {} });
  try {
    await ClassStore.updateState();
    let classList = ClassStore.getState();
    classListDispatch({
      type: ACTION_CLASS_LIST_UPDATE_FINISH,
      params: { classes: classList },
    });
    classSelectDispatch({
      type: ACTION_CLASS_SELECT_UPDATE,
      class: classList[0],
    });
  } catch (e) {
    classListDispatch({
      type: ACTION_CLASS_LIST_UPDATE_ERROR,
      params: { error: e },
    });
  }
}
