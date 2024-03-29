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

function ApplicationForm({ data, wishData }) {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();

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
											placeholder='First Name'
											autoComplete='additional-name'
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='middleName' label='Middle Name' isFloating>
										<Input
											placeholder='Middle Name'
											autoComplete='additional-name'
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='lastName' label='Last Name' isFloating>
										<Input
											placeholder='Last Name'
											autoComplete='family-name'
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='firstName' label='Date Of Birth' isFloating>
										<Input
											placeholder='Date Of Birth'
											autoComplete='additional-name'
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='language' label='First Language' isFloating>
										<Input
											placeholder='First Language'
											autoComplete='additional-name'
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<Select
										id='category'
										size='lg'
										ariaLabel='Category'
										placeholder='Country of Citizenship'
										list={_selectOptions}
									/>
								</div>
								<div className='col-md-6'>
									<Typography variant='p'>Gender</Typography>
									<ChecksGroup isInline>
										<Checks
											type='radio'
											id='inlineRadioOne'
											label='Male'
											name='radios'
											value='male'
										/>
										<Checks
											type='radio'
											id='inlineRadioTwo'
											label='Female'
											name='radios'
											value='female'
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
											name='radios'
											value='married'
										/>
										<Checks
											type='radio'
											id='inlineRadioTwo'
											label='Unmarried'
											name='radios'
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
											placeholder='Passport Number'
											autoComplete='passport'
											validFeedback='Looks good!'
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
											type='date'
											placeholder='Passport Expiry Date'
											autoComplete='Passport-Expiry-Date'
											validFeedback='Looks good!'
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
											placeholder='Email address'
											autoComplete='email'
											validFeedback='Looks good!'
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
										<Select
											ariaLabel='State'
											placeholder='Choose...'
											list={[
												{ value: 'usa', text: 'USA' },
												{ value: 'ca', text: 'Canada' },
											]}
											// onChange={formik.handleChange}
											// onBlur={formik.handleBlur}
											// value={formik.values.state}
											// isValid={formik.isValid}
											// isTouched={formik.touched.state}
											// invalidFeedback={formik.errors.state}
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='zip' label='Zip' isFloating>
										<Input
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
			</WizardItem>
			<WizardItem id='step2' title='Education History'>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<FormGroup id='addressLine' label='Address Line' isFloating>
							<Input
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
							<Select
								ariaLabel='State'
								placeholder='Choose...'
								list={[
									{ value: 'usa', text: 'USA' },
									{ value: 'ca', text: 'Canada' },
								]}
								// onChange={formik.handleChange}
								// onBlur={formik.handleBlur}
								// value={formik.values.state}
								// isValid={formik.isValid}
								// isTouched={formik.touched.state}
								// invalidFeedback={formik.errors.state}
							/>
						</FormGroup>
					</div>
					<div className='col-md-3'>
						<FormGroup id='zip' label='Zip' isFloating>
							<Input
							// onChange={formik.handleChange}
							// onBlur={formik.handleBlur}
							// value={formik.values.zip}
							// isValid={formik.isValid}
							// isTouched={formik.touched.zip}
							// invalidFeedback={formik.errors.zip}
							/>
						</FormGroup>
					</div>
				</div>
			</WizardItem>
			<WizardItem id='step3' title='Test Scores'>
				<div className='row g-4'>
					<div className='col-12'>
						<FormGroup>
							<Label>Email Notifications</Label>
							{/* <ChecksGroup>
								{notificationTypes.map((cat) => (
									<Checks
										type='switch'
										key={cat.id}
										id={cat.id.toString()}
										name='emailNotification'
										label={cat.name}
										value={cat.id}
										onChange={formik.handleChange}
										checked={formik.values.emailNotification.includes(
											cat.id.toString(),
										)}
									/>
								))}
							</ChecksGroup> */}
						</FormGroup>
					</div>
					<div className='col-12'>
						<FormGroup>
							<Label>Push Notifications</Label>
							{/* <ChecksGroup>
								{notificationTypes.map((cat) => (
									<Checks
										type='switch'
										key={cat.id}
										id={cat.id.toString()}
										name='pushNotification'
										label={cat.name}
										value={cat.id}
										onChange={formik.handleChange}
										checked={formik.values.pushNotification.includes(
											cat.id.toString(),
										)}
									/>
								))}
							</ChecksGroup> */}
						</FormGroup>
					</div>
				</div>
			</WizardItem>
			<WizardItem id='step4' title='Background Information'>
				<div className='row g-3'>
					<div className='col-9 offset-3'>
						<h3 className='mt-4'>Account Detail</h3>
						<h4 className='mt-4'>Personal Information</h4>
					</div>
				</div>
			</WizardItem>
			<WizardItem id='step5' title='Upload Documents'>
				<div className='row g-3'>
					<div className='col-9 offset-3'>
						<h3 className='mt-4'>Account Detail</h3>
						<h4 className='mt-4'>Personal Information</h4>
					</div>
				</div>
			</WizardItem>
		</Wizard>
	);
}

export default ApplicationForm;
