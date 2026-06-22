"use client";

import { AuthorizedAccountFromAPI } from "@/db/schema";
import Box from "../Box/Box";
import DefaultMessage from "../DefaultMessage/DefaultMessage";
import { Dispatch, SetStateAction, useState } from "react";
import { languages, setl10nData } from "@/lib/l10n";
import "./LanguageTab.css";

const LanguageTab = (props: {
  account?: AuthorizedAccountFromAPI,
  setAccount?: Dispatch<SetStateAction<AuthorizedAccountFromAPI | null>>
}) => {
  const [lang, setLang] = useState("en-us");
  return (
    <div className="h-full flex flex-col gap-1">
      <h1><DefaultMessage id="settings.tab.language" /></h1>
      <Box className="grow rounded-2xl">
        <div className="flex flex-col rounded-2xl">
          {languages.map((language, i) => {
            return (
              <button key={i} className={"lang".concat(props.account?.lang ?? lang === language.code ? " active" : "")} onClick={() => {
                if (props.account && props.setAccount) {
                  props.setAccount({
                    ...props.account,
                    lang: language.code
                  });
                  fetch(`/u/${encodeURIComponent(props.account.username)}/lang`, {
                    method: "PUT",
                    body: JSON.stringify({
                      lang: language.code
                    })
                  });
                } else {
                  setLang(language.code);
                  setl10nData(language.code);
                }
              }}>
                <div className="transition">
                  <img src={`/l10n/icons/${language.code}.svg`} aria-hidden />
                  <span>{language.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </Box>
    </div>
  )
};

export default LanguageTab;
