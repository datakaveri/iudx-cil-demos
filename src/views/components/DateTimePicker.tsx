import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { Grid } from "@mui/material";
import PollutantSelectComponent from "./PollutantSelectComponent";
import { useState } from "react";

export const DateTimePickerComponent = () => {
  const [startTime, setStartTime] = useState();
  return (
    <div>
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
              <DemoItem label="Start time">
                <MobileDateTimePicker
                  value={startTime}
                  defaultValue={dayjs("2022-04-17T15:30")}
                  onAccept={(val) => {
                    console.log(new Date(val.$d).toISOString());
                  }}
                />
              </DemoItem>
            </Grid>
            <Grid item xs={3}>
              <DemoItem label="End time">
                <MobileDateTimePicker
                  defaultValue={dayjs("2022-04-17T15:30")}
                  onChange={(val) => {
                    console.log(val?.day);
                  }}
                />
              </DemoItem>
            </Grid>

            <Grid item xs={3}>
              <DemoItem label="Pollutant">
                <PollutantSelectComponent />
              </DemoItem>
            </Grid>
          </Grid>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};
