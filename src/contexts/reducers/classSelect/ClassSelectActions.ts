import { Class } from "../../../model/Class";

export const ACTION_CLASS_SELECT_UPDATE = "ACTION_CLASS_SELECT_UPDATE";
export const ACTION_CLASS_SELECT_DELETE = "ACTION_CLASS_SELECT_DELETE"

export type ClassSelectAction = { type: string, class: Class };
