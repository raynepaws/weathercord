import { useAppSelector } from "@/lib/store/hooks";
import Box from "./Box";
import { FeedbackStateType } from "@/lib/feedbackState";
import { LoaderCircle } from "lucide-react";

const FeedbackStateIndicator = () => {
  const feedbackState = useAppSelector((state) => state.gui.feedbackState);

  return (
    feedbackState &&
      <Box className={"p-1 rounded-2xl absolute bottom-1.5 right-1/2 select-none transition bg-transparent backdrop-blur-sm pointer-events-none" + (feedbackState?.type === FeedbackStateType.Error ? " bg-(--error-background)! outline-(--error-outline)!" : "")} style={{
        translate: "50%",
        scale: feedbackState.visible ? "1" : "0.8",
        opacity: feedbackState.visible ? "1" : "0"
      }}>
        {feedbackState.type === FeedbackStateType.Loading ?
          <LoaderCircle width="" height="" className="loading-spin" />
        :
          <span>{feedbackState.message}</span>
        }
      </Box>
  );
};

export default FeedbackStateIndicator
