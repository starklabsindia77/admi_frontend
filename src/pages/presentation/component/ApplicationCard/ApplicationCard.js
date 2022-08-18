/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
// import { Stack } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import classNames from 'classnames';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './ApplicationCard.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { Grid, Divider, Paper, Box, Typography, Button } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Icon from '../../../../components/icon/Icon';
import Select from '../../../../components/bootstrap/forms/Select';
import useDarkMode from '../../../../hooks/useDarkMode';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
// import Button from '../../../../components/bootstrap/Button';
import { serverUrl } from '../../../../config';

import HorizontalLabelPositionBelowStepper from './appstepper';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ApplicationCard({ data, wishData }) {
	console.log('data..........................', data);
	const navigate = useNavigate();
	const [state, setState] = useState(false);
	const { darkModeStatus } = useDarkMode();
	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [sizeStatus, setSizeStatus] = useState(null);
	const [fullScreenStatus, setFullScreenStatus] = useState(null);
	const [animationStatus, setAnimationStatus] = useState(true);
	const [longContentStatus, setLongContentStatus] = useState(false);
	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);

	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setSizeStatus(null);
		setFullScreenStatus(null);
		setAnimationStatus(true);
		setLongContentStatus(false);
		setHeaderCloseStatus(true);
	};
	const authToken = localStorage.getItem('auth');
	const userInfoName = JSON.parse(localStorage.getItem('userInfo'));
	const [userData, setUserData] = useState({});
	const [stages, setStages] = useState([]);
	const [statusList, setStatusList] = useState([]);
	const [status, setStatus] = useState();
	const [gStatus, setGStatus] = useState();
	const date = [
		{ date1: 'xx-xx-xxxx' },
		{ date1: 'xx-xx-xxxx' },
		{ date1: 'xx-xx-xxxx' },
		{ date1: 'xx-xx-xxxx' },
		{ date1: 'xx-xx-xxxx' },
		{ date1: 'xx-xx-xxxx' },
		{ date1: 'xx-xx-xxxx' },
		{ date1: 'xx-xx-xxxx' },
		{ date1: 'xx-xx-xxxx' },
	];
	const genStatus = [
		{ value: 'Started & Submitted for options', text: 'Started & Submitted for options' },
		{ value: 'Review and Course finalization', text: 'Review and Course finalization' },
		{ value: 'Application fee Paid', text: 'Application fee Paid' },
		{ value: 'Submitted', text: 'Submitted' },
		{ value: 'LOA/OL', text: 'LOA/OL' },
		{ value: 'Tuition Fee Paid', text: 'Tuition Fee Paid' },
		{ value: 'Visa Applied', text: 'Visa Applied' },
		{ value: 'Visa Approved', text: 'Visa Approved' },
		{ value: 'Cancel Withdrawn', text: 'Cancel Withdrawn' },
		{ value: 'Refund Required', text: 'Refund Required' },
		{ value: 'Enrolled & Closed', text: 'Enrolled & Closed' },
		{ value: 'Offer Letter Expired', text: 'Offer Letter Expired' },
		{ value: 'Refund & Closed', text: 'Refund & Closed' },
		{ value: 'Rejection From Institution', text: 'Rejection From Institution' },
		{ value: 'Cancelled Students', text: 'Cancelled Students' },
	];

	const userInfo = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/auth/user/${data.StudentID}`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.success) {
					const ss = d.result;
					// console.log('userInfo Result', ss);
					setUserData(ss);
					// setApplicationList(ss)
				}
			});
	};

	const getStages = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/stages/${data.country}`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result[0];
					setStatusList(ss.Stages);
					const list = [];
					ss.Stages.map((item) => list.push(item.text));
					setStages(list);
					// setApplicationList(ss)
				}
			});
	};

	const updateStatus = () => {
		// console.log('status', status);
		if (status && status.length > 0) {
			console.log('status', status);
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					authorization: authToken,
				},
				body: JSON.stringify({ value: status, guid: data.guid, appStatus: gStatus }),
			};

			fetch(`${serverUrl}/application/update`, options)
				.then((response) => response.json())
				.then((d) => {
					// console.log('data', d);
					if (d.error) {
						console.log('error msg', d.error);
					} else if (d.result.length > 0) {
						const ss = d.result;
						console.log('info', ss);
						setState(false);
						// if (ss === 'Done') {
						// 	navigate('/applications');
						// }
					}
				});
		}
	};

	useEffect(() => {
		userInfo();
		getStages();
	}, []);
	return (
		<div className='post'>
			<Grid container spacing={1} p={1}>
				<Grid item xs={1}>
					<img
						src='https://app.dfavo.com/assets/images/dummy-profile-pic.jpg'
						alt='varun'
						style={{ width: '50px', height: '50px' }}
					/>
				</Grid>
				<Grid item xs={8}>
					<div style={{ marginBottom: '-5px' }}>
						<h5>
							{userData && userData.name ? userData.name : 'Sahil Batra'}
							<Button
								variant='contained'
								style={{
									backgroundColor: '#f1f2f5',
									marginLeft: '12px',
									color: '#000000',
									height: '20px',
								}}>
								Student ID:275885
							</Button>
							<Button
								variant='contained'
								style={{
									backgroundColor: '#f1f2f5',
									marginLeft: '12px',
									color: '#000000',
									height: '20px',
								}}>
								Application ID:{' '}
								{data && data.ApplicationID ? data.ApplicationID : 'NA'}
							</Button>
							<IconButton size='medium'>
								<TextSnippetIcon fontSize='medium' />
							</IconButton>
						</h5>
					</div>
					<Stack direction='row'>
						<Button variant='text' size='medium' startIcon={<LocalPhoneIcon />}>
							{userData && userData.contact ? userData.contact : '9999219809'}
						</Button>
						<Button variant='text' size='medium' startIcon={<EmailIcon />}>
							{userData && userData.email ? userData.email : 'sahil@yopmail.com'}
						</Button>
						<Button variant='text' size='medium' startIcon={<CalendarMonthIcon />}>
							{userData && userData.dob ? userData.dob : 'NA'}
						</Button>
					</Stack>
					<div style={{ marginBottom: '-5px' }}>
						<p>
							Indu Sharma (Study Advisor)
							<small className='ms-2'>+1 Study Advisor</small>
						</p>
					</div>
				</Grid>
				<Grid item xs={3}>
					<Stack direction='row' justifyContent='flex-end' p={1}>
						{userInfoName.role === 'Student' && data && data.status === 'new' ? (
							<Button
								style={{ width: '180px', height: '50px', mt: '30px' }}
								variant='outlined'
								color='info'
								startIcon={<EditIcon />}>
								Edit Application
							</Button>
						) : userInfoName.role === 'admin' ? (
							<Button
								style={{ width: '180px', height: '50px', mt: '30px' }}
								variant='outlined'
								color='info'
								onClick={() => {
									initialStatus();
									setSizeStatus('lg');
									setState(true);
								}}
								startIcon={<EditIcon />}>
								Change Status
							</Button>
						) : (
							<Button
								style={{ width: '180px', height: '50px', mt: '30px' }}
								variant='outlined'
								color='info'
								startIcon={<EditIcon />}>
								View Application
							</Button>
						)}
					</Stack>
				</Grid>
			</Grid>
			<Divider />
			<Grid container spacing={2} p={1}>
				<Grid item xs={6}>
					<h6>
						{data && data.preferCourse && data.country
							? `${data.preferCourse}, ${data.country}`
							: 'Academies Australasia Polytechnic, Australia'}
					</h6>
					<p>
						Intake:{' '}
						{data && data.Intake && data.Year
							? `${data.Intake}   ${data.Year}`
							: 'JAN, 2023'}
					</p>
				</Grid>
				<Grid item xs={6}>
					<Stack direction='row' justifyContent='flex-end' p={1}>
						<Button
							variant='contained'
							style={{
								backgroundColor: '#f1f2f5',
								marginLeft: '12px',
								color: '#000000',
								height: '20px',
							}}>
							{data && data.Application_Status
								? data.Application_Status
								: 'Started & Submitted for options'}
						</Button>
					</Stack>
				</Grid>
			</Grid>
			<Grid container spacing={2} p={1}>
				<Grid item xs={12}>
					<Stack direction='row'>
						<Stack>
							<HorizontalLabelPositionBelowStepper data={data} stages={stages} />
						</Stack>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<Button variant='text' endIcon={<KeyboardArrowDownIcon />}>
						View More{' '}
					</Button>
				</Grid>
			</Grid>
			<Modal
				isOpen={state}
				setIsOpen={setState}
				titleId='exampleModalLabel'
				isStaticBackdrop={staticBackdropStatus}
				isScrollable={scrollableStatus}
				isCentered={centeredStatus}
				size={sizeStatus}
				fullScreen={fullScreenStatus}
				isAnimation={animationStatus}>
				<ModalHeader setIsOpen={headerCloseStatus ? setState : null}>
					<ModalTitle id='exampleModalLabel'>Change Status</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<Grid container spacing={2} p={1}>
						<Grid item xs={12}>
							<Select
								id='preferCourse'
								size='lg'
								ariaLabel='preferCourse'
								placeholder='New Stage'
								list={statusList}
								className={classNames('rounded-1', {
									'bg-white': !darkModeStatus,
								})}
								onChange={(e) => {
									setStatus(e.target.value);
								}}
								// value={expertCollegeInfo.preferCourse}
							/>
						</Grid>
						<Grid item xs={12}>
							<Select
								id='preferCourse'
								size='lg'
								ariaLabel='preferCourse'
								placeholder='New Status'
								list={genStatus}
								className={classNames('rounded-1', {
									'bg-white': !darkModeStatus,
								})}
								onChange={(e) => {
									setGStatus(e.target.value);
								}}
								// value={expertCollegeInfo.preferCourse}
							/>
						</Grid>
					</Grid>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setState(false)}>
						Close
					</Button>
					<Button color='info' icon='Save' onClick={() => updateStatus()}>
						Save changes
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
export default ApplicationCard;
