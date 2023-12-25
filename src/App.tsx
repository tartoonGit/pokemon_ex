import { useState, useEffect } from "react";
import "./App.css";
import { loadPokemon } from "./api/pokeApi";
import { getColorFromURL, Palette } from "color-thief-node";
import Pokemon from "./components/pokemon";
import Bar from "./components/bar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Poke } from "./interface/myType";
function App() {
  const Pokedata = {
    name: "",
    sprites: {
      other: {
        "official-artwork": {
          front_default: "",
        },
      },
    },
  };

  const [loading, setLoading] = useState(false);
  const [brightness, setฺBrightness] = useState(0);
  const [pokemon, setPokemon] = useState<Poke>(Pokedata!);
  const [dominantColor, setDominantColor] = useState<Palette>([255, 255, 255]);
  const [active, setActive] = useState(false);
  library.add(fas);
  useEffect(() => {
    handleApiPoke();
  }, []);

  useEffect(() => {
    if (active) {
      setLoading(true);
      fetch(pokemon.sprites.other["official-artwork"].front_default).then(
        async (res) => {
          const blob = await res.blob();
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result && typeof reader.result === "string") {
              getColorFromURL(reader.result).then((data) => {
                setDominantColor(data);
                setActive(false);
              });
            }
          };

          reader.readAsDataURL(blob);
          setLoading(false);
        }
      );
    }
    return () => {
      setActive(false);
    };
  }, [active, pokemon.sprites.other]);

  const handleApiPoke = (number?: number): void => {
    setLoading(true);
    loadPokemon(number).then(async (res) => {
      setPokemon(res);
      const response = await fetch(
        res.sprites.other["official-artwork"].front_default
      );
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          getColorFromURL(reader.result).then((data) => {
            setDominantColor(data);
          });
        }
      };

      reader.readAsDataURL(blob);

      setLoading(false);
    });
  };

  return (
    <>
      <div className="absolute right-10 top-10">
        <Bar brightness={brightness} setPokemon={setPokemon} setActive={setActive} />
      </div>
      <div className="mainCenter">
        {loading ? (
          <h1 className={brightness < 128 ? "text-white" : "text-black"}>
            Loding ...
          </h1>
        ) : (
          <div>
            <Pokemon
              setฺBrightness={setฺBrightness}
              brightness={brightness}
              pokemon={pokemon}
              r={dominantColor[0]}
              g={dominantColor[1]}
              b={dominantColor[2]}
            />
            <div>
              <button
                className="bg-sky-500 text-white focus:outline-none hover:bg-sky-600"
                onClick={() => handleApiPoke()}
              >
                Random
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
