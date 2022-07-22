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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const PreviewItem = ({ title, value }) => {
	return (
		<>
			<div className='col-3 text-end'>{title}</div>
			<div className='col-9 fw-bold'>{value || '-'}</div>
		</>
	);
};

function ApplicationForm({ data, wishData }) {
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
							<div className='col-md-6'>
								<FormGroup id='firstName' label='First Name' isFloating>
									<Input
										placeholder='First Name'
										autoComplete='additional-name'
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.firstName}
										// isValid={formik.isValid}
										// isTouched={formik.touched.firstName}
										// invalidFeedback={formik.errors.firstName}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup id='lastName' label='Last Name' isFloating>
									<Input
										placeholder='Last Name'
										autoComplete='family-name'
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.lastName}
										// isValid={formik.isValid}
										// isTouched={formik.touched.lastName}
										// invalidFeedback={formik.errors.lastName}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-12'>
								<FormGroup
									id='displayName'
									label='Display Name'
									isFloating
									// formText='This will be how your name will be displayed in the account section and in reviews'
								>
									<Input
										placeholder='Display Name'
										autoComplete='username'
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.displayName}
										// isValid={formik.isValid}
										// isTouched={formik.touched.displayName}
										// invalidFeedback={formik.errors.displayName}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
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
							<div className='col-6'>
								<FormGroup id='phoneNumber' label='Phone Number' isFloating>
									<Input
										placeholder='Phone Number'
										type='tel'
										autoComplete='tel'
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.phoneNumber}
										// isValid={formik.isValid}
										// isTouched={formik.touched.phoneNumber}
										// invalidFeedback={formik.errors.phoneNumber}
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
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.emailAddress}
										// isValid={formik.isValid}
										// isTouched={formik.touched.emailAddress}
										// invalidFeedback={formik.errors.emailAddress}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
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
					</Grid>
				</Grid>
				{/* <Card>
					<CardBody>
						<div className='row g-4 align-items-center'>
							<div className='col-xl-auto'>
								<Avatar srcSet={User1Webp} src={User1Img} />
							</div>
							<div className='col-xl'>
								<div className='row g-4'>
									<div className='col-auto'>
										<Input type='file' autoComplete='photo' />
									</div>
									<div className='col-auto'>
										<Button color='dark' isLight icon='Delete'>
											Delete Avatar
										</Button>
									</div>
									<div className='col-12'>
										<p className='lead text-muted'>
											Avatar helps your teammates get to know you.
										</p>
									</div>
								</div>
							</div>
						</div>
					</CardBody>
				</Card> */}

				{/* <Card>
					<CardHeader>
						<CardLabel icon='Edit' iconColor='warning'>
							<CardTitle>Personal Information</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='pt-0'>
						<div className='row g-4'>
							<div className='col-md-6'>
								<FormGroup id='firstName' label='First Name' isFloating>
									<Input
										placeholder='First Name'
										autoComplete='additional-name'
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.firstName}
										// isValid={formik.isValid}
										// isTouched={formik.touched.firstName}
										// invalidFeedback={formik.errors.firstName}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup id='lastName' label='Last Name' isFloating>
									<Input
										placeholder='Last Name'
										autoComplete='family-name'
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.lastName}
										// isValid={formik.isValid}
										// isTouched={formik.touched.lastName}
										// invalidFeedback={formik.errors.lastName}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-12'>
								<FormGroup
									id='displayName'
									label='Display Name'
									isFloating
									formText='This will be how your name will be displayed in the account section and in reviews'>
									<Input
										placeholder='Display Name'
										autoComplete='username'
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.displayName}
										// isValid={formik.isValid}
										// isTouched={formik.touched.displayName}
										// invalidFeedback={formik.errors.displayName}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
					</CardBody>
				</Card> */}

				{/* <Card className='mb-0'>
					<CardHeader>
						<CardLabel icon='MarkunreadMailbox' iconColor='success'>
							<CardTitle>Contact Information</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='pt-0'>
						<div className='row g-4'>
							<div className='col-12'>
								<FormGroup id='phoneNumber' label='Phone Number' isFloating>
									<Input
										placeholder='Phone Number'
										type='tel'
										autoComplete='tel'
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.phoneNumber}
										// isValid={formik.isValid}
										// isTouched={formik.touched.phoneNumber}
										// invalidFeedback={formik.errors.phoneNumber}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-12'>
								<FormGroup id='emailAddress' label='Email address' isFloating>
									<Input
										type='email'
										placeholder='Email address'
										autoComplete='email'
										// onChange={formik.handleChange}
										// onBlur={formik.handleBlur}
										// value={formik.values.emailAddress}
										// isValid={formik.isValid}
										// isTouched={formik.touched.emailAddress}
										// invalidFeedback={formik.errors.emailAddress}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
					</CardBody>
				</Card> */}
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
