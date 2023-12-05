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

const MapboxComponent = () => {
	const responseData = useSelector(getAQMSpatialForecastResponse);
	const responseDataStatus = useSelector(getAQMSpatialForecastStatus);

	const timeValue = useAppSelector((state) => state.timeSlider.value);

	return (
		<>
			<Map
				mapboxAccessToken={env.MAPBOX_API_TOKEN}
				initialViewState={{
					longitude: 73.11506788088832,
					latitude: 19.25657203930823,
					zoom: 11.5,
				}}
				style={{ width: "100%", height: "70vh" }}
				mapStyle="mapbox://styles/mapbox/light-v11"
			>
				{responseDataStatus === "succeeded" ? (
					responseData.timeseries.values[timeValue].map(
						(value, valuesIndex) => (
							<Source
								key={valuesIndex}
								id={valuesIndex.toString()}
								type="geojson"
								data={
									responseData.timeseries.geojson[0][
										valuesIndex
									]
								}
							>
								<Layer
									id={valuesIndex.toString()}
									{...getLayerProps({
										pollutantVal: value,
										min: Math.min(
											...responseData.timeseries.values[
												timeValue
											]
										),
										max: Math.max(
											...responseData.timeseries.values[
												timeValue
											]
										),
									})}
								/>
							</Source>
						)
					)
				) : (
					<p>loading...</p>
				)}
			</Map>
		</>
	);
};

export default MapboxComponent;
