import axios from "axios";
import { env } from "../../../environments/environments";

export const aqmSpatialForecast = async ({
	startTime,
	endTime,
}: {
	startTime: string;
	endTime: string;
}) => {
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"x-api-key": env.API_KEY,
		"content-type": "application/json",
	};
	const requestBody = {
		forecastStart: startTime,
		forecastEnd: endTime,
		measuredValue: "co2",
	};
	const res = await axios({
		url: `${env.endpoint}airquality/aqmSpatialForecast`,
		method: "post",
		data: requestBody,
		headers: headers,
	});

	return res.data;
};
