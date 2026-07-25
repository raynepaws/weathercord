"use client";

import Badge from "./Badge";
import { contributors } from "$/contributors";
import { Cake, Globe, Heart, Shield, Star } from "lucide-react";
import { ConnectionType, type PublicAccount } from "@/db/schema";
import convert from "color-convert";
import { CSSProperties } from "react";
import DefaultMessage from "../DefaultMessage";
import { ModalType } from "$/modals";
import UsernameIDSwitcher from "./UsernameIDSwitcher";
import { languages } from "$/l10n";
import { nullish } from "$/typing";
import { openModal } from "$/store/reducers/modals";
import { useAppDispatch } from "$/store/hooks";

const ProfilePopupContent = (props: PublicAccount & {
  canEdit?: boolean,
  className?: string,
  style?: CSSProperties
}) => {
  let accent1 = props.accent1;
  let accent2 = props.accent2;
  if (accent1 && accent2) {
    let a1 = convert.hex.hsv(accent1);
    a1[2] = Math.min(a1[2], 30);
    accent1 = "#" + convert.hsl.hex(a1);

    let a2 = convert.hex.hsv(accent2);
    a2[2] = Math.min(a2[2], 30);
    accent2 = "#" + convert.hsl.hex(a2);
  }

  const dispatch = useAppDispatch();

  return (
    <div className={"profileCard text-left " + props.className} style={props.style}>
      {props.banner &&
        <div className="h-7 w-full -mb-7" aria-hidden style={{
          backgroundImage: `url(${props.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />
      }
      <div className="p-1 pt-5 flex flex-col gap-1" style={{
        backgroundImage: `linear-gradient(180deg, transparent, ${accent1 ?? "var(--background)"} 7rem, ${accent2 ?? "var(--background)"})`
      }}>
        <div className="flex gap-1">
          <img className="rounded-full w-6 h-6 bg-black" src={props.avatar} alt={props.displayName + "'s avatar"} />
          <div>
            <div className="text-2xl font-bold" style={{
              fontFamily: props.nameFont ?? "inherit"
            }}>{props.displayName ?? props.username}</div>
            <sub><UsernameIDSwitcher id={props.id} username={props.username} /></sub><br />
            <sub>{props.pronouns}</sub>
          </div>
        </div>
        {props.bio &&
          <div className="whitespace-pre-line">{props.bio}</div>
        }
        <div>
          {props.id === "0w1bcb00925be5d2" &&
            <Badge color="#ff879f" icon={<Star />} value={(
              <DefaultMessage id="badge.founder" />
            )} />
          }
          {props.admin &&
            <Badge color="#6bc1ff" icon={<Shield />} value={(
              <DefaultMessage id="badge.admin" />
            )} />
          }
          {contributors.some((contributor) => contributor.id === props.id) &&
            <Badge color="#ff87cf" icon={<Heart />} value={(
              <DefaultMessage id="badge.contributor" />
            )} />
          }
          {props.showLang && (() => {
            const language = languages.find((language) => language.code === props.lang);
            if (!language) return;
            return (
              <Badge color="#ffbddb" icon={<img className="lucide w-[1.5rem] saturate-0 opacity-75 transition" src={`/l10n/icons/${language.code}.svg`} />} value={(
                <span>{language.name}</span>
              )} />
            )
          })()
          }
          <Badge color="#ffc2fc" icon={<Cake />} value={(
              <DefaultMessage
                id="badge.joined"
                values={{
                  date: new Date(props.joined).toLocaleDateString()
                }}
              />
            )} />
        </div>
        {props.connections.length > 0 &&
          <div>
            {props.connections.map((connection, index) => {
              if (connection.type === ConnectionType.Domain) {
                return <Badge key={index} color="#bad4e8" icon={<Globe />} value={<a href={"//" + connection.value}>{connection.value}</a>} />;
              }
            })}
          </div>
        }
      {props.canEdit && (
        <button className="action" onClick={() => dispatch(openModal(ModalType.AccountSettings))}><DefaultMessage id="profile-popup.edit" /></button>
      )}
      </div>
    </div>
  );
};

export default ProfilePopupContent;
