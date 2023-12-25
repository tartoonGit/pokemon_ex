import { useState, useEffect } from "react";
import { brightnessRGB, rgbToHex } from "../utils/color";
import { Poke } from "./../interface/myType";

interface props {
  r: number;
  g: number;
  b: number;
  setฺBrightness: React.Dispatch<React.SetStateAction<number>>;
  brightness: number;
  pokemon: Poke;
}

const Pokemon = (props: props) => {
  const [imgLoading, setImgLoading] = useState(false);

  useEffect(() => {
    document.body.style.background = `#${rgbToHex(props.r, props.g, props.b)}`;
    document.body.classList.add("transition-all");
    document.body.classList.add("duration-500");
    props.setฺBrightness(brightnessRGB(props.r, props.g, props.b));
  }, [props]);

  const checkloadImg = () => {
    setImgLoading(true);
    console.log(imgLoading);
  };

  return (
    <>
      <h1 className={props.brightness < 128 ? "text-white" : "text-black"}>
        {props.pokemon?.name}
      </h1>
      <div>
        <img
          src={props.pokemon?.sprites.other["official-artwork"].front_default}
          onLoad={checkloadImg}
          className={imgLoading ? "block" : "hidden"}
        />
        <div
          className={`h-[311px] w-[311px] flex items-center justify-center ${
            imgLoading ? "hidden" : "block"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-[150px] w-[150px]"
          >
            <path
              fill="#fff"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
