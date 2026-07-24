"use client";

import AboutTab from "./AboutTab";
import { BadgeInfo, Database, Globe, LoaderCircle, Puzzle, User, X } from "lucide-react";
import Box from "../Box/Box";
import BoxButton from "../BoxButton/BoxButton";
import { closeModal } from "@/lib/store/reducers/modals";
import ConnectionsTab from "./ConnectionsTab";
import DataTab from "./DataTab";
import DefaultMessage from "../DefaultMessage/DefaultMessage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FeedbackStateType } from "@/lib/feedbackState";
import { hideFeedbackState } from "@/lib/store/reducers/feedbackState";
import LanguageTab from "./LanguageTab";
import Modal from "../Modal/Modal";
import { ModalType } from "@/lib/modals";
import ProfileTab from "./ProfileTab";
import TabList, { Tab } from "../TabList/TabList";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export enum ModalTab {
  Profile = 0,
  Connections = 1,
  Language = 2,
  Data = 3,
  About = 4
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
  setInitialAccountSettingsTab: Dispatch<SetStateAction<number>>,
  startingTab?: ModalTab
}) => {
  let [tab, setTab] = useState(props.startingTab || ModalTab.Profile);
  let [feedbackStateTimeout, setFeedbackStateTimeout] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();
  const feedbackState = useAppSelector((state) => state.gui.feedbackState);

  useEffect(() => {
    props.setInitialAccountSettingsTab(0);
  }, [0]);

  useEffect(() => {
    if (feedbackStateTimeout) clearTimeout(feedbackStateTimeout);
    if (feedbackState) setFeedbackStateTimeout(setTimeout(() => dispatch(hideFeedbackState()), feedbackState.type === FeedbackStateType.Message ? 5000 : 8000));
  }, [feedbackState]);

  return (
    <Modal className="w-65 h-40 flex gap-2 relative">
      <Box className={"p-1 rounded-2xl absolute -bottom-1.5 right-1/2 select-none transition bg-transparent backdrop-blur-sm pointer-events-none" + (feedbackState?.type === FeedbackStateType.Error ? " bg-(--error-background)! outline-(--error-outline)!" : "")} style={{
        translate: "50%",
        scale: feedbackState.visible ? "1" : "0.8",
        opacity: feedbackState.visible ? "1" : "0"
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
      <BoxButton className="absolute top-1 right-1 backdrop-blur-sm" onClick={() => dispatch(closeModal(ModalType.AccountSettings))}><X /></BoxButton>
      <TabList className="w-16 shrink-0 -m-2 p-2 pr-1 -mr-1 relative" tab={tab} tabList={tabList} setTab={setTab} />
      <div className="grow overflow-auto -m-2 p-2 pl-1 -ml-1">
        {tab === ModalTab.Profile &&
          <ProfileTab />
        }
        {tab === ModalTab.Connections &&
          <ConnectionsTab />
        }
        {tab === ModalTab.Language &&
          <LanguageTab />
        }
        {tab === ModalTab.Data &&
          <DataTab />
        }
        {tab === ModalTab.About &&
          <AboutTab />
        }
      </div>
    </Modal>
  );
};

export default AccountSettingsModal;
