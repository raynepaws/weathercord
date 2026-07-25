"use client";

import AccountSettingsModal from "./AccountSettingsModal/AccountSettingsModal";
import LoadingScreen from "./LoadingScreen";
import { ModalType } from "$/modals";
import { Prompt } from "./Prompt";
import SignUpModal from "./SignUpModal";
import { useState } from "react";
import UserIndicator from "./UserIndicator/UserIndicator";
import { useAppSelector } from "$/store/hooks";
import { nullish } from "$/typing";
import { FeedbackStateType } from "@/lib/feedbackState";
import { LoaderCircle } from "lucide-react";
import Box from "./Box";

const GUI = () => {
  const [initialAccountSettingsTab, setInitialAccountSettingsTab] = useState(0);

  const account = useAppSelector((state) => state.account);
  const feedbackState = useAppSelector((state) => state.gui.feedbackState);
  const loading = useAppSelector((state) => state.gui.loading.loading);
  const modals = useAppSelector((state) => state.gui.modals);

  if (loading) return (
    <LoadingScreen />
  );

  if (!nullish(account.id)) return (
    <SignUpModal />
  );

  return (
    <>
      <div className="contents" inert={Object.values(modals).includes(true)}>
        <UserIndicator className="w-20" canEdit />
        <Prompt className="absolute bottom-1 left-22" style={{
          width: "calc(100vw - 23rem)"
        }} />
      </div>

      {modals[ModalType.AccountSettings] &&
        <AccountSettingsModal startingTab={initialAccountSettingsTab} setInitialAccountSettingsTab={setInitialAccountSettingsTab} />
      }

      {feedbackState &&
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
      }
    </>
  );
};

export default GUI;
