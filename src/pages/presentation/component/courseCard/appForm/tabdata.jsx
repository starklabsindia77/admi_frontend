/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Typography, Grid, Link } from '@mui/material';
import classNames from 'classnames';
import _ from 'underscore';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import Textarea from '../../../../../components/bootstrap/forms/Textarea';
import Select from '../../../../../components/bootstrap/forms/Select';
import { serverUrl } from '../../../../../config';
import useDarkMode from '../../../../../hooks/useDarkMode';

const TabData = () => {
	const navigate = useNavigate();
	const { darkModeStatus } = useDarkMode();
	const [expertCollegeInfo, setExpertCollegeInfo] = useState({
		country: '',
		preferCollege: '',
		preferCourse: '',
		Intake: '',
		Year: '',
		remark: '',
		ApplicationID:
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15),
		StudentID: '',
		CourseID: '',
		AppType: 'ExpertAdvise',
	});

	const [countryList, setCountryList] = useState([]);
	const [universityList, setUniversityList] = useState([]);
	const [courseList, setCourseList] = useState([]);
	const [courseList2, setCourseList2] = useState([]);
	const [one, setOne] = useState({});
	const authToken = localStorage.getItem('auth');
	const getCourses = (uni) => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/courses/uni/${uni}`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
					setCourseList2(ss);
					const list = [];
					_.each(ss, (dat) => {
						list.push(dat.name);
					});
					// console.log('result', list);
					const uniqueList = [...new Set(list)];
					const UL = [];
					_.each(uniqueList, (dat) => {
						UL.push({ value: dat, text: dat });
					});
					setCourseList(UL);
				}
			});
	};

	const getUniversity = (country) => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/university/coun/${country}`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
					const list = [];
					_.each(ss, (dat) => {
						list.push(dat.name);
					});
					// // console.log('result', list);
					const uniqueList = [...new Set(list)];
					const UL = [];
					_.each(uniqueList, (dat) => {
						UL.push({ value: dat, text: dat });
					});
					setUniversityList(UL);
				}
			});
	};

	const getCountry = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/university`, options)
			.then((response) => response.json())
			.then((d) => {
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
					const list = [];
					_.each(ss, (dat) => {
						list.push(dat.country);
					});
					const uniqueList = [...new Set(list)];
					const UL = [];
					_.each(uniqueList, (dat) => {
						UL.push({ value: dat, text: dat });
					});
					setCountryList(UL);
				}
			});
	};

	const singleCourse = (name) => {
		const singlecourse2 = courseList2.filter((item) => item.name === name);
		setOne(singlecourse2[0]);
		setExpertCollegeInfo({ ...expertCollegeInfo, CourseID: singlecourse2[0]._id });
		setExpertCollegeInfo({
			...expertCollegeInfo,
			preferCourse: singlecourse2[0].name,
		});
	};

	const submitApplication = () => {
		console.log('submit', expertCollegeInfo);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
			body: JSON.stringify(expertCollegeInfo),
		};

		fetch(`${serverUrl}/application/add`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
					if (ss === 'Done') {
						navigate('/applications');
					}
					console.log('submit result', ss);
				}
			});
	};

	const userInfo = () => {
		const userInfoName = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfoName.role === 'Student') {
			setExpertCollegeInfo({
				...expertCollegeInfo,
				StudentID: userInfoName.guid,
			});
		}
	};

	useEffect(() => {
		getCountry();
		userInfo();
	}, []);

	return (
		<Stack maxWidth='100%'>
			<Stack direction='row' justifyContent='space-around'>
				<Stack>
					<Box pt={2} pb={2}>
						<Select
							id='preferCountry'
							size='lg'
							ariaLabel='preferCountry'
							placeholder='Prefer Country'
							list={countryList}
							className={classNames('rounded-1', {
								'bg-white': !darkModeStatus,
							})}
							onChange={(e) => {
								setExpertCollegeInfo({
									...expertCollegeInfo,
									country: e.target.value,
								});
								getUniversity(e.target.value);
							}}
							value={expertCollegeInfo.country}
						/>
					</Box>

					<Box pt={2} pb={2}>
						<Select
							id='preferCollege'
							size='lg'
							ariaLabel='preferCollege'
							placeholder='Prefer College'
							list={universityList}
							className={classNames('rounded-1', {
								'bg-white': !darkModeStatus,
							})}
							onChange={(e) => {
								setExpertCollegeInfo({
									...expertCollegeInfo,
									preferCollege: e.target.value,
								});
								getCourses(e.target.value);
							}}
							value={expertCollegeInfo.preferCollege}
						/>
					</Box>
					<Box pt={2} pb={2}>
						<Select
							id='preferCourse'
							size='lg'
							ariaLabel='preferCourse'
							placeholder='Prefer Course'
							list={courseList}
							className={classNames('rounded-1', {
								'bg-white': !darkModeStatus,
							})}
							onChange={(e) => {
								singleCourse(e.target.value);
							}}
							// value={expertCollegeInfo.preferCourse}
						/>
					</Box>
					<Stack direction='row' justifyContent='space-between' pt={2} pb={4}>
						<Box mr={2}>
							<FormGroup id='Intake' label='Intake' isFloating>
								<Input
									onChange={(e) => {
										setExpertCollegeInfo({
											...expertCollegeInfo,
											Intake: e.target.value,
										});
									}}
									placeholder='Intake'
									autoComplete='additional-name'
									validFeedback='Looks good!'
									value={expertCollegeInfo.Intake}
								/>
							</FormGroup>
						</Box>
						<Box>
							<FormGroup id='Year' label='Year' isFloating>
								<Input
									onChange={(e) => {
										setExpertCollegeInfo({
											...expertCollegeInfo,
											Year: e.target.value,
										});
									}}
									placeholder='Year'
									autoComplete='additional-name'
									validFeedback='Looks good!'
									value={expertCollegeInfo.Year}
								/>
							</FormGroup>
						</Box>
					</Stack>
					<h5 style={{ fontWeight: 'bold' }}>Remark</h5>
					<Textarea
						aria-label='.form-control-lg example'
						onChange={(e) => {
							setExpertCollegeInfo({ ...expertCollegeInfo, remark: e.target.value });
						}}
						value={expertCollegeInfo.remark}
					/>
					<Box pt={2}>
						<Button onClick={submitApplication} variant='contained' size='large'>
							Add Student Application
						</Button>
					</Box>
				</Stack>
				<Stack minWidth='60%'>
					<Box p={2} borderBottom='1px solid teal'>
						<img
							src='https://app.dfavo.com//uploads/college_logo/130.png'
							alt='rishav'
							style={{ width: '150px' }}
						/>
						<Typography variant='h4' mb={2}>
							{one && one.university && one.university.name
								? one.university.name
								: 'Academies Australasia Polytechnic'}
						</Typography>
						{/* <Typography variant='h5'>College Website</Typography>
						<Link href='http://www.aapoly.edu.au' variant='h6' mb={2}>
							http://www.aapoly.edu.au
						</Link> */}
					</Box>
					<Box mt={2} pl={2}>
						<Typography variant='h4' mb={2}>
							{one && one.name
								? one.name
								: 'Bachelor of Tourism and Hospitality Management'}
						</Typography>
						<Link href='https://aapoly.edu.au/courses/bachelor-degree/' variant='h6'>
							{one && one.website_url
								? one.website_url
								: 'https://aapoly.edu.au/courses/bachelor-degree/'}
						</Link>
					</Box>

					<Grid container mt={2} p={2}>
						<Grid item xs={6} variant='h4' mb={2}>
							Tuition Fee: {one && one.averageFees ? one.averageFees : 'NA'}
						</Grid>
						<Grid item xs={6} mb={2}>
							Application Fee:{' '}
							{one && one.applicationFees ? one.applicationFees : '0'}
						</Grid>
						<Grid item xs={6}>
							Initial Deposit :{one && one.initialDeposit ? one.initialDeposit : '0'}
						</Grid>
						<Grid item xs={6}>
							Intake:{one && one.intake ? one.intake : 'NA'}
						</Grid>
					</Grid>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default TabData;
