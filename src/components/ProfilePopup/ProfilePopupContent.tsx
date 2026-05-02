"use client";

import Badge from "./Badge";
import { contributors } from "@/lib/contributors";
import { Cake, Heart, Shield, Star } from "lucide-react";
import type { PublicAccount } from "@/db/schema";
import UsernameIDSwitcher from "./UsernameIDSwitcher";

const ProfilePopupContent = (props: Record<string, any> & PublicAccount & {
  avatar: string,
  canEdit?: boolean,
  splash?: string
}) => {
  return (
    <div className={"text-left " + props.className} style={props.style}>
      {props.splash &&
        <div className="h-7 w-full -mb-7" aria-hidden style={{
          backgroundImage: `url(${props.splash})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />
      }
      <div className="p-1 pt-5 flex flex-col gap-1" style={{
        backgroundImage: `linear-gradient(180deg, transparent, var(--background) 7rem)`
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
            <Badge color="#ff879f" icon={<Star />} value="Founder" />
          }
          {props.admin &&
            <Badge color="#6bc1ff" icon={<Shield />} value="Administrator" />
          }
          {contributors.includes(props.id) &&
            <Badge color="#ff87cf" icon={<Heart />} value="Source Code Contributor" />
          }
          <Badge color="#ffc2fc" icon={<Cake />} value={`Joined ${new Date(props.joined).toLocaleDateString()}`} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePopupContent;
