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
import { Grid, Divider, Paper, Box, Typography } from '@mui/material';
import classNames from 'classnames';

import { FileUploader } from 'react-drag-drop-files';
import moment from 'moment';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
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

function ProfileForm({ data, wishData }) {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();

	const [personalInformation, setPersonalInformation] = useState({
		fName: '',
		mName: '',
		lName: '',
		dob: '',
		firstLanguages: '',
		country: '',
		gender: '',
		martialStatus: '',
		passportNumber: '',
		passportExpiryDate: '',
	});

	const [addressInformation, setAddressInformation] = useState({
		address: '',
		addressLine: '',
	});
	const [contactInformation, setContactInformation] = useState({
		email: localStorage.getItem('email'),
		phoneNumber: '',
	});
	const [file, setFile] = useState(null);
	const [testScore, setTestScore] = useState(null);
	const [workExperience, setWorkExperience] = useState(null);
	const [passport, setPassport] = useState(null);
	const [otherDoc, setOtherDoc] = useState(null);
	const handleChange = (value) => {
		setFile(value);
	};

	const testHandleChange = (value) => {
		setTestScore(value);
	};

	const workHandleChange = (value) => {
		setWorkExperience(value);
	};

	const passportHandleChange = (value) => {
		setPassport(value);
	};

	const otherHandleChange = (value) => {
		setOtherDoc(value);
	};

	const gernalSubmit = () => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		const info = { 
			...personalInformation, 
			...addressInformation, 
			...contactInformation,
			userId: userInfo.guid
		};
	};

	return (
		<Wizard
			isHeader
			stretch
			color='info'
			// noValidate
			// onSubmit={formik.handleSubmit}
			className='shadow-3d-info'>
			<WizardItem id='step1' title='General Information'>
				<Grid container spacing={1} p={1}>
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
								<div className='col-md-4'>
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
								<div className='col-md-4'>
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
								</div>
								<div className='col-md-4'>
									<FormGroup
										id='country'
										label='Country of Citizenship'
										isFloating>
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
								<div className='col-md-6'>
									<FormGroup
										id='passportNumber'
										label='Passport Number'
										isFloating>
										<Input
											onChange={(e) => {
												setPersonalInformation({
													...personalInformation,
													passportNumber: e.target.value,
												});
											}}
											placeholder='Passport Number'
											autoComplete='passport'
											validFeedback='Looks good!'
											value={personalInformation.passportNumber}
										/>
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup
										id='passportExpiryDate'
										label='Passport Expiry Date'
										isFloating
										// formText='This will be how your name will be displayed in the account section and in reviews'
									>
										<Input
											onChange={(e) => {
												setPersonalInformation({
													...personalInformation,
													passportExpiryDate: moment(
														new Date(e.target.value),
													).format('YYYY-MM-DD'),
												});
											}}
											type='date'
											placeholder='Passport Expiry Date'
											autoComplete='Passport-Expiry-Date'
											validFeedback='Looks good!'
											// value={personalInformation.passportExpiryDate}
										/>
									</FormGroup>
								</div>
							</form>
						</div>
					</Grid>
				</Grid>
				<Grid container spacing={1} p={1}>
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
				<Grid container spacing={1} p={1}>
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
											// onChange={formik.handleChange}
											// onBlur={formik.handleBlur}
											// value={formik.values.addressLine}
											// isValid={formik.isValid}
											// isTouched={formik.touched.addressLine}
											// invalidFeedback={formik.errors.addressLine}
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
											// onChange={formik.handleChange}
											// onBlur={formik.handleBlur}
											// value={formik.values.city}
											// isValid={formik.isValid}
											// isTouched={formik.touched.city}
											// invalidFeedback={formik.errors.city}
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
											// onChange={formik.handleChange}
											// onBlur={formik.handleBlur}
											// value={formik.values.city}
											// isValid={formik.isValid}
											// isTouched={formik.touched.city}
											// invalidFeedback={formik.errors.city}
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
											// onChange={formik.handleChange}
											// onBlur={formik.handleBlur}
											// value={formik.values.zip}
											// isValid={formik.isValid}
											// isTouched={formik.touched.zip}
											// invalidFeedback={formik.errors.zip}
										/>
									</FormGroup>
								</div>
							</form>
						</div>
					</Grid>
				</Grid>
				<Grid>
				<Button onClick={gernalSubmit} variant='contained' size='large'>
					SUBMIT
				</Button>
				</Grid>
			</WizardItem>
			<WizardItem id='step2' title='Education History'>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<FileUploader
							multiple
							handleChange={handleChange}
							name='file'
							types={fileTypes}
						/>
					</div>
					<div className='col-lg-12'>
						<p>{file ? `File name: ${file[0].name}` : 'no files uploaded yet'}</p>
					</div>
				</div>
			</WizardItem>
			<WizardItem id='step3' title='English Test Scores'>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<FileUploader
							multiple
							handleChange={testHandleChange}
							name='file'
							types={fileTypes}
						/>
					</div>
					<div className='col-lg-12'>
						<p>
							{testScore
								? `File name: ${testScore[0].name}`
								: 'no files uploaded yet'}
						</p>
					</div>
				</div>
			</WizardItem>
			<WizardItem id='step4' title='Work Experience'>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<FileUploader
							multiple
							handleChange={workHandleChange}
							name='file'
							types={fileTypes}
						/>
					</div>
					<div className='col-lg-12'>
						<p>
							{workExperience
								? `File name: ${workExperience[0].name}`
								: 'no files uploaded yet'}
						</p>
					</div>
				</div>
			</WizardItem>
			<WizardItem id='step5' title='Passport & Travel History'>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<FileUploader
							multiple
							handleChange={passportHandleChange}
							name='file'
							types={fileTypes}
						/>
					</div>
					<div className='col-lg-12'>
						<p>
							{passport ? `File name: ${passport[0].name}` : 'no files uploaded yet'}
						</p>
					</div>
				</div>
			</WizardItem>
			<WizardItem id='step6' title='Emergency Contact & Other Documents'>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<FileUploader
							multiple
							handleChange={otherHandleChange}
							name='file'
							types={fileTypes}
						/>
					</div>
					<div className='col-lg-12'>
						<p>
							{otherDoc ? `File name: ${otherDoc[0].name}` : 'no files uploaded yet'}
						</p>
					</div>
				</div>
			</WizardItem>
		</Wizard>
	);
}

export default ProfileForm;