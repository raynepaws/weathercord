"use client";

import ActionRow from "../ActionRow/ActionRow";
import { AuthorizedAccountFromAPI, ConnectionType } from "@/db/schema";
import Box from "../Box/Box";
import DefaultMessage from "../DefaultMessage/DefaultMessage";
import { Globe } from "lucide-react";
import { ReactNode, useState } from "react";

interface ConnectionOption {
  icon: ReactNode,
  type: ConnectionType
};

const connectionOptions: ConnectionOption[] = [
  {
    icon: <Globe />,
    type: ConnectionType.Domain
  }
];

const ConnectionsTab = () => {
  return (
    <>
      <h1><DefaultMessage id="settings.tab.connections" /></h1>
      <ActionRow>
        {connectionOptions.map((connectionOption, index) => {
          return (
            <button key={index} className="cursor-pointer active:*:scale-95">
              <Box className="rounded-xl p-1 transition">
                {connectionOption.icon}
              </Box>
            </button>
          );
        })}
      </ActionRow>
    </>
  )
}

export default ConnectionsTab;
