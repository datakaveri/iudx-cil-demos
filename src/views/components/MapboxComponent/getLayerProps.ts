import { LayerProps } from "react-map-gl";
import chroma from "chroma-js";

interface Props {
	pollutantVal: number;
	min: number;
	max: number;
	average: number;
	stddev: number;
}

export const getLayerProps = ({
	pollutantVal,
	min,
	max,
	average,
	stddev,
}: Props) => {
	const scale = chroma
		.scale(["green", "red"])
		.classes([
			min,
			average - 0.625 * stddev,
			average,
			average + 0.625 * stddev,
			max,
		]);

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

export const getLegendColor = (colorScale: number[], pollutantVal: number) => {
	const scale = chroma.scale(["green", "red"]).classes(colorScale);

	return scale(pollutantVal).hex();
};
