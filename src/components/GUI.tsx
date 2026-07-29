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
import FeedbackStateIndicator from "./FeedbackStateIndicator";
import CreateStationModal from "./CreateStationModal";
import StationList from "./StationList";

const GUI = () => {
  const [initialAccountSettingsTab, setInitialAccountSettingsTab] = useState(0);

  const account = useAppSelector((state) => state.account);
  const loading = useAppSelector((state) => state.gui.loading.loading);
  const modals = useAppSelector((state) => state.gui.modals);

  if (loading) return (
    <LoadingScreen />
  );

  if (!nullish(account.id)) return (
    <>
      <SignUpModal />
      <FeedbackStateIndicator />
    </>
  );

  return (
    <>
      <div className="contents" inert={Object.values(modals).includes(true)}>
        <StationList />
        <UserIndicator className="w-20" canEdit />
        <Prompt className="absolute bottom-1 left-22" style={{
          width: "calc(100vw - 23rem)"
        }} />
      </div>

      {modals[ModalType.AccountSettings] &&
        <AccountSettingsModal startingTab={initialAccountSettingsTab} setInitialAccountSettingsTab={setInitialAccountSettingsTab} />
      }

      {modals[ModalType.CreateModal] &&
        <CreateStationModal />
      }


      <FeedbackStateIndicator />
    </>
  );
};

export default GUI;
