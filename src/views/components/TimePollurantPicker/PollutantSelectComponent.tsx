// import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const PollutantSelectComponent = ({ input, meta, ...rest }) => {
	const handleChange = (event: SelectChangeEvent) => {
		input.onChange(event.target.value);
	};

	const pollutants = ["pm10", "pm2p5", "so2", "no2", "co", "co2"];
	return (
		<FormControl fullWidth>
			<Select {...input} {...rest} onChange={handleChange}>
				{pollutants.map((pol) => (
					<MenuItem value={pol} key={pol}>
						{pol}
					</MenuItem>
				))}
			</Select>{" "}
		</FormControl>
	);
};

export default PollutantSelectComponent;
