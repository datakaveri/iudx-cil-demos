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
					startTime: "2023-12-26T10:14:26+05:30",
					endTime: "2023-12-26T10:30:26+05:30",
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
