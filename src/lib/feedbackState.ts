export enum FeedbackStateType {
  Loading = 1,
  Message = 2,
  Error = 3
}

export type FeedbackState = {
  type: FeedbackStateType.Loading
} | {
  type: FeedbackStateType,
  message: string
};
