import { Container, Typography } from "@mui/material";
import MapboxComponent from "../components/MapboxComponent/MapboxComponent";
import TimesliderComponent from "../components/TimesliderComponent/TimesliderComponent";
import { DateTimePickerComponent } from "../components/TimePollurantPicker/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
	getAQMSpatialForecast,
	getAQMSpatialForecastStatus,
} from "../../store/timeSliderSlice/timeSliderSlice";
import { useEffect } from "react";

function App() {
	const dispatch = useDispatch();
	const responseDataStatus = useSelector(getAQMSpatialForecastStatus);
	useEffect(() => {
		if (responseDataStatus === "idle")
			dispatch(
				getAQMSpatialForecast({
					startTime: "2023-11-01T18:30:00.000Z",
					endTime: "2023-11-01T22:30:00.000Z",
					pollutant_val: "co2",
				})
			);
	}, [dispatch, responseDataStatus]);
	return (
		<>
			<Container>
				<Typography variant="h4">
					KDMC Air Quality Monitoring
				</Typography>
				<Typography variant="h5">
					Select start time, end time and pollutant
				</Typography>
				<DateTimePickerComponent />
				<MapboxComponent />
				<TimesliderComponent />
			</Container>
		</>
	);
}

export default App;
