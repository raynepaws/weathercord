"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface Tab {
  icon: ReactNode;
  name: string | ReactNode;
  url?: string;
}

const TabList = (props: {
  className?: string,
  tab: number,
  tabList: Tab[],
  setTab: Dispatch<SetStateAction<number>>
}) => {
  const tabs = Object.keys(props.tabList).filter((value) => isNaN(parseInt(value))).length - 1;

  let [mouseDown, setMouseDown] = useState(false);
  let [hoveredTab, setHoveredTab] = useState(tabs + 1 + props.tab);
  let [tabY, setTabY] = useState(props.tab + 1);

  requestAnimationFrame(() => {
    if (Math.abs(hoveredTab - tabs - tabY) > 0.0000001) setTabY(tabY + (hoveredTab - tabs - tabY) / 3);
  });

  return <div className={"overflow-auto " + props.className} onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)}>
    <div className="rounded-xl absolute" style={{
      width: `calc(100% - 3rem - ${Math.abs(hoveredTab - tabs - tabY)}rem * 7)`,
      height: `calc(1lh + 0.8rem + ${Math.abs(hoveredTab - tabs - tabY)}rem * 2)`,
      left: "8.5rem",
      top: `calc((1lh + 0.8rem) * ${tabY} + (0.5lh + 0.2rem))`,
      translate: "-50% -50%",
      transition: "width 0.2s, height 0.25s, top 0.1s, background-color 0.3s, scale 0.3s",
      backgroundColor: props.tab === (hoveredTab - tabs - 1) ? "var(--accent-background)" : "var(--box-button-active)",
      scale: mouseDown ? 0.95 : 1
    }} />
    <div className="contents" onMouseLeave={() => setHoveredTab(props.tab + tabs + 1)}>
      {props.tabList.map((t, index) => {
        return (
          <button key={index} onMouseEnter={() => setHoveredTab(index)} className="w-full p-[0.4rem] block text-left cursor-pointer relative z-1 transition active:*:scale-95 hover:text-inherit" onClick={() => props.setTab(index)}>
            <div className={"flex items-center gap-[0.4rem] text-(--sub) transition" + (props.tabList[props.tab] === t ? " text-(--accent)!" : "")}>
              {t.icon}{t.name}
            </div>
          </button>
        );
      })}
    </div>
  </div>
};

export default TabList;
