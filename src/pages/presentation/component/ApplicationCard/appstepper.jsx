/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// const steps = [
// 	'Select master blaster campaign settings',
// 	'Select master blaster campaign settings',
// 	'Select master blaster campaign settings',
// 	'Select master blaster campaign settings',
// 	'Select master blaster campaign settings',
// 	'Select master blaster campaign settings',
// 	'Select master blaster campaign settings',
// 	'Create an ad group',
// 	'Create an ad',
// ];

const HorizontalLabelPositionBedlowStepper = ({ data, stages }) => {
	const [countValue, setCountValue] = useState();
	const getActiveStep = () => {
		if(stages.indexOf(data.status) >= 0) {
			setCountValue(stages.indexOf(data.status));
		}
	}
	

	useEffect(() => {
		getActiveStep();
	}, []);
	// console.log('steps', steps);

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={countValue} alternativeLabel>
				{stages.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
};

export default HorizontalLabelPositionBedlowStepper;
