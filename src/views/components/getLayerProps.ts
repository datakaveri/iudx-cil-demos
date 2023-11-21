import { LayerProps } from "react-map-gl";
// import data from "./data.json";
import chroma from "chroma-js";

interface Props {
  pollutantVal: number;
  min: number;
  max: number;
}

export const getLayerProps = ({ pollutantVal, min, max }: Props) => {
  const scale = chroma.scale(["yellow", "red"]).domain([min, max], 3);

  const layerStyle: LayerProps = {
    type: "fill",
    source: "my_data",
    layout: {},
    paint: {
      "fill-color": scale(pollutantVal).hex(),
      // "fill-color": "red",
      "fill-opacity": 0.5,
    },
  };

  return layerStyle;
};
