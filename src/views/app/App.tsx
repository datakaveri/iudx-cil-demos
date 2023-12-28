import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

import { useState } from "react";
import TabPanel from "../components/Tabs/TabPanel";
import TabScreenComponent from "../components/Tabs/TabScreenComponent";

const tabs = ["spatial Interpolation", "spatial Forecast"];

function App() {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<Container>
				<Typography variant="h4">
					KDMC Air Quality Monitoring
				</Typography>
				<Typography variant="h5">
					Select start time, end time and pollutant
				</Typography>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						{tabs.map((tab, index) => (
							<Tab
								key={index}
								label={`${tab}`}
								id={index.toString()}
							/>
						))}
					</Tabs>
					{tabs.map((tab, index) => (
						<TabPanel key={index} value={value} index={index}>
							<TabScreenComponent path={tab.replace(" ", "")} />
						</TabPanel>
					))}
				</Box>
			</Container>
		</>
	);
}

export default App;
