import { AuthorizedAccountFromAPI } from "@/db/schema";
import DefaultMessage from "./DefaultMessage";
import { Dispatch, SetStateAction, useState } from "react";

const UsernameInput = (props: {
  account?: AuthorizedAccountFromAPI,
  username: string,
  setUsername: Dispatch<SetStateAction<string>>
}) => {
  const [usernameError, setUsernameError] = useState("");
  const [thinking, setThinking] = useState(false);
  return (
    <label>
      <div>{usernameError ? <span className="error">{usernameError}</span> : <DefaultMessage id="settings.tab.profile.username" />}</div>
      <input
        type="text"
        value={props.username}
        disabled={thinking}
        onChange={(event) => {
          props.setUsername(event.currentTarget.value.replace(/[^a-zA-Z0-9-_.]/g, ""));
          setUsernameError("");
        }}
        onBlur={async (event) => {
          if (event.currentTarget.value.length > 20) return setUsernameError("Username is too long");
          if (event.currentTarget.value.endsWith(".")) return setUsernameError("Username cannot end with a period");
          if (event.currentTarget.value.endsWith("-")) return setUsernameError("Username cannot end with a dash");
          if (event.currentTarget.value === props.account?.username) return setUsernameError("");
          setThinking(true);
          const res = await fetch(`/u/${encodeURIComponent(event.currentTarget.value)}`, {
            method: "HEAD"
          });
          setThinking(false);
          if (res.ok) return setUsernameError("Username is taken");
          setUsernameError("");
        }}
        className={usernameError ? "error" : ""}
      />
    </label>
  );
};

export default UsernameInput;
