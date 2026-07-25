"use client";

import Box from "./Box";
import { useEffect, useState } from "react";

export const Prompt = (props: Record<string, any> & {
  // message: string,
  // setMessage: Dispatch<SetStateAction<boolean>>
}) => {
  const [message, setMessage] = useState("");
  const [currentTarget, setCurrentTarget] = useState<EventTarget & HTMLDivElement>();
  const [selection, setSelection] = useState<Selection>();
  const [offset, setOffset] = useState<number>();
  const [caretNode, setCaretNode] = useState<Node>();

  useEffect(() => {
    if (!(currentTarget && selection && offset)) return;

    const promptElement = document.querySelector("div.prompt")!;

    currentTarget.innerHTML = message
      .replace("&", "&amp;")
      .replace("<", "&lt;")
      .replace(">", "&gt;")
      .replace(/@&amp;([a-fa-f0-9]*w[a-fA-f0-9]{14})/gm, "<span class=\"mention\" spellcheck=\"false\">@&amp;<code>$1</code></span>")
      .replace(/@([a-zA-Z0-9_.-]{0,19}[a-zA-Z0-9_-])/gm, "<span class=\"mention\" spellcheck=\"false\">@$1</span>");

    const newRange = document.createRange();

    console.log(caretNode!.parentElement ?? promptElement, offset);
    newRange.setStart(caretNode!.parentElement ?? promptElement, offset);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
  }, [message]);

  return (
    <Box {...props} className={"rounded-2xl " + props.className}>
      <div
        suppressContentEditableWarning
        contentEditable
        className="outline-none p-1 prompt"
        onInput={(event) => {
          event.preventDefault();

          const sel = getSelection()!;
          const range = sel.getRangeAt(0);

          setCurrentTarget(event.currentTarget);
          setSelection(sel);
          setOffset(range.startOffset);
          setCaretNode(range.startContainer);

          setMessage(event.currentTarget.innerText);
        }}
        style={{
          fontFamily: message.trim().startsWith("/") ? "Maple Mono" : "inherit"
        }}
      />
    </Box>
  )
}
