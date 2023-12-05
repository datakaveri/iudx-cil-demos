import axios from "axios";
import { env } from "../../../environments/environments";

export const aqmSpatialForecast = async ({
	startTime,
	endTime,
	pollutant_val,
}: {
	startTime: string;
	endTime: string;
	pollutant_val: string;
}) => {
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"x-api-key": env.API_KEY,
		"content-type": "application/json",
	};

	const st = new Date(startTime);
	st.setHours(st.getHours() + 5);
	st.setMinutes(st.getMinutes() + 30);
	const et = new Date(endTime);
	et.setHours(et.getHours() + 5);
	et.setMinutes(et.getMinutes() + 30);

	const requestBody = {
		forecastStart: startTime,
		forecastEnd: endTime,
		measuredValue: pollutant_val,
	};
	const res = await axios({
		url: `${env.endpoint}airquality/aqmSpatialForecast`,
		method: "post",
		data: requestBody,
		headers: headers,
	});

	return res.data;
};
