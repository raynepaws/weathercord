"use client";

import Box from "../Box/Box";
import BoxButton from "../BoxButton/BoxButton";
import { Dispatch, SetStateAction } from "react";
import { ModalType } from "$/modals";
import type { PublicAccount } from "@/db/schema";
import { Settings } from "lucide-react";
import { useAppDispatch } from "$/store/hooks";
import { openModal } from "$/store/reducers/modals";

const UserIndicatorSmall = (props: Record<string, any> & PublicAccount & {
  avatar: string,
  banner?: string,
  canEdit: boolean
}) => {
  const dispatch = useAppDispatch();

  return (
    <Box className={"p-[0.7rem] text-left h-4 flex gap-[0.7rem] items-center overflow-hidden select-none " + props.className} style={{
      backgroundImage: props.banner ? `linear-gradient(90deg, #000000ab 0%, #00000090 100%), url(${props.banner})` : null,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <img className="rounded-full h-[2.6rem] w-[2.6rem] group-[.open]:-translate-y-10" src={props.avatar.concat("?size=50")} alt={props.displayName + "'s avatar"} style={{
        transition: "translate 0.25s"
      }} />
      <div className="leading-1 grow group-[.open]:-translate-y-10" style={{
        transition: "translate 0.25s"
      }}>
        <span style={{
          fontFamily: props.nameFont ?? "inherit"
        }}>{props.displayName ?? props.username}</span><br />
        <sub>@{props.username}</sub>
      </div>
      {props.canEdit &&
        <BoxButton onClick={(event) => {
          event.stopPropagation();
          dispatch(openModal(ModalType.AccountSettings));
        }}>
          <Settings strokeWidth="1.5" />
        </BoxButton>
      }
    </Box>
  );
};

export default UserIndicatorSmall;
