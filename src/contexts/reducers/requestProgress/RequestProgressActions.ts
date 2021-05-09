export const ACTION_REQUEST_PROGRESS_UPDATE = "ACTION_REQUEST_PROGRESS_UPDATE";

export interface RequestProgressUpdateAction {
  type: typeof ACTION_REQUEST_PROGRESS_UPDATE;
  params: {
    value: number;
  };
}

export type RequestProgressAction = RequestProgressUpdateAction;
