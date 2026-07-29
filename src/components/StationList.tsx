import Box from "./Box";
import { useAppSelector } from "@/lib/store/hooks";

const abbreviatedName = (name: string) => name.replace(/[^a-zA-Z0-9& ]/g, "").match(/((\b|^)[a-zA-Z0-9&])/g)?.join("");

const StationList = () => {
  const stations = useAppSelector((state) => state.stations.stations);

  return (
    <Box className="w-4 p-0.5 absolute left-1 top-1 rounded-2xl flex flex-col gap-0.5" style={{
      height: "calc(100vh - 7rem)"
    }}>
      {stations.map((station, i) => {
        return (
          <button key={i} className="w-3 h-3 rounded-xl cursor-pointer bg-(--outline)">{abbreviatedName(station.name)}</button>
        );
      })}
    </Box>
  );
};

export default StationList;
