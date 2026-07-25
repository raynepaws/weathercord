"use client";

import AboutTab from "./AboutTab";
import { BadgeInfo, Database, Globe, Puzzle, User, X } from "lucide-react";
import BoxButton from "../BoxButton";
import { closeModal } from "$/store/reducers/modals";
import ConnectionsTab from "./ConnectionsTab";
import DataTab from "./DataTab";
import DefaultMessage from "../DefaultMessage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LanguageTab from "./LanguageTab";
import Modal from "../Modal";
import { ModalType } from "$/modals";
import ProfileTab from "./ProfileTab";
import TabList, { Tab } from "../TabList";
import { useAppDispatch, useAppSelector } from "$/store/hooks";

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    props.setInitialAccountSettingsTab(0);
  }, [0]);

  return (
    <Modal className="w-65 h-40 flex gap-2 relative">
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
