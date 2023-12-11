import { useDispatch, useSelector } from "react-redux";
import {
	selectSnackbarStatus,
	setSnackbarStatus,
} from "../../../store/snackbarSlice/snackbarSlice";
import { Alert, Snackbar } from "@mui/material";

const SnackbarComponent = () => {
	const snackbarStatus = useSelector(selectSnackbarStatus);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(
			setSnackbarStatus({
				open: false,
			})
		);
	};

	return (
		<Snackbar
			autoHideDuration={2000}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			open={snackbarStatus.open}
			onClose={handleClose}
		>
			<Alert severity={snackbarStatus.snackbarType}>
				{snackbarStatus.snackbarMessage}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarComponent;
