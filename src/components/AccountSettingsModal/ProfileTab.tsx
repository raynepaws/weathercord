"use client";

import Box from "../Box/Box";
import DefaultMessage, { defaultMessage } from "../DefaultMessage/DefaultMessage";
import { useState } from "react";
import { nullish } from "$/typing";
import ProfilePopupContent from "../ProfilePopup/ProfilePopupContent";
import UsernameInput from "../UsernameInput/UsernameInput";
import { useAppDispatch, useAppSelector } from "$/store/hooks";
import { FeedbackStateType } from "$/feedbackState";
import { showFeedbackState } from "$/store/reducers/feedbackState";
import { updateAccount } from "$/store/reducers/account";

const ProfileTab = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);

  let [customAccent, setCustomAccent] = useState(!!account.accent1);
  let [accent1, setAccent1] = useState(account.accent1 ?? "#000000");
  let [accent2, setAccent2] = useState(account.accent2 ?? "#000000");
  let [avatarFile, setAvatarFile] = useState<File | null>(null);
  let [avatarPreviewURL, setAvatarPreviewURL] = useState(`/u/${account.username}/a`);
  let [bannerFile, setBannerFile] = useState<File | null>(null);
  let [bannerPreviewURL, setBannerPreviewURL] = useState(`/u/${account.username}/b`);
  let [bio, setBio] = useState(account.bio ?? "");
  let [displayName, setDisplayName] = useState(account.displayName ?? "");
  let [showLang, setShowLang] = useState(!!account.showLang);
  let [nameFont, setNameFont] = useState(account.nameFont ?? "");
  let [pronouns, setPronouns] = useState(account.pronouns ?? "");
  let [username, setUsername] = useState(account.username);

  return (
    <div className="flex gap-2 items-start">
      <div className="grow">
        <form onSubmit={async (event) => {
          event.preventDefault();

          dispatch(showFeedbackState({
            type: FeedbackStateType.Loading
          }));

          const res = await fetch(`/u/${account.username}`, {
            method: "PUT",
            body: JSON.stringify({
              accent1,
              accent2,
              avatar: avatarFile ? avatarPreviewURL : null,
              banner: bannerFile ? bannerPreviewURL : null,
              bio,
              displayName,
              pronouns,
              showLang,
              nameFont,
              username
            })
          });

          if (!res.ok) {
            dispatch(showFeedbackState({
              type: FeedbackStateType.Error,
              message: await res.text()
            }));
            return;
          }

          dispatch(updateAccount({
            accent1: customAccent ? accent1 : null,
            accent2: customAccent ? accent2 : null,
            avatar: avatarPreviewURL,
            banner: bannerPreviewURL,
            bio: nullish(bio.trim()),
            displayName: nullish(displayName.trim()),
            showLang: showLang,
            nameFont: nullish(nameFont),
            pronouns: nullish(pronouns),
            username
          }));
          dispatch(showFeedbackState({
            type: FeedbackStateType.Message,
            message: "Saved profile"
          }));
        }}>
          <label>
            <div><DefaultMessage id="settings.tab.profile.avatar" /></div>
            <input type="file" onChange={(event) => {
              const avatarFile = event.currentTarget.files?.item(0);
              if (!avatarFile || !event.currentTarget.files) return;
              setAvatarFile(avatarFile);
              const reader = new FileReader();
              reader.onloadend = () => setAvatarPreviewURL(reader.result?.toString() ?? `/u/${username}/a`);
              reader.readAsDataURL(avatarFile);
            }} />
            <div><DefaultMessage
              id="settings.tab.profile.avatar.help"
              values={{
                limit: "1"
              }}
            /></div>
          </label>
          <label>
            <div><DefaultMessage id="settings.tab.profile.banner" /></div>
            <input type="file" onChange={(event) => {
              const bannerFile = event.currentTarget.files?.item(0);
              if (!bannerFile || !event.currentTarget.files) return;
              setBannerFile(bannerFile);
              const reader = new FileReader();
              reader.onloadend = () => setBannerPreviewURL(reader.result?.toString() ?? `/u/${username}/b`);
              reader.readAsDataURL(bannerFile);
            }} />
            <div><DefaultMessage
              id="settings.tab.profile.banner.help"
              values={{
                limit: "1"
              }}
            /></div>
          </label>
          <label>
            <div><DefaultMessage id="settings.tab.profile.display-name" /></div>
            <input type="text" value={displayName} placeholder={username} onChange={(event) => setDisplayName(event.currentTarget.value)} />
          </label>
          <label>
            <div><DefaultMessage id="settings.tab.profile.name-font" /></div>
            <select value={nameFont} onChange={(event) => {
              setNameFont(event.target.value);
            }} style={{
              fontFamily: nameFont
            }}>
              <option value=""><DefaultMessage id="settings.tab.profile.name-font.default" /></option>
              <option value="Alfa Slab One"><DefaultMessage id="settings.tab.profile.name-font.bold" /></option>
              <option value="Leckerli One"><DefaultMessage id="settings.tab.profile.name-font.cursive" /></option>
              <option value="Maple Mono"><DefaultMessage id="settings.tab.profile.name-font.monospace" /></option>
              <option value="Merriweather"><DefaultMessage id="settings.tab.profile.name-font.serif" /></option>
              <option value="Goldman"><DefaultMessage id="settings.tab.profile.name-font.techno" /></option>
            </select>
          </label>
          <UsernameInput account={account} username={username} setUsername={setUsername} />
          <label>
            <div><DefaultMessage id="settings.tab.profile.pronouns" /></div>
            <input type="text" value={pronouns} onChange={(event) => setPronouns(event.currentTarget.value)} />
          </label>
          <label>
            <div><input type="checkbox" checked={customAccent} onChange={(event) => setCustomAccent(event.currentTarget.checked)} /> <DefaultMessage id="settings.tab.profile.card-accent" /></div>
            {customAccent && <>
              <input type="color" value={accent1} onChange={(event) => setAccent1(event.currentTarget.value)} />
              <input type="color" value={accent2} onChange={(event) => setAccent2(event.currentTarget.value)} />
            </>}
          </label>
          <label>
            <div><DefaultMessage id="settings.tab.profile.bio" /></div>
            <textarea value={bio} onChange={(event) => setBio(event.currentTarget.value)}></textarea>
          </label>
          <label>
            <div><input type="checkbox" checked={showLang} onChange={(event) => setShowLang(event.currentTarget.checked)} /> <DefaultMessage id="settings.tab.profile.show-language" /></div>
          </label>
          <input type="submit" value={defaultMessage("settings.tab.profile.save")} />
        </form>
      </div>
      <Box className="w-20 rounded-2xl overflow-auto">
        <ProfilePopupContent
          accent1={customAccent ? accent1 : null}
          accent2={customAccent ? accent2 : null}
          admin={account.admin}
          avatar={avatarPreviewURL}
          banner={bannerPreviewURL}
          bio={nullish(bio)}
          connections={account.connections}
          displayName={nullish(displayName)}
          id={account.id}
          joined={account.joined}
          lang={account.lang}
          showLang={showLang}
          nameFont={nullish(nameFont)}
          pronouns={nullish(pronouns)}
          username={username}
        />
      </Box>
    </div>
  )
}

export default ProfileTab;
