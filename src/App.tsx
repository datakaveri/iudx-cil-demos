import { Container } from "@mui/material";
import MapboxComponent from "./views/components/MapboxComponent";
import TimesliderComponent from "./views/components/TimesliderComponent/TimesliderComponent";
import { DateTimePickerComponent } from "./views/components/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
	getAQMSpatialForecast,
	getAQMSpatialForecastStatus,
} from "./store/timeSliderSlice/timeSliderSlice";
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
				})
			);
	}, [dispatch, responseDataStatus]);
	return (
		<>
			<Container>
				<DateTimePickerComponent />
				<MapboxComponent />
				<TimesliderComponent />
			</Container>
		</>
	);
}

export default App;
