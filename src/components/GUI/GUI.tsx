"use client";

import AccountSettingsModal from "../AccountSettingsModal/AccountSettingsModal";
import { AuthorizedAccountFromAPI } from "@/db/schema";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { ModalType } from "@/lib/modals";
import { Prompt } from "../Prompt/Prompt";
import { setl10nData } from "@/lib/l10n";
import SignUpModal from "../SignUpModal/SignUpModal";
import { useEffect, useState } from "react";
import UserIndicator from "../UserIndicator/UserIndicator";
import { useAppSelector } from "@/lib/store/hooks";

const GUI = () => {
  const [account, setAccount] = useState<AuthorizedAccountFromAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialAccountSettingsTab, setInitialAccountSettingsTab] = useState(0);

  const modal = useAppSelector((state) => state.gui.modals);

  useEffect(() => {
    fetch("/whoami")
      .then((res) => {
        if (res.ok) res.json()
          .then((account) => {
            setAccount(account);
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

  if (!account) {
    if (loading) return (
      <LoadingScreen />
    );
    else return (
      <SignUpModal />
    );
  }

  return (
    <>
      <div className="contents">
        <UserIndicator className="w-20" canEdit {...account} />
        <Prompt className="absolute bottom-1 left-22" style={{
          width: "calc(100vw - 23rem)"
        }} />
      </div>

      {modal[ModalType.AccountSettings] &&
        <AccountSettingsModal account={account} setAccount={setAccount} startingTab={initialAccountSettingsTab} setInitialAccountSettingsTab={setInitialAccountSettingsTab} />
      }
    </>
  );
};

export default GUI;
