"use client";

import GUI from "./GUI";
import { useEffect, useState } from "react";
import { setl10nData } from "@/lib/l10n";
import { updateAccount } from "@/lib/store/reducers/account";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { hideFeedbackState } from "@/lib/store/reducers/feedbackState";
import { FeedbackStateType } from "@/lib/feedbackState";
import { stopLoading } from "@/lib/store/reducers/loading";
import { AuthorizedAccountFromAPI } from "@/db/schema";

const App = () => {
  const [feedbackStateTimeout, setFeedbackStateTimeout] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);
  const feedbackState = useAppSelector((state) => state.gui.feedbackState);

  useEffect(() => {
    fetch("/whoami")
      .then((res) => {
        if (res.ok) res.json()
          .then((account: AuthorizedAccountFromAPI) => {
            dispatch(updateAccount(account));
            setl10nData(account.lang)
              .then(() => dispatch(stopLoading()));
          });
        else {
          setl10nData("en-us")
            .then(() => dispatch(stopLoading()));
        }
      });
  }, [0]);

  useEffect(() => {
    setl10nData(account?.lang ?? "en-us");
  }, [account]);

  useEffect(() => {
    if (feedbackStateTimeout) clearTimeout(feedbackStateTimeout);
    if (feedbackState) setFeedbackStateTimeout(setTimeout(() => dispatch(hideFeedbackState()), feedbackState.type === FeedbackStateType.Message ? 5000 : 8000));
  }, [feedbackState]);

  return <GUI />;
};

export default App;
