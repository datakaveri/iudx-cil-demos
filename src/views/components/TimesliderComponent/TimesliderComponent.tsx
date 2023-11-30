import { Grid, Slider } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartIcon from "@mui/icons-material/RestartAltOutlined";
import ForwardIcon from "@mui/icons-material/FastForward";
import RewindIcon from "@mui/icons-material/FastRewind";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
	getAQMSpatialForecastResponse,
	getAQMSpatialForecastStatus,
	setPlayingStatus,
	setTimeValue,
} from "../../../store/timeSliderSlice/timeSliderSlice";
import { useSelector } from "react-redux";
import "./styles.scss";

const TimesliderComponent = () => {
	const responseData = useSelector(getAQMSpatialForecastResponse);
	const responseDataStatus = useSelector(getAQMSpatialForecastStatus);
	const min: number = 0;
	const max: number =
		responseDataStatus === "succeeded"
			? responseData.timeseries.timestamps.length - 1
			: 0;

	const dispatch = useAppDispatch();
	const timeValue = useAppSelector((state) => state.timeSlider.value);
	const playingStatus = useAppSelector((state) => state.timeSlider.playing);

	useEffect(() => {
		let intervalId: any;

		if (timeValue === 0) {
			dispatch(setTimeValue(min));
		}

		if (playingStatus && timeValue < max) {
			intervalId = setInterval(() => {
				const newValue = timeValue + 1;
				dispatch(setTimeValue(newValue));
			}, 250);
		} else if (timeValue >= max) {
			dispatch(setPlayingStatus(false));
		}

		return () => clearInterval(intervalId);
	}, [dispatch, max, playingStatus, timeValue]);

	const handleSliderChange = (_event: any, newValue: any) => {
		dispatch(setTimeValue(newValue));
	};

	const handlePlayClick = () => {
		if (timeValue >= max) {
			dispatch(setTimeValue(min));
		}

		dispatch(setPlayingStatus(true));
	};

	const handlePauseClick = () => {
		dispatch(setPlayingStatus(false));
	};

	const handleRestartClick = () => {
		dispatch(setTimeValue(min));
		dispatch(setPlayingStatus(false));
	};

	const handleForwardClick = () => {
		dispatch(setTimeValue(timeValue + 1));
	};

	const handleBackwardClick = () => {
		dispatch(setTimeValue(timeValue - 1));
	};

	return (
		<div>
			{responseDataStatus === "succeeded" ? (
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<div className="controlPanel">
							<button onClick={handleBackwardClick}>
								<RewindIcon />
							</button>
							{playingStatus ? (
								<button onClick={handlePauseClick}>
									<PauseIcon />
								</button>
							) : (
								<button onClick={handlePlayClick}>
									<PlayArrowIcon />
								</button>
							)}
							<button onClick={handleRestartClick}>
								<RestartIcon />
							</button>
							<button onClick={handleForwardClick}>
								<ForwardIcon />
							</button>
						</div>
					</Grid>
					<Grid item xs={6}>
						<Slider
							onChange={handleSliderChange}
							value={timeValue}
							aria-label="Custom marks"
							valueLabelDisplay="auto"
							min={min}
							max={max}
						/>
					</Grid>
					<Grid item xs={3}>
						<div className="timeValue">
							<span>
								{new Date(
									responseData.timeseries.timestamps[
										timeValue
									]
								).toLocaleString("en-IN")}
							</span>
						</div>
					</Grid>
				</Grid>
			) : (
				<span>loading...</span>
			)}
		</div>
	);
};

export default TimesliderComponent;
