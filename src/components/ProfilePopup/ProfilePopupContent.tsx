"use client";

import Badge from "./Badge";
import { contributors } from "@/lib/contributors";
import convert from "color-convert";
import { Cake, Globe, Heart, Shield, Star, CodeXml } from "lucide-react";
import { ConnectionType, type PublicAccount } from "@/db/schema";
import UsernameIDSwitcher from "./UsernameIDSwitcher";

const ProfilePopupContent = (props: Record<string, any> & PublicAccount & {
  avatar: string,
  canEdit?: boolean,
  splash?: string
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
  console.log(accent1, accent2);

  return (
    <div className={"profileCard text-left " + props.className} style={props.style}>
      {props.splash &&
        <div className="h-7 w-full -mb-7" aria-hidden style={{
          backgroundImage: `url(${props.splash})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />
      }
      <div className="p-1 pt-5 flex flex-col gap-1" style={{
        backgroundImage: `linear-gradient(180deg, transparent, ${accent1 ?? "var(--background)"} 7rem, ${accent2 ?? "var(--background)"})`
      }}>
        <div className="flex gap-1">
          <img className="rounded-full w-6 h-6" src={props.avatar} alt={props.displayName + "'s avatar"} />
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
            <Badge color="#ff879f" icon={<Star />} value="Founder" description="The creator of Weathercord"/>
          }
          {["0w1bcb00925be5d2", "1w053d3942035cb9", "0w049c240cf19df5"].includes(props.id) &&
            <Badge color="#fdff87" icon={<CodeXml />} value="Maintainer" description="Regular contributor to Weathercord" startOpen="true"/>
          }
          {props.admin &&
            <Badge color="#6bc1ff" icon={<Shield />} value="Administrator"/>
          }
          {contributors.some((contributor) => contributor.id === props.id) &&
            <Badge color="#ff87cf" icon={<Heart />} value="Source Code Contributor" description="Contributed at least once to Weathercord" />
          }
          <Badge color="#ffc2fc" icon={<Cake />} value={`Joined ${new Date(props.joined).toLocaleDateString()}`} />
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
      </div>
    </div>
  );
};

export default ProfilePopupContent;
