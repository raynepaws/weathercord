import Box from "../Box/Box";
import { ReactNode } from "react"

const Modal = (props: Record<string, any> & {
  children: ReactNode
}) => {
  return (
    <div className="backdrop-blur-sm backdrop-brightness-40 w-screen h-screen p-2 absolute top-0 left-0 flex items-center justify-center">
      <Box className={"p-2 rounded-2xl w-30 " + props.className} style={{
        boxShadow: "0 0.5rem 2rem #000000bb",
        ...props.style
      }}>{props.children}</Box>
    </div>
  );
};

export default Modal;
