"use client";

import AboutTab from "../AccountSettingsModal/AboutTab";
import { APP_NAME } from "@/lib/constants";
import DefaultMessage, { defaultMessage } from "../DefaultMessage/DefaultMessage";
import { Globe } from "lucide-react";
import LanguageTab from "../AccountSettingsModal/LanguageTab";
import Modal from "../Modal/Modal";
import UsernameInput from "../UsernameInput/UsernameInput";
import { useState } from "react";

const pictures = 10;

let picture1 = Math.floor(Math.random() * pictures);
let picture2;
do {
  picture2 = Math.floor(Math.random() * pictures);
} while (picture1 === picture2);

let picture1Top = Math.random();
let picture1Width = Math.random();
let picture2Top = Math.random();
let picture2Width = Math.random();

const Pictures = () => (
  <>
    <img className="rounded-2xl absolute z-[-1] -translate-x-1/2 -translate-y-1/2 transition hover:scale-105" src={"/signup/" + picture1 + ".png"} aria-hidden style={{
      top: `calc(55% + ${picture1Top * 10}%)`,
      left: "calc(50% - 15rem)",
      width: `${picture1Width * 7 + 14}rem`
    }} />
    <img className="rounded-2xl absolute z-[-1] -translate-x-1/2 -translate-y-1/2 transition hover:scale-105" src={"/signup/" + picture2 + ".png"} aria-hidden style={{
      top: `calc(35% + ${picture2Top * 10}%)`,
      left: "calc(50% + 15rem)",
      width: `${picture2Width * 7 + 14}rem`
    }} />
  </>
);

const SignUpModal = () => {
  let [aboutOpen, setAboutOpen] = useState(false);
  let [langOpen, setLangOpen] = useState(false);

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [password2, setPassword2] = useState("");

  let [error, setError] = useState("");

  return (
    <>
      <Modal className={"p-0! grid grid-rows-1 grid-flow-col relative ".concat(aboutOpen || langOpen ? "w-70" : "w-30")} style={{
        transition: "0.5s width"
      }}>
        <Pictures />
        <div className={"flex flex-col gap-0.5 w-30 p-2".concat(aboutOpen || langOpen ? " pr-1" : "")} style={{
          transition: "0.5s padding"
        }}>
          <div className="p-0">
            <img className="w-12 m-auto" src="/Weathercord.svg" alt={APP_NAME} />
            <h1 className="text-center"><DefaultMessage id="sign-up.header" /></h1>
          </div>
          <form onSubmit={async (event) => {
            event.preventDefault();
            if (password !== password2) {
              setError("Passwords don't match");
              return;
            }

            const res = await fetch(`/u/${username}`, {
              method: "POST",
              body: JSON.stringify({
                password
              })
            });

            if (!res.ok) {
              setError(await res.text());
              return;
            }
          }}>
            <UsernameInput username={username} setUsername={setUsername} />
            <label>
              <div><DefaultMessage id="sign-up.password-1" /></div>
              <input type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
            </label>
            <label>
              <div><DefaultMessage id="sign-up.password-2" /></div>
              <input type="password" value={password2} onChange={(event) => setPassword2(event.currentTarget.value)} />
            </label>
            <input type="submit" value={defaultMessage("sign-up.submit")} />
          </form>
          <div style={{
            boxSizing: "content-box",
            height: `${error.length > 0 ? 1 : 0}lh`,
            overflow: "hidden",
            paddingTop: `${error.length > 0 ? 1 : 0}rem`,
            transition: "0.25s"
          }}>{error}</div>
          <sub>
            <div className="flex gap-1 justify-center items-center">
              <a href="#" onClick={(event) => {
                event.preventDefault();
                setAboutOpen(!aboutOpen);
                setLangOpen(false);
              }} className={"transition".concat(aboutOpen ? " text-(--accent)" : "")}><DefaultMessage id="settings.tab.about" /></a>
              <a href="#" onClick={(event) => {
                event.preventDefault();
                setAboutOpen(false);
                setLangOpen(!langOpen);
              }} className={"transition".concat(langOpen ? " text-(--accent)" : "")}><Globe /></a>
            </div>
          </sub>
        </div>
        <div className={"pb-2 pl-1 h-full right-0 top-0 absolute ".concat(aboutOpen ? "w-40 pr-2 overflow-y-auto overflow-x-hidden" : "w-0 pr-0 overflow-hidden")} style={{
          transition: "0.5s width, 0.5s padding"
        }}>
          <div className="w-37 min-h-full">
            <AboutTab />
          </div>
        </div>
        <div className={"p-2 pl-1 h-full right-0 top-0 absolute overflow-y-auto overflow-x-hidden ".concat(langOpen ? "w-40" : "w-0 pr-0")} style={{
          transition: "0.5s width, 0.5s padding"
        }}>
          <div className="w-37 h-full">
            <LanguageTab />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignUpModal;
