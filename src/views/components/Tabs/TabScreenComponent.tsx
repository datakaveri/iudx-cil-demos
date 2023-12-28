import { DateTimePickerComponent } from "../TimePollurantPicker/DateTimePicker";
import MapboxComponent from "../MapboxComponent/MapboxComponent";
import TimesliderComponent from "../TimesliderComponent/TimesliderComponent";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import { useDispatch, useSelector } from "react-redux";
import {
	getAQMSpatialForecast,
	getAQMSpatialForecastStatus,
} from "../../../store/timeSliderSlice/timeSliderSlice";
import { useEffect } from "react";

interface Props {
	path: string;
}

const TabScreenComponent = ({ path }: Props) => {
	const dispatch = useDispatch();
	const responseDataStatus = useSelector(getAQMSpatialForecastStatus);
	useEffect(() => {
		if (responseDataStatus === "idle")
			dispatch(
				getAQMSpatialForecast({
					startTime: "2023-11-01T18:30:00.000Z",
					endTime: "2023-11-01T22:30:00.000Z",
					pollutant_val: "co2",
					path: path,
				})
			);
	}, [dispatch, path, responseDataStatus]);

	return (
		<>
			<DateTimePickerComponent />
			<MapboxComponent />
			<TimesliderComponent />
			<SnackbarComponent />
		</>
	);
};

export default TabScreenComponent;
