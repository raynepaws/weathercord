"use client";

import AboutTab from "./AboutTab";
import { AuthorizedAccountFromAPI } from "@/db/schema";
import { BadgeInfo, Database, Globe, LoaderCircle, Puzzle, User, X } from "lucide-react";
import Box from "../Box/Box";
import BoxButton from "../BoxButton/BoxButton";
import ConnectionsTab from "./ConnectionsTab";
import DefaultMessage from "../DefaultMessage/DefaultMessage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LanguageTab from "./LanguageTab";
import Modal from "../Modal/Modal";
import ProfileTab from "./ProfileTab";
import TabList, { Tab } from "../TabList/TabList";
import DataTab from "./DataTab";

export enum ModalTab {
  Profile = 0,
  Connections = 1,
  Language = 2,
  Data = 3,
  About = 4
};

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

const tabList: Tab[] = [
  {
    icon: <User strokeWidth={1.5} />,
    name: <DefaultMessage id="settings.tab.profile" />
  },
  {
    icon: <Puzzle strokeWidth={1.5} />,
    name: <DefaultMessage id="settings.tab.connections" />
  },
  {
    icon: <Globe strokeWidth={1.5} />,
    name: <DefaultMessage id="settings.tab.language" />
  },
  {
    icon: <Database strokeWidth={1.5} />,
    name: <DefaultMessage id="settings.tab.data" />
  },
  {
    icon: <BadgeInfo strokeWidth={1.5} />,
    name: <DefaultMessage id="settings.tab.about" />
  }
];

const AccountSettingsModal = (props: {
  account: AuthorizedAccountFromAPI,
  closeModal: () => void,
  setAccount: Dispatch<SetStateAction<AuthorizedAccountFromAPI | null>>,
  setInitialAccountSettingsTab: Dispatch<SetStateAction<number>>,
  startingTab?: ModalTab
}) => {
  let [tab, setTab] = useState(props.startingTab || ModalTab.Profile);
  // TODO: make feedback states available in all kinds of modals
  let [feedbackState, setFeedbackState] = useState<FeedbackState | null>(null);
  let [feedbackStateShowing, setFeedbackStateShowing] = useState(false);
  let [feedbackStateTimeout, setFeedbackStateTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    props.setInitialAccountSettingsTab(0);
  }, [0]);

  useEffect(() => {
    setFeedbackStateShowing(!!feedbackState);
    if (feedbackStateTimeout) clearTimeout(feedbackStateTimeout);
    if (feedbackState) setFeedbackStateTimeout(setTimeout(() => setFeedbackStateShowing(false), feedbackState.type === FeedbackStateType.Message ? 5000 : 8000));
  }, [feedbackState]);

  return (
    <Modal className="w-65 h-40 flex gap-2 relative">
      <Box className={"p-1 rounded-2xl absolute -bottom-1.5 right-1/2 select-none transition bg-transparent backdrop-blur-sm pointer-events-none" + (feedbackState?.type === FeedbackStateType.Error ? " bg-(--error-background)! outline-(--error-outline)!" : "")} style={{
        translate: "50%",
        scale: feedbackStateShowing ? "1" : "0.8",
        opacity: feedbackStateShowing ? "1" : "0"
      }}>
        {feedbackState &&
          <>
            {feedbackState.type === FeedbackStateType.Loading ?
              <LoaderCircle width="" height="" className="loading-spin" />
            :
              <span>{feedbackState.message}</span>
            }
          </>
        }
      </Box>
      <BoxButton className="absolute top-1 right-1 backdrop-blur-sm" onClick={props.closeModal}><X /></BoxButton>
      <TabList className="w-16 shrink-0 -m-2 p-2 pr-1 -mr-1 relative" tab={tab} tabList={tabList} setTab={setTab} />
      <div className="grow overflow-auto -m-2 p-2 pl-1 -ml-1">
        {tab === ModalTab.Profile &&
          <ProfileTab account={props.account} setAccount={props.setAccount} setFeedbackState={setFeedbackState} />
        }
        {tab === ModalTab.Connections &&
          <ConnectionsTab account={props.account} />
        }
        {tab === ModalTab.Language &&
          <LanguageTab account={props.account} setAccount={props.setAccount} />
        }
        {tab === ModalTab.Data &&
          <DataTab account={props.account} />
        }
        {tab === ModalTab.About &&
          <AboutTab />
        }
      </div>
    </Modal>
  );
};

export default AccountSettingsModal;
