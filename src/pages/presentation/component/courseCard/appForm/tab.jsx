import { Box } from '@mui/material';

import Tab from '@material-ui/core/Tab';
import React from 'react';
import TabContext from '@material-ui/lab/TabContext';

import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import TabTab from './tabtab';

const LabTabs = () => {
	const [value, setValue] = React.useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						<Tab label='My Preferred' value='1' />
						<Tab label='Expert to Advise' value='2' />
					</TabList>
				</Box>
				<TabPanel value='1'>
					<TabTab />
				</TabPanel>
				<TabPanel value='2'>
					<TabTab />
				</TabPanel>
			</TabContext>
		</Box>
	);
};

export default LabTabs;
