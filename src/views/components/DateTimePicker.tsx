import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Grid } from "@mui/material";
import DateTimePickerAdapter from "./DateTimePickerAdapter";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { getAQMSpatialForecast } from "../../store/timeSliderSlice/timeSliderSlice";

export const DateTimePickerComponent = () => {
	const dispatch = useDispatch();

	const onSubmit = ({
		startTime,
		endTime,
	}: {
		startTime: string;
		endTime: string;
	}) => {
		dispatch(
			getAQMSpatialForecast({
				startTime,
				endTime,
			})
		);
	};

	return (
		<div>
			<Form
				onSubmit={onSubmit}
				// validate={validate}
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
										{/* <DemoItem label="Pollutant">
											<PollutantSelectComponent />
										</DemoItem> */}
									</Grid>

									<Grid item xs={3}>
										<button type="submit">Submit</button>
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
