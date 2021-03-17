import { Class } from "../../../model/Class";

export const ACTION_CLASS_SELECT_UPDATE = "ACTION_CLASS_SELECT_UPDATE";

export type ClassSelectAction = { type: string, class: Class | undefined };
