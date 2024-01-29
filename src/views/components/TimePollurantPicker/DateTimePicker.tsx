import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, Grid } from "@mui/material";
import DateTimePickerAdapter from "./DateTimePickerAdapter";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import {
	getAQMSpatialForecast,
	getAQMSpatialForecastStatus,
} from "../../../store/timeSliderSlice/timeSliderSlice";
import PollutantSelectComponent from "./PollutantSelectComponent";
import { setSnackbarStatus } from "../../../store/snackbarSlice/snackbarSlice";
import moment from "moment";

interface Props {
	path: string;
}

export const DateTimePickerComponent = ({ path }: Props) => {
	const dispatch = useDispatch();
	const responseDataStatus = useSelector(getAQMSpatialForecastStatus);

	const onSubmit = ({
		startTime,
		endTime,
		pollutant_val,
	}: {
		startTime: string;
		endTime: string;
		pollutant_val: string;
	}) => {
		if (+startTime > +endTime) {
			dispatch(
				setSnackbarStatus({
					open: true,
					snackbarMessage: "Invalid time range",
					snackbarType: "error",
				})
			);
		} else {
			const st = moment(startTime).format().toString();
			const et = moment(endTime).format().toString();
			console.log({
				st,
				et,
			});
			dispatch(
				getAQMSpatialForecast({
					startTime: st,
					endTime: et,
					pollutant_val,
					path,
				})
			);

			if (responseDataStatus === "succeeded") {
				dispatch(
					setSnackbarStatus({
						open: true,
						snackbarMessage: "Data loaded successfully",
						snackbarType: "success",
					})
				);
			} else if (responseDataStatus === "failed") {
				dispatch(
					setSnackbarStatus({
						open: true,
						snackbarMessage:
							"No data present in the specified time range :/",
						snackbarType: "error",
					})
				);
			}
		}
	};

	return (
		<div>
			<Form
				onSubmit={onSubmit}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer
								components={[
									"DateTimePicker",
									"MobileDateTimePicker",
									"DesktopDateTimePicker",
									"StaticDateTimePicker",
								]}
							>
								<Grid container spacing={2}>
									<Grid item xs={3}>
										<Field
											minDate={
												path === "spatialInterpolation"
													? dayjs(
															"2024-01-03 09:00:00.000"
													  )
													: dayjs(
															"2023-12-26 22:00:00.000"
													  )
											}
											defaultValue={
												path === "spatialInterpolation"
													? dayjs(
															"2024-01-03 10:00:00.000"
													  )
													: dayjs(
															"2023-12-27 00:00:00.000"
													  )
											}
											name="startTime"
											label="Start time"
											component={DateTimePickerAdapter}
										/>
									</Grid>
									<Grid item xs={3}>
										<Field
											minDate={
												path === "spatialInterpolation"
													? dayjs(
															"2023-01-03 09:00:00.000"
													  )
													: dayjs(
															"2023-12-26 22:00:00.000"
													  )
											}
											defaultValue={
												path === "spatialInterpolation"
													? dayjs(
															"2024-01-03 11:00:00.000"
													  )
													: dayjs(
															"2023-12-27 02:00:00.000"
													  )
											}
											name="endTime"
											label="End time"
											component={DateTimePickerAdapter}
										/>
									</Grid>

									<Grid item xs={3}>
										<Field
											defaultValue="co2"
											name="pollutant_val"
											label="Pollutant"
											component={PollutantSelectComponent}
										/>
									</Grid>

									<Grid item xs={3}>
										<Button
											type="submit"
											variant="contained"
											color="success"
										>
											Submit
										</Button>
									</Grid>
								</Grid>
							</DemoContainer>
						</LocalizationProvider>
					</form>
				)}
			/>
		</div>
	);
};
