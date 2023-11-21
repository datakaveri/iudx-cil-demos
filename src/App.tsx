import { Container } from "@mui/material";
import MapboxComponent from "./views/components/MapboxComponent";
import TimesliderComponent from "./views/components/TimesliderComponent";
import { DateTimePickerComponent } from "./views/components/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getAQMSpatialForecast,
  getAQMSpatialForecastStatus,
} from "./store/timeSliderSlice/timeSliderSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const responseDataStatus = useSelector(getAQMSpatialForecastStatus);
  useEffect(() => {
    if (responseDataStatus === "idle") dispatch(getAQMSpatialForecast());
  }, [dispatch, responseDataStatus]);
  return (
    <>
      <Container>
        <DateTimePickerComponent />
        <MapboxComponent />
        <TimesliderComponent />
      </Container>
      {/* <CounterComponent /> */}
    </>
  );
}

export default App;
