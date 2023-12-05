import { MobileDateTimePicker } from "@mui/x-date-pickers";

const DateTimePickerAdapter = ({ input, meta, ...rest }) => {
	return (
		<MobileDateTimePicker
			{...input}
			{...rest}
			onAccept={(val) => {
				const d = new Date(val.$d);
				input.onChange(d);
			}}
		/>
	);
};

export default DateTimePickerAdapter;
