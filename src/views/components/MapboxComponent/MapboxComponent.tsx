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
	// const [hoverInfo, setHoverInfo] = useState(null);

	const responseData = useSelector(getAQMSpatialForecastResponse);
	const responseDataStatus = useSelector(getAQMSpatialForecastStatus);

	const timeValue = useAppSelector((state) => state.timeSlider.value);

	// const onClick = useCallback((event) => {
	// 	const {
	// 		features,
	// 		point: { x, y },
	// 	} = event;
	// 	const hoveredFeature = features && features[0];
	// 	console.log(event);

	// 	// prettier-ignore
	// 	setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
	// }, []);

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
									})}
								/>
							</Source>
						)
					)
				) : (
					<p>loading...</p>
				)}
				{/* {hoverInfo && (
					<div
						className="tooltip"
						style={{ left: hoverInfo.x, top: hoverInfo.y }}
					>
						<div>State: {hoverInfo.feature.properties.value}</div>
					</div>
				)} */}
			</Map>
		</>
	);
};

export default MapboxComponent;
