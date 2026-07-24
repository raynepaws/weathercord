// this is really messy and i really don't wanna fix it. so whatever.

import type { AuthorizedAccountFromAPI } from "@/db/schema";
import Box from "../Box/Box";
import convert from "color-convert";
import { Dispatch, SetStateAction } from "react";
import { ModalType } from "@/lib/modals";
import ProfilePopupContent from "../ProfilePopup/ProfilePopupContent";
import UserIndicatorClient from "./UserIndicatorClient";
import UserIndicatorContentClient from "./UserIndicatorContentClient";
import UserIndicatorSmall from "./UserIndicatorSmall";

const UserIndicator = (props: Record<string, any> & AuthorizedAccountFromAPI & {
  canEdit: boolean
}) => {
  let accent2 = props.accent2;
  if (accent2) {
    let a2 = convert.hex.hsv(accent2);
    a2[2] = Math.min(a2[2], 30);
    accent2 = "#" + convert.hsl.hex(a2);
  }

  return (
    <Box className="absolute bottom-1 left-1 rounded-2xl overflow-hidden w-20">
      <div className="overflow-hidden" style={{
        transition: "height 0.25s",
        backgroundColor: accent2 ?? "var(--background)"
      }}>
        <UserIndicatorContentClient>
          <ProfilePopupContent {...props} />
        </UserIndicatorContentClient>
      </div>
      <UserIndicatorClient>
        <UserIndicatorSmall {...props} />
      </UserIndicatorClient>
    </Box>
  );
};

export default UserIndicator;
