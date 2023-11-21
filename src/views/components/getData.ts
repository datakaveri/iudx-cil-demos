import lodash from "lodash";

import data2 from "../../assets/data/_select_aqm_geojson_geojson_aqm_geojson_geojson_id_aqm_forecast__202311071432.json";

const geojson_data_2 = data2;

export const new_data = lodash
  .chain(geojson_data_2)
  .groupBy("observationdatetime")
  .map((value, key) => ({
    observationdatetime: key,
    properties: value,
  }))
  .sortBy((o) => o.observationdatetime)
  .value();
