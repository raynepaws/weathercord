import { ReactNode } from "react";

const Box = (props: Record<string, any> & {
  children?: ReactNode,
  className: string
}) => {
  return (
    <div {...props} className={"outline outline-(--outline) bg-(--background) " + props.className}>{props.children}</div>
  );
};

export default Box;
