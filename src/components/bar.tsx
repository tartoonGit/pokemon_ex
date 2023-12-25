import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import "./bar.css";
import ListPokemon from "./listPokemon";
import { Poke } from "./../interface/myType";

interface props {
  brightness: number;
  setPokemon: React.Dispatch<React.SetStateAction<Poke>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Bar = (props: props) => {
  const drawer = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const showDrawer = () => {
    drawer.current?.classList.add("show-drawer");
  };
  const hiddenDrawer = () => {
    drawer.current?.classList.remove("show-drawer");
  };
  const filterPoke = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
  };

  return (
    <>
      <FontAwesomeIcon
        icon="bars"
        onClick={showDrawer}
        className={`text-3xl cursor-pointer ${
          props.brightness < 128 ? "text-white" : "text-black"
        }`}
      />
      <div
        ref={drawer}
        className="h-full w-72 bg-white fixed border-l-8 border-inherit drop-shadow-xl bottom-0 right-0 invisible translate-x-[280px] transition-all duration-500 "
      >
        <div className="flex flex-row justify-around pt-3 items-center">
          <FontAwesomeIcon
            icon="arrow-right"
            onClick={hiddenDrawer}
            className="text-3xl cursor-pointer text-black clost"
          />
          <label className=" block relative">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FontAwesomeIcon
                className="text-slate-300"
                icon="magnifying-glass"
              />
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
              value={search}
              onChange={filterPoke}
            />
          </label>
        </div>
        <ListPokemon
          setPokemon={props.setPokemon}
          setActive={props.setActive}
          search={search}
        />
      </div>
    </>
  );
};

export default Bar;
