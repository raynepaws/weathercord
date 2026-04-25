import { Settings } from "lucide-react";
import Box from "../Box/Box";
import BoxButton from "../BoxButton/BoxButton";
import { Vibrant } from "node-vibrant/node";

const UserIndicator = async (props: Record<string, any> & {
  avatar: string,
  canEdit: boolean,
  displayName: string,
  splash?: string,
  username: string
}) => {
  const accent = await Vibrant.from(props.avatar).getPalette();

  return (
    <Box className={"p-[0.7rem] rounded-lg h-4 flex gap-[0.7rem] items-center overflow-hidden " + props.className} style={{
      backgroundImage: props.splash ? `linear-gradient(90deg, #000000ab 0%, #00000090 100%), url(${props.splash})` : `linear-gradient(90deg, ${accent.LightVibrant?.hex}31 0%, ${accent.LightVibrant?.hex}20 50%, ${accent.LightVibrant?.hex}10 100%)`,
      backgroundSize: "cover"
    }}>
      <img className="rounded-full h-[2.6rem]" src={props.avatar} alt={props.displayName + "'s avatar"} />
      <div className="leading-1 grow">
        {props.displayName}<br />
        <sub>@{props.username}</sub>
      </div>
      {props.canEdit &&
        <BoxButton>
          <Settings strokeWidth="1.5" />
        </BoxButton>
      }
    </Box>
  );
};

export default UserIndicator;
