import { useState, useEffect } from "react";
import { listPokemon, loadPokemon } from "./../api/pokeApi";
import { Poke } from "./../interface/myType";

interface props {
  setPokemon: React.Dispatch<React.SetStateAction<Poke>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
}

const ListPokemon = (props: props) => {
  interface listPoke {
    count: number;
    results: [
      {
        id: number;
        name: string;
        url: string;
      }
    ];
  }
  const [listData, setListData] = useState<listPoke>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleListPokemon();
  }, []);

  const handleListPokemon = () => {
    setLoading(true);
    try {
      listPokemon().then(async (res) => {
        setListData(res);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPokemon = (number?: number) => {
    setLoading(true);
    loadPokemon(number).then(async (res) => {
      props.setPokemon(res);
      props.setActive(true);
      setLoading(false);
    });
  };
  const getPokemonIdFromUrl = (url:string) => {
    const urlParts = url.split("/");
    return Number(urlParts[urlParts.length - 2]);
  }

  return (
    <>
      <div className="overflow-y-scroll h-[calc(100vh-62px)]">
        {listData?.results
          .filter((poke) => poke.name.startsWith(props.search.toLowerCase()))
          .map((poke, index) => (
            <div
              className="flex pl-16 items-center cursor-pointer hover:bg-slate-200"
              key={index}
              onClick={() =>
                loading
                  ? console.log("กรุณารอ API ส่งสำเร็จ...")
                  : handleSelectPokemon(getPokemonIdFromUrl(poke.url))
              }
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(
                  poke.url
                )}.png`}
              />
              {poke.name}
            </div>
          ))}
      </div>
    </>
  );
};
export default ListPokemon;
