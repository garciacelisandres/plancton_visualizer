import { Sample } from "../../../model/Sample";

export interface SampleListState {
  samples: Sample[];
  method: string;
}

export interface SampleListLoadingState extends SampleListState {
  loading: true;
}
export interface SampleListSuccessState extends SampleListState {}
export interface SampleListErrorState extends SampleListState {
  error: string;
}

export function isSampleListState(
  obj: any
): obj is SampleListState {
  return "samples" in obj && "method" in obj;
}

export function isSampleListLoadingState(
  obj: any
): obj is SampleListLoadingState {
  return "samples" in obj && "method" in obj && "loading" in obj;
}

export function isSampleListSuccessState(
  obj: any
): obj is SampleListSuccessState {
  return "samples" in obj && "method" in obj;
}

export function isSampleListErrorState(
  obj: any
): obj is SampleListSuccessState {
  return "samples" in obj && "method" in obj && "error" in obj;
}
