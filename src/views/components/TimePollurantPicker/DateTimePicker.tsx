import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, Grid } from "@mui/material";
import DateTimePickerAdapter from "./DateTimePickerAdapter";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { getAQMSpatialForecast } from "../../../store/timeSliderSlice/timeSliderSlice";
import PollutantSelectComponent from "./PollutantSelectComponent";
import { setSnackbarStatus } from "../../../store/snackbarSlice/snackbarSlice";

export const DateTimePickerComponent = () => {
	const dispatch = useDispatch();

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
			dispatch(
				getAQMSpatialForecast({
					startTime,
					endTime,
					pollutant_val,
				})
			);
			dispatch(
				setSnackbarStatus({
					open: true,
					snackbarMessage: "Data loaded successfully",
					snackbarType: "success",
				})
			);
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
											minDate={dayjs(
												"2023-11-01 00:00:00.000"
											)}
											maxDate={dayjs(
												"2023-11-07 23:45:00.000"
											)}
											defaultValue={dayjs(
												"2023-11-01 00:00:00.000"
											)}
											name="startTime"
											label="Start time"
											component={DateTimePickerAdapter}
										/>
									</Grid>
									<Grid item xs={3}>
										<Field
											minDate={dayjs(
												"2023-11-01 00:00:00.000"
											)}
											maxDate={dayjs(
												"2023-11-07 23:45:00.000"
											)}
											defaultValue={dayjs(
												"2023-11-07 23:45:00.000"
											)}
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
