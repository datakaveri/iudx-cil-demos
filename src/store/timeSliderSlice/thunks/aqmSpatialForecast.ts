import axios from "axios";
import { env } from "../../../environments/environments";

export const aqmSpatialForecast = async () => {
  const headers = {
    // "Access-Control-Allow-Origin": "*",
    // "x-api-key": "6add214d988ea780931a7fe04a25e3b8",
    "content-type": "application/json",
  };
  const requestBody = {
    forecastStart: "2023-11-03T10:14:26+05:30",
    forecastEnd: "2023-11-03T12:05:26+05:30",
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
