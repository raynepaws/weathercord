"use client";

import { ReactNode, useState } from "react";
import "./badgeStyles.css";
import { Plus } from "lucide-react";

const Badge = (props: {
  color: string
  icon: ReactNode
  value: string | ReactNode
  description?: string
  startOpen?: boolean
}) => {
  const [hover, setHover] = useState(false);
  const [timeout, setTimeoutState] = useState(setTimeout(() => {}));
  const [clicked, toggleClicked] = useState(props.startOpen ? props.startOpen : false);
  return (
    <div className={"" + (props.description ? "badge" : "")} onClick={() => toggleClicked(prev => !prev)} style={
      {
        height: (clicked ? "6ch" : "3ch")
      }}>
    <sub className="badge flex gap-[0.2rem] items-center select-none transition" 
    style={{
      color: props.color,
      padding: "0.3rem 0"
    }} 
    onMouseEnter={() => {
      clearTimeout(timeout);
      setHover(false);
      setTimeout(() => {
        setHover(true);
        setTimeoutState(setTimeout(() => setHover(false), 2000));
      }, 40); // race conditions in MY weathercord?!?
    }}>
    <div className={hover ? "hover" : ""}>{props.icon}</div><span>{props.value}</span>{(props.description ? <Plus /> : <></>)}</sub>
    <p className="desc badge">{props.description}</p>
    </div>
  );
};

export default Badge;
