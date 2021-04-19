import { TypesList } from "./GraphTypeState";

export const ACTION_GRAPH_TYPE_UPDATE = "ACTION_GRAPH_TYPE_UPDATE";

export type GraphTypeAction = { type: string; typeName: TypesList };
