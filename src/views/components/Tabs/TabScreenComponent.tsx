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
import { CircularProgress } from "@mui/material";
import NoDataComponent from "./NoDataComponent";

interface Props {
	path: string;
}

const TabScreenComponent = ({ path }: Props) => {
	const dispatch = useDispatch();
	const responseDataStatus = useSelector(getAQMSpatialForecastStatus);

	useEffect(() => {
		if (path === "spatialInterpolation") {
			dispatch(
				getAQMSpatialForecast({
					startTime: "2024-01-03T10:00:00+05:30",
					endTime: "2024-01-03T12:00:00+05:30",
					pollutant_val: "co2",
					path: path,
				})
			);
		} else if (path === "spatialForecast") {
			dispatch(
				getAQMSpatialForecast({
					startTime: "2023-12-27T00:00:00+05:30",
					endTime: "2023-12-27T03:00:00+05:30",
					pollutant_val: "co2",
					path: path,
				})
			);
		}
	}, [dispatch, path]);

	return (
		<>
			<DateTimePickerComponent path={path} />
			{responseDataStatus === "succeeded" ? (
				<>
					<MapboxComponent />
					<TimesliderComponent />
				</>
			) : responseDataStatus === "failed" ? (
				<NoDataComponent />
			) : (
				<CircularProgress />
			)}
			<SnackbarComponent />
		</>
	);
};

export default TabScreenComponent;
