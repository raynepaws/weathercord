"use client";

import Box from "../Box/Box";
import DefaultMessage from "../DefaultMessage/DefaultMessage";
import { useState } from "react";
import { languages, setl10nData } from "@/lib/l10n";
import "./LanguageTab.css";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAccount } from "@/lib/store/reducers/account";

const LanguageTab = () => {
  const [lang, setLang] = useState("en-us");

  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);

  return (
    <div className="h-full flex flex-col gap-1">
      <h1><DefaultMessage id="settings.tab.language" /></h1>
      <Box className="grow rounded-2xl">
        <div className="flex flex-col rounded-2xl">
          {languages.map((language, i) => {
            return (
              <button key={i} className={"lang".concat((account?.lang ?? lang) === language.code ? " active" : "")} onClick={() => {
                if (account) {
                  dispatch(updateAccount({
                    lang: language.code
                  }));
                  fetch(`/u/${encodeURIComponent(account.username)}/lang`, {
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
