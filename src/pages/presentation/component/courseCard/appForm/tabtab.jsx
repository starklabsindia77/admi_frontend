
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Typography, Grid, Link } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import Textarea from '../../../../../components/bootstrap/forms/Textarea';
import { serverUrl } from '../../../../../config';

const TabTab = (data) => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const [role, setRole] = useState();
	const [one, setOne] = useState(data.data.data);
	const [studentList,setStudentList]=useState([])
	const loginUser=JSON.parse(localStorage.getItem("userInfo"))
	console.log("loginUser::",loginUser)
	const [collegeInfo, setcollegeInfo] = useState({
		country: one.university.country,
		preferCollege: one.university.name,
		preferCourse: one.name,
		Intake: '',
		Year: '',
		remark: '',
		ApplicationID:
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15),
	
		CourseID: one._id,
		AppType: 'general',
		AgentId:'',
		studentInfo:{},
		stdId:Math.floor(Math.random() * (99999-20000+ 1))
	});
	const [openData, setOpenData] = useState(false);
	const authToken = localStorage.getItem('auth');
	const [studentData,setStudentData]=useState(null)
	const handleClose = () => {
		setOpenData(false);
	};
	const getStudent = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'authorization': authToken
			},
		};

		fetch(`${serverUrl}/auth/userall`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.user.length > 0) {
					console.log('result', d.user)
					const ss = d.user.filter(val => val.role && val.role.toString().toLowerCase().includes("student"))
					setStudentList(ss)
				}
			});
	}

	const userInfo = () => {
		const userInfoName = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfoName.role === 'Student') {
			console.log('Student role');
			setcollegeInfo({
				...collegeInfo,
				StudentID: userInfoName.guid,
			});
		}
	};

	const submitApplication = () => {
		if(loginUser.role.toLowerCase()==="student")
		{
				// setcollegeInfo({...collegeInfo,studentInfo:loginUser})	
				collegeInfo.studentInfo=loginUser
			}
			console.log('submit', collegeInfo);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
			body: JSON.stringify(collegeInfo),
		};

		fetch(`${serverUrl}/application/add`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
					if(ss === 'Done'){
						setTimeout(()=>{

							navigate('/applications');
						},1000)
					}
					console.log('submit result', ss)
				}
			});
	};
console.log("collegeInfo::",collegeInfo)
	useEffect(() => {
		if(loginUser.role&&loginUser.role.toLowerCase()==="agent")
		{

			setcollegeInfo({...collegeInfo,AgentId:loginUser._id})
		}
	 if(loginUser.role.toLowerCase()==="student")
		{
			setcollegeInfo({...collegeInfo,studentInfo:loginUser})	
		}
		userInfo();
		getStudent()
	}, []);
	return (
		<Stack maxWidth='100%'>
			<Stack direction='row' justifyContent='space-around'>
				<Stack>
					{loginUser.role&&loginUser.role.toLowerCase()==="agent"&&
				<Box pt={2} pb={2}>
				<FormGroup id='center' isFloating>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        // options={studentList.map((option) => option)}
                                        // value={collegeInfo.StudentID}
										options={studentList}
										getOptionSelected={(option, value) => option.name === value.name}
										autoHighlight
										getOptionLabel={(option) => option.name}
										// value={windData.loc_id!==0?locationList.filter((value)=>{
										//   return value._id._str==windData.loc_id._str
					
										// }):null}
										value={studentData}
                                        onChange={(event, newValue) => {
                                            setcollegeInfo({...collegeInfo, studentInfo:newValue});
											setStudentData(newValue)
                                        }}
                                        // inputValue={inputValue}
                                        // onInputChange={(event, newInputValue) => {
                                        //     setInputValue(newInputValue);
                                        // }}
                                        renderInput={(params) => <TextField {...params} label="Student List" />}
                                    />
                                </FormGroup>
</Box>
}
					<Box pt={2} pb={2}>
						<FormGroup id='preferCollege' label='Prefer College' isFloating>
							<Input
								onChange={(e) => {
									setcollegeInfo({ preferCollege: e.target.value });
								}}
								disabled
								placeholder='Prefer College'
								autoComplete='additional-name'
								validFeedback='Looks good!'
								value={collegeInfo.preferCollege}
							/>
						</FormGroup>
					</Box>
					<Box pt={2} pb={2}>
						<FormGroup id='preferCourse' label='Prefer Course' isFloating>
							<Input
								onChange={(e) => {
									setcollegeInfo({ preferCourse: e.target.value });
								}}
								disabled
								placeholder='Prefer Course'
								autoComplete='additional-name'
								validFeedback='Looks good!'
								value={collegeInfo.preferCourse}
							/>
						</FormGroup>
					</Box>
					<Stack direction='row' justifyContent='space-between' pt={2} pb={4}>
						<Box mr={2}>
							<FormGroup id='Intake' label='Intake' isFloating>
								<Input
									onChange={(e) => {
										setcollegeInfo({ ...collegeInfo, Intake: e.target.value });
									}}
									placeholder='Intake'
									autoComplete='additional-name'
									validFeedback='Looks good!'
									value={collegeInfo.Intake}
								/>
							</FormGroup>
						</Box>
						<Box>
							<FormGroup id='Year' label='Year' isFloating>
								<Input
									onChange={(e) => {
										setcollegeInfo({ ...collegeInfo, Year: e.target.value });
									}}
									placeholder='Year'
									autoComplete='additional-name'
									validFeedback='Looks good!'
									value={collegeInfo.Year}
								/>
							</FormGroup>
						</Box>
					</Stack>
					<h5 style={{ fontWeight: 'bold' }}>Remark</h5>
					<Textarea
						aria-label='.form-control-lg example'
						onChange={(e) => {
							setcollegeInfo({ ...collegeInfo, remark: e.target.value });
						}}
						value={collegeInfo.remark}
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

export default TabTab;
