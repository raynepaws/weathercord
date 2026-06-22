"use client";

import { APP_NAME } from "@/lib/constants";
import { l10nValue } from "@/lib/l10n.generated";
import { l10nStore, localize } from "@/lib/l10n";
import { ReactNode, useSyncExternalStore } from "react";
import reactStringReplace from "react-string-replace";

const DefaultMessage = (props: {
  id: l10nValue,
  values?: Record<string, ReactNode | string>
}) => {
  const localizedStore = useSyncExternalStore(l10nStore.subscribe, l10nStore.getSnapshot); // update all DefaultMessages when language changes

  let data: string | ReactNode[] = localize(props.id);
  data = data.replaceAll("{{APP_NAME}}", props.values?.APP_NAME as string ?? localizedStore?.APP_NAME ?? APP_NAME);

  for (const key in props.values) {
    data = reactStringReplace(data, `{{${key}}}`, (_, i) => (
      <span key={Math.random()}>
        {props.values?.[key]}
      </span>
    ));
  }
  return data;
};

export const defaultMessage = (id: l10nValue, values?: Record<string, string>) => {
  const localizedStore = useSyncExternalStore(l10nStore.subscribe, l10nStore.getSnapshot); // update all DefaultMessages when language changes

  let data = localize(id);
  data = data.replaceAll("{{APP_NAME}}", values?.APP_NAME ?? localizedStore?.APP_NAME ?? APP_NAME);

  for (const key in values) {
    data = data.replaceAll(`{{${key}}}`, values[key]);
  }
  return data;
}

export default DefaultMessage;
