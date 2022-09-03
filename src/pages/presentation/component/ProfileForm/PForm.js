/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
// import { Stack } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Grid, Divider, Paper, Box, Typography, Button } from '@mui/material';
import classNames from 'classnames';

import { FileUploader } from 'react-drag-drop-files';
import moment from 'moment';
import { set } from 'date-fns';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
// import Button from '../../../../components/bootstrap/Button';
import Wizard, { WizardItem } from '../../../../components/Wizard';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Icon from '../../../../components/icon/Icon';
import Select from '../../../../components/bootstrap/forms/Select';
import Label from '../../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../../components/bootstrap/forms/Checks';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Avatar from '../../../../components/Avatar';
import User1Webp from '../../../../assets/img/wanna/wanna2.webp';
import User1Img from '../../../../assets/img/wanna/wanna2.png';
// import Button from '../../../../components/bootstrap/Button';
import { serverUrl } from '../../../../config';
import { _selectOptions } from '../../../documentation/forms/SelectPage';
import useDarkMode from '../../../../hooks/useDarkMode';

const superLabel = {
	inputProps: { 'aria-label': 'Checkbox demo' },
};

const PreviewItem = ({ title, value }) => {
	return (
		<>
			<div className='col-3 text-end'>{title}</div>
			<div className='col-9 fw-bold'>{value || '-'}</div>
		</>
	);
};
const fileTypes = ['JPEG', 'PNG', 'GIF'];

