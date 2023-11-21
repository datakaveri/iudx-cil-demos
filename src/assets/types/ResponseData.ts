import { GeoJSONSourceRaw } from "mapbox-gl";

export interface ResponseData {
  timeseries: {
    timestamps: string;
    geojson: GeoJSONSourceRaw[][];
    values: number[][];
  };
  properties: {
    measuredValue: string;
  };
}
