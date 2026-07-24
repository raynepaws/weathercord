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

const GUI = () => {
  const [loading, setLoading] = useState(true);
  const [initialAccountSettingsTab, setInitialAccountSettingsTab] = useState(0);

  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);
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

  if (loading) return (
    <LoadingScreen />
  );

  if (!nullish(account.id)) return (
    <SignUpModal />
  );

  return (
    <>
      <div className="contents">
        <UserIndicator className="w-20" canEdit />
        <Prompt className="absolute bottom-1 left-22" style={{
          width: "calc(100vw - 23rem)"
        }} />
      </div>

      {modals[ModalType.AccountSettings] &&
        <AccountSettingsModal startingTab={initialAccountSettingsTab} setInitialAccountSettingsTab={setInitialAccountSettingsTab} />
      }
    </>
  );
};

export default GUI;
