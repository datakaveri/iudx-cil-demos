import { MobileDateTimePicker } from "@mui/x-date-pickers";

const DateTimePickerAdapter = ({ input, meta, ...rest }) => {
	return (
		<MobileDateTimePicker
			{...input}
			{...rest}
			onAccept={(val) => {
				input.onChange(new Date(val.$d).toISOString());
			}}
		/>
	);
};

export default DateTimePickerAdapter;
