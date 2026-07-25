import { ReactNode } from "react";

const ActionRow = (props: {
  children: ReactNode
}) => {
  return (
    <div className="flex gap-1 *:grow">{props.children}</div>
  );
};

export default ActionRow;
