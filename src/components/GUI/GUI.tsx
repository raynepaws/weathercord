"use client";

import AccountSettingsModal from "../AccountSettingsModal/AccountSettingsModal";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { ModalType } from "$/modals";
import { Prompt } from "../Prompt/Prompt";
import { setl10nData } from "$/l10n";
import SignUpModal from "../SignUpModal/SignUpModal";
import { updateAccount } from "$/store/reducers/account";
import { useEffect, useState } from "react";
import UserIndicator from "../UserIndicator/UserIndicator";
import { useAppDispatch, useAppSelector } from "$/store/hooks";
import { nullish } from "$/typing";
import { hideFeedbackState } from "@/lib/store/reducers/feedbackState";
import { FeedbackStateType } from "@/lib/feedbackState";
import { LoaderCircle } from "lucide-react";
import Box from "../Box/Box";

const GUI = () => {
  const [feedbackStateTimeout, setFeedbackStateTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialAccountSettingsTab, setInitialAccountSettingsTab] = useState(0);

  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);
  const feedbackState = useAppSelector((state) => state.gui.feedbackState);
  const modals = useAppSelector((state) => state.gui.modals);

  useEffect(() => {
    fetch("/whoami")
      .then((res) => {
        if (res.ok) res.json()
          .then((account) => {
            dispatch(updateAccount(account));
            setl10nData(account.lang)
              .then(() => setLoading(false));
          });
        else {
          setl10nData("en-us")
            .then(() => setLoading(false));
        }
      });
  }, [0]);

  useEffect(() => {
    setl10nData(account?.lang ?? "en-us");
  }, [account]);

  useEffect(() => {
    if (feedbackStateTimeout) clearTimeout(feedbackStateTimeout);
    if (feedbackState) setFeedbackStateTimeout(setTimeout(() => dispatch(hideFeedbackState()), feedbackState.type === FeedbackStateType.Message ? 5000 : 8000));
  }, [feedbackState]);

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
