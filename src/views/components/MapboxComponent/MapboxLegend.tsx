import "./styles.scss";
import { getLegendColor } from "./getLayerProps";

interface Props {
	chromaJsLegendColors: number[];
}

const MapboxLegend = ({ chromaJsLegendColors }: Props) => {
	return (
		<div className="mapboxLegend">
			<ul>
				{chromaJsLegendColors.slice(0, -1).map((color, index) => {
					if (chromaJsLegendColors.length != index - 1)
						return (
							<div className="legendElement">
								<div
									className="legendColor"
									style={{
										backgroundColor: `${getLegendColor(
											chromaJsLegendColors,
											color
										)}`,
									}}
								/>
								<li className="legendText">
									{color.toFixed(2)} -{" "}
									{Number(
										chromaJsLegendColors[index + 1]
									).toFixed(2)}
								</li>
							</div>
						);
				})}
			</ul>
		</div>
	);
};

export default MapboxLegend;