function PForm() {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const [profileData, setProfileData] = useState('');
	const [maleValue, setMaleValue] = useState(false);
	const [femaleValue, setFemaleValue] = useState(false);
	const getProfileData = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/profile/${contactInformation.email}`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
					console.log('userInfo Result', ss);
					setProfileData(ss[0].guid);
					if (ss[0].gender === 'male') {
						setMaleValue(true);
					} else {
						setFemaleValue(true);
					}
					setPersonalInformation({
						fName: ss[0].fName,
						mName: ss[0].mName,
						lName: ss[0].lName,
						dob: ss[0].dob,
						firstLanguages: ss[0].firstLanguages ? ss[0].firstLanguages : '',
						country: ss[0].country,
						gender: ss[0].gender,
						martialStatus: ss[0].martialStatus,
					});
					setAddressInformation({
						address: ss[0].address,
						addressLine: ss[0].addressLine,
						city: ss[0].city,
						state: ss[0].state,
						zip: ss[0].zip,
					});
					setContactInformation({
						phoneNumber: ss[0].phoneNumber,
					});
				}
			});
	};

	useEffect(() => {
		getProfileData();
	}, []);
	const [personalInformation, setPersonalInformation] = useState({
		fName: '',
		mName: '',
		lName: '',
		dob: '',
		firstLanguages: '',
		country: '',
		gender: '',
		martialStatus: '',
	});

	const [addressInformation, setAddressInformation] = useState({
		address: '',
		addressLine: '',
		city: '',
		state: '',
		zip: '',
	});
	const [contactInformation, setContactInformation] = useState({
		email: localStorage.getItem('email'),
		phoneNumber: '',
	});
	const authToken = localStorage.getItem('auth');
	

	const gernalSubmit = () => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const info = {
			...personalInformation,
			...addressInformation,
			...contactInformation,
			userId: userInfo.guid,
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
			body: JSON.stringify(info),
		};

		fetch(`${serverUrl}/profile/add`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result) {
					const ss = d.result;
					console.log('userInfo Result', ss);
					navigate('/dashboard');
					// setApplicationList(ss)
				}
			});
	};

	const genralUpdate = () => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const info = {
			...personalInformation,
			...addressInformation,
			...contactInformation,
			userId: userInfo.guid,
		};

		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
			body: JSON.stringify(info),
		};

		fetch(`${serverUrl}/profile/update/${contactInformation.email}`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result) {
					const ss = d.result;
					console.log('userInfo Result', ss);
					navigate('/dashboard');
					// setApplicationList(ss)
				}
			});
	};

	return (
		<>
			<Grid container spacing={1} p={3}>
				<Grid item xs={12}>
					<div className='row g-4'>
						<div className='col-md-12'>
							<Typography variant='h5'>
								<Icon
									icon='Edit'
									className={classNames('card-icon', {
										[`text-warning`]: 'warning',
									})}
								/>
								Personal Information
							</Typography>
						</div>
						<form
							className={classNames('row', 'pb-4 px-3 mx-0 g-4', 'rounded-3', [
								`bg-l${darkModeStatus ? 'o25' : '10'}-primary`,
							])}>
							<div className='col-md-4'>
								<FormGroup id='firstName' label='First Name' isFloating>
									<Input
										onChange={(e) => {
											setPersonalInformation({
												...personalInformation,
												fName: e.target.value,
											});
										}}
										placeholder='First Name'
										autoComplete='additional-name'
										validFeedback='Looks good!'
										value={personalInformation.fName}
									/>
								</FormGroup>
							</div>
							<div className='col-md-4'>
								<FormGroup id='middleName' label='Middle Name' isFloating>
									<Input
										onChange={(e) => {
											setPersonalInformation({
												...personalInformation,
												mName: e.target.value,
											});
										}}
										placeholder='Middle Name'
										autoComplete='additional-name'
										validFeedback='Looks good!'
										value={personalInformation.mName}
									/>
								</FormGroup>
							</div>
							<div className='col-md-4'>
								<FormGroup id='lastName' label='Last Name' isFloating>
									<Input
										onChange={(e) => {
											setPersonalInformation({
												...personalInformation,
												lName: e.target.value,
											});
										}}
										placeholder='Last Name'
										autoComplete='family-name'
										validFeedback='Looks good!'
										value={personalInformation.lName}
									/>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup id='firstName' label='Date Of Birth' isFloating>
									<Input
										onChange={(e) => {
											setPersonalInformation({
												...personalInformation,
												dob: e.target.value,
											});
										}}
										placeholder='Date Of Birth'
										autoComplete='additional-name'
										validFeedback='Looks good!'
										value={personalInformation.dob}
									/>
								</FormGroup>
							</div>
							{/* <div className='col-md-4'>
								<FormGroup id='language' label='First Language' isFloating>
									<Input
										onChange={(e) => {
											setPersonalInformation({
												...personalInformation,
												firstLanguages: e.target.value,
											});
										}}
										placeholder='First Language'
										autoComplete='additional-name'
										validFeedback='Looks good!'
										value={personalInformation.firstLanguages}
									/>
								</FormGroup>
							</div> */}
							<div className='col-md-6'>
								<FormGroup id='country' label='Country of Citizenship' isFloating>
									<Input
										onChange={(e) => {
											setPersonalInformation({
												...personalInformation,
												country: e.target.value,
											});
										}}
										placeholder='Country of Citizenship'
										autoComplete='additional-name'
										validFeedback='Looks good!'
										value={personalInformation.country}
									/>
								</FormGroup>
								{/* <Select
										id='category'
										size='lg'
										ariaLabel='Category'
										placeholder='Country of Citizenship'
										list={_selectOptions}
									/> */}
							</div>
							<div className='col-md-6'>
								<Typography variant='p'>Gender</Typography>
								<ChecksGroup isInline>
									<Checks
										type='radio'
										id='inlineRadioOne'
										label='Male'
										name='male'
										onChange={(e) => {
											if (e.target.name === 'male') {
												setPersonalInformation({
													...personalInformation,
													gender: e.target.name,
												});
											}
										}}
										checked={maleValue}
									/>
									<Checks
										type='radio'
										id='inlineRadioTwo'
										label='Female'
										name='female'
										onChange={(e) => {
											if (e.target.name === 'female') {
												setPersonalInformation({
													...personalInformation,
													gender: e.target.name,
												});
											}
										}}
										checked={femaleValue}
									/>
								</ChecksGroup>
							</div>
							<div className='col-md-6'>
								<Typography variant='p'>Marital Status</Typography>
								<ChecksGroup isInline>
									<Checks
										type='radio'
										id='inlineRadioOne'
										label='Married'
										name='married'
										onChange={(e) => {
											if (e.target.name === 'married') {
												setPersonalInformation({
													...personalInformation,
													martialStatus: e.target.name,
												});
											}
										}}
										value='married'
									/>
									<Checks
										type='radio'
										id='inlineRadioTwo'
										label='Unmarried'
										name='Unmarried'
										onChange={(e) => {
											if (e.target.name === 'Unmarried') {
												setPersonalInformation({
													...personalInformation,
													martialStatus: e.target.name,
												});
											}
										}}
										value='unmarried'
									/>
								</ChecksGroup>
							</div>
						</form>
					</div>
				</Grid>
			</Grid>
			<Grid container spacing={1} p={3}>
				<Grid item xs={12}>
					<div className='row g-4'>
						<div className='col-md-12'>
							<Typography variant='h5'>
								<Icon
									icon='Edit'
									className={classNames('card-icon', {
										[`text-warning`]: 'warning',
									})}
								/>
								Contact Information
							</Typography>
						</div>
						<form
							className={classNames('row', 'pb-4 px-3 mx-0 g-4', 'rounded-3', [
								`bg-l${darkModeStatus ? 'o25' : '10'}-primary`,
							])}>
							<div className='col-6'>
								<FormGroup id='phoneNumber' label='Phone Number' isFloating>
									<Input
										placeholder='Phone Number'
										onChange={(e) => {
											setContactInformation({
												...contactInformation,
												phoneNumber: e.target.value,
											});
										}}
										value={contactInformation.phoneNumber}
										type='tel'
										autoComplete='tel'
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup id='emailAddress' label='Email address' isFloating>
									<Input
										type='email'
										disabled
										onChange={(e) => {
											setContactInformation({
												...contactInformation,
												email: e.target.value,
											});
										}}
										placeholder='Email address'
										autoComplete='email'
										validFeedback='Looks good!'
										value={contactInformation.email}
									/>
								</FormGroup>
							</div>
						</form>
					</div>
				</Grid>
			</Grid>
			<Grid container spacing={4} p={3}>
				<Grid item xs={12}>
					<div className='row g-4'>
						<div className='col-md-12'>
							<Typography variant='h5'>
								<Icon
									icon='Edit'
									className={classNames('card-icon', {
										[`text-warning`]: 'warning',
									})}
								/>
								Address Information
							</Typography>
						</div>
						<form
							className={classNames('row', 'pb-4 px-3 mx-0 g-4', 'rounded-3', [
								`bg-l${darkModeStatus ? 'o25' : '10'}-primary`,
							])}>
							<div className='col-lg-12'>
								<FormGroup id='addressLine' label='Address Line' isFloating>
									<Input
										onChange={(e) => {
											setAddressInformation({
												...addressInformation,
												address: e.target.value,
											});
										}}
										value={addressInformation.address}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-lg-12'>
								<FormGroup id='addressLine2' label='Address Line 2' isFloating>
									<Input
										onChange={(e) => {
											setAddressInformation({
												...addressInformation,
												addressLine: e.target.value,
											});
										}}
										value={addressInformation.addressLine}
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.addressLine2}
										// isValid={formik.isValid}
										// isTouched={formik.touched.addressLine2}
										// invalidFeedback={formik.errors.addressLine2}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>

							<div className='col-lg-6'>
								<FormGroup id='city' label='City' isFloating>
									<Input
										onChange={(e) => {
											setAddressInformation({
												...addressInformation,
												city: e.target.value,
											});
										}}
										value={addressInformation.city}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='state' label='State' isFloating>
									<Input
										onChange={(e) => {
											setAddressInformation({
												...addressInformation,
												state: e.target.value,
											});
										}}
										value={addressInformation.state}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='zip' label='Zip' isFloating>
									<Input
										onChange={(e) => {
											setAddressInformation({
												...addressInformation,
												zip: e.target.value,
											});
										}}
										value={addressInformation.zip}
									/>
								</FormGroup>
							</div>
						</form>
					</div>
				</Grid>
				<Grid item xs={5} />
				<Grid item xs={2}>
					{profileData.length > 0 ? (
						<Button onClick={genralUpdate} variant='contained' size='large'>
							UPDATE
						</Button>
					) : (
						<Button onClick={gernalSubmit} variant='contained' size='large'>
							SUBMIT
						</Button>
					)}
				</Grid>
				<Grid item xs={5} />
			</Grid>
		</>
	);
}

export default PForm;
