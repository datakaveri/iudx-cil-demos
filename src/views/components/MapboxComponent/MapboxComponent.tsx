import Map, { Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getLayerProps } from "./getLayerProps";

import { useAppSelector } from "../../hooks/hooks";
import { env } from "../../../environments/environments";
import { useSelector } from "react-redux";
import {
	getAQMSpatialForecastResponse,
	getAQMSpatialForecastStatus,
} from "../../../store/timeSliderSlice/timeSliderSlice";

import "./styles.scss";
import MapboxLegend from "./MapboxLegend";

const MapboxComponent = () => {
	const responseData = useSelector(getAQMSpatialForecastResponse);
	const responseDataStatus = useSelector(getAQMSpatialForecastStatus);

	const timeValue = useAppSelector((state) => state.timeSlider.value);

	let chromaJsLegendColors: number[] = [];

	if (responseDataStatus === "succeeded") {
		chromaJsLegendColors = [
			responseData.properties.min,
			responseData.properties.average -
				0.625 * responseData.properties.stddev,
			responseData.properties.average,
			responseData.properties.average +
				0.625 * responseData.properties.stddev,
			responseData.properties.max,
		];
	}

	return (
		<div>
			<div>
				<MapboxLegend chromaJsLegendColors={chromaJsLegendColors} />
				<Map
					mapboxAccessToken={env.MAPBOX_API_TOKEN}
					initialViewState={{
						longitude: 73.11506788088832,
						latitude: 19.25657203930823,
						zoom: 11.5,
					}}
					style={{ width: "100%", height: "70vh" }}
					mapStyle="mapbox://styles/mapbox/light-v11"
					interactiveLayerIds={["data"]}
					onClick={(evt) => {
						console.log(evt);
					}}
				>
					{responseData.timeseries.values[timeValue].map(
						(value, valuesIndex) => (
							<Source
								key={valuesIndex}
								id={valuesIndex.toString()}
								type="geojson"
								data={
									responseData.timeseries.geojson[timeValue][
										valuesIndex
									]
								}
							>
								<Layer
									id={valuesIndex.toString()}
									{...getLayerProps({
										pollutantVal: value,
										min: responseData.properties.min,
										max: responseData.properties.max,
										average:
											responseData.properties.average,
										stddev: responseData.properties.stddev,
									})}
								/>
							</Source>
						)
					)}
				</Map>
			</div>
		</div>
	);
};

export default MapboxComponent;
