// import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

const PollutantSelectComponent = () => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const pollutants = ["pm10", "pm2p5", "so2", "no2", "co", "co2"];
  return (
    // <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        onChange={handleChange}
      >
        {pollutants.map((pol) => (
          <MenuItem value={pol} key={pol}>
            {pol}
          </MenuItem>
        ))}
      </Select>{" "}
    </FormControl>
    // </Box>
  );
};

export default PollutantSelectComponent;
