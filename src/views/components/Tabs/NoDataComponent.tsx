import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const NoDataComponent = () => {
	return (
		<>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography variant="h5" color="red" component="div">
						⚠️ Error
					</Typography>
					<Typography variant="body">
						Data not present in the provided time range :/
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default NoDataComponent;
