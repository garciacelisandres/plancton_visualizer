import { Class } from "../../../model/Class";

export type ClassListState = { classes: Class[] };

export interface ClassListLoadingState extends ClassListState {}
export interface ClassListSuccessState extends ClassListState {}
export interface ClassListErrorState extends ClassListState {
  error: string;
}
