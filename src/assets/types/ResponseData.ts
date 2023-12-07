import { GeoJSONSourceRaw } from "mapbox-gl";

export interface ResponseData {
	timeseries: {
		timestamps: string[];
		geojson: GeoJSONSourceRaw[][];
		values: number[][];
	};
	properties: {
		measuredValue: string;
		min: number;
		max: number;
		average: number;
		stddev: number;
	};
}
