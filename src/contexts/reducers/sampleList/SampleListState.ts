import { Sample } from "../../../model/Sample";

export interface SampleListState {
  samples: Sample[];
}

export interface SampleListLoadingState extends SampleListState {}
export interface SampleListSuccessState extends SampleListState {}
export interface SampleListErrorState extends SampleListState {
  error: string;
}
