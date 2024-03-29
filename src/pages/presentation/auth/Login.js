/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { CometChat } from '@cometchat-pro/chat';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import { serverUrl, ChatAuthKey } from '../../../config';
// eslint-disable-next-line react/prop-types
const LoginHeader = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

const ToastOptions = {
	position: "top-center",
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
  }
const Login = ({ isSignUp }) => {
	const { darkModeStatus } = useDarkMode();
	
	
	const [usernameInput, setUsernameInput] = useState(false);
	const [isNewUser, setIsNewUser] = useState(isSignUp);
	const [username, setUsername] = useState();
	const [name, setName] = useState();
	const [contact, setContact] = useState();
	const [dob, setDob] = useState();
	const [role, setRole] = useState('Student');
	const [newPassword, setPassword] = useState("");
	const [openData, setOpenData] = useState(false);
	const [newUser, setNewUser] = useState({});
	const [Isloader, setIsloader] = useState(false);
	// // const serverUrl = "https://salty-scrubland-03771.herokuapp.com/api";
	// const serverUrl = "http://localhost:3001/api";
	const navigate = useNavigate();
	// const handleOnClick = useCallback(() => navigate('/dashboard'), [navigate]);
	const signup = () => {
		const userData = { 'name': name, 'email': username, 'password': newPassword, 'contact': contact, 'role': role };
		console.log("data", userData);
		return axios.post(`${serverUrl}/auth/signup`, userData, {
			headers: {
			   accept: "*/*",
			  "Access-Control-Allow-Origin": "*",
			  withCredentials: true,
			  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
			  "Access-Control-Allow-Headers":
				"accept, content-type, x-access-token, x-requested-with",
			},
		  }).then((res)=>{
			if(res.data.success){
				const {data} = res;
				// setOpenData(true);
				toast.success("Account Created Successfully", ToastOptions);
				localStorage.setItem('auth', data.token);
				localStorage.setItem('userName', name);
				localStorage.setItem('role', role);
				const UID = userData.email.split("@")[0];
				const metadataObj = {"email":userData.email, "contactNumber":userData.contact}
				const chatuser = new CometChat.User(UID);
				chatuser.setName(userData.name);
				chatuser.setMetadata(JSON.stringify(metadataObj))
				CometChat.createUser(chatuser, ChatAuthKey).then(
					user => {
						console.log("user created", user);
					}, error => {
						console.log("error", error);
					}
				)
				localStorage.setItem('email', username);
				setTimeout(() => {
					setIsloader(false);
					navigate('/dashboard');
				}, 1000);
			}else{
				toast.error("Please enter a valid email or something went wrong ", ToastOptions);
			}
		  }).catch(()=>{
			setIsloader(false);
		})

		// const options = {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json;charset=utf-8',
		// 	},
			
		// 	body: JSON.stringify(userData),
		// };

		// fetch(`${serverUrl}/auth/signup`, options)
		// 	.then((response) => 
		// 	response.json())
		// 	.then((data) => {
		// 		console.log('data', data);
		// 		if (data.message !== 'Successfully created a new user') {
		// 			console.log('error msg', data.message);
		// 		} else {
		// 			setOpenData(true);
		// 			localStorage.setItem('auth', data.token);
		// 			localStorage.setItem('userName', name);
		// 			localStorage.setItem('role', role);
		// 			const UID = userData.email.split("@")[0];
		// 			const metadataObj = {"email":userData.email, "contactNumber":userData.contact}
		// 			const chatuser = new CometChat.User(UID);
		// 			chatuser.setName(userData.name);
		// 			chatuser.setMetadata(JSON.stringify(metadataObj))
		// 			CometChat.createUser(chatuser, ChatAuthKey).then(
		// 				user => {
		// 					console.log("user created", user);
		// 				}, error => {
		// 					console.log("error", error);
		// 				}
		// 			)
		// 			localStorage.setItem('email', username);
		// 			setTimeout(() => {
		// 				setIsloader(false);
		// 				navigate('/dashboard');
		// 			}, 1000);
		// 		}
		// 	});
	}

	const LoginClick = () => {
		const payload={
			 email: username, 
			 password: newPassword 
		}
		return axios.post(`${serverUrl}/auth/login`, payload, {
          headers: {
             accept: "*/*",
            "Access-Control-Allow-Origin": "*",
            withCredentials: true,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
            "Access-Control-Allow-Headers":
              "accept, content-type, x-access-token, x-requested-with",
          },
        }).then((res)=>{
			console.log("res log::",res)
			if(res.data.success)
			{
				console.log('0');
				toast.success("Login Successfully", ToastOptions);
				localStorage.setItem('auth',res.data.token);
				localStorage.setItem('userName', res.data.user.name);
				localStorage.setItem('role',res.data.user.role);
				localStorage.setItem('loginUserId', res.data.user._id);
				localStorage.setItem('userInfo', JSON.stringify(res.data.user));
				localStorage.setItem('email', username);
				const UID2 = username.split("@")[0];
				CometChat.getLoggedinUser().then(
					user => {						
					  if(!user){
						CometChat.login(UID2, ChatAuthKey).then(
						  loginuser => {
							console.log("Login Successful:", { loginuser });
							console.log('2');
							navigate('/dashboard');  
						  },
						  error => {
							console.log("Login failed with exception:", { error });
							if(error.code === 'ERR_UID_NOT_FOUND'){
								const metadataObj = {"email":username, "contactNumber":res.data.user.contact}

								const userinfo = new CometChat.User(UID2);

								userinfo.setName(res.data.user.name);
								userinfo.setRole(res.data.user.role);
								userinfo.setMetadata(JSON.stringify(metadataObj))
								CometChat.createUser(userinfo, ChatAuthKey).then(
									user2 => {
										console.log("user created", user2);
										CometChat.login(UID2, ChatAuthKey).then(
											loginuser2 => {
											  console.log("Login Successful:", { loginuser2 });    
											  navigate('/dashboard');
											}, loginerror => {
												console.log("Login failed with exception:", { loginerror });
											})
										
									}, error1 => {
										console.log("user ---- error", error1);
										navigate('/dashboard');
									}
								)
							}
						  }
						);
					  }else{
						// User already logged in
						navigate('/dashboard');
						console.log("User already logged in");
					  }
					}, error => {
					  console.log("getLoggedinUser failed with exception:", { error });
					}
				);
				  
				
				
				setIsloader(false);
			}
			else{
				toast.error("Please enter a valid email or something went wrong ", ToastOptions);	
			}
		}).catch(()=>{
					setIsloader(false);
				})


	};
	// console.log("status", status);

	const handleClose = () => {
		setOpenData(false);
	};
	const handleOnClick = () => {
		navigate('auth/sign-up');
	};
	 
	const emailVerify=()=>{
		const verify = username.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) 
        console.log("email verify", verify)
		if(verify){

			setUsernameInput(true)
		}
		else{
			toast.error("Please enter a valid email ", ToastOptions);
		}
	}
	const loader = {
		position: "fixed",	
		top: "0",	
		left: "0",	
		right: "0",	
		bottom: "0",	
		background: "rgba(255,255,255,0.4)",
		zIndex: "100",	
		display: "table",	
		width: "100%",	
		height: "100%"	
	  }
	return (
		<PageWrapper
			title={isNewUser ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-warning': !isNewUser, 'bg-info': !!isNewUser })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={200} />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-lo10-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setUsernameInput(false);
													setIsNewUser(!isNewUser);
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setUsernameInput(false);
													setIsNewUser(!isNewUser);
												}}>
												Sign Up
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={isNewUser} />

								<form className='row g-4'>
									{isNewUser ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Your Email'>
													<Input type='email' autoComplete='email'
														onChange={(e) => setUsername(e.target.value)} />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-name'
													isFloating
													label='Your Name'>
													<Input autoComplete='given-name'
														onChange={(e) => setName(e.target.value)} />
												</FormGroup>
											</div>
											{/* <div className='col-12'>
												<FormGroup
													id='signup-surname'
													isFloating
													label='Your DOB'>
													<Input autoComplete='family-name' type='date'
														onChange={(e) => setDob(e.target.value)} />
												</FormGroup>
											</div> */}
											<div className='col-12'>
												<FormGroup
													id='signup-surname'
													isFloating
													label='Your Contact'>
													<Input autoComplete='family-name'
														onChange={(e) => setContact(e.target.value)} />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-password'
													isFloating
													label='Password'>
													<Input
														type='password'
														autoComplete='password'
														onChange={(e) => setPassword(e.target.value)}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={signup}>
													Sign Up
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												{!usernameInput ? (
													<FormGroup
														id='login-username'
														isFloating
														label='Your email or username'>
														<Input
															autoComplete='username'
															onChange={(e) =>
																setUsername(e.target.value)
															}
														/>
													</FormGroup>
												) : (
													<FormGroup
														id='login-password'
														isFloating
														label='Password'>
														<Input
															type='password'
															autoComplete='password'
															onChange={(e) =>
																setPassword(e.target.value)
															}
															value={newPassword}
														/>
													</FormGroup>
												)}
											</div>
											<div className='col-12'>
												{!usernameInput ? (
													<Button
														color='warning'
														className='w-100 py-3'
														// onClick={() => setUsernameInput(true)}
														onClick={emailVerify}
														>
														Continue
													</Button>
												) : (
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={LoginClick}>
														Login
													</Button>
												)}
											</div>
										</>
									)}

									{/* BEGIN :: Social Login */}
									{!usernameInput && (

										<div>
											<div className='col-12 mt-3 text-center text-muted'>
												OR
											</div>
											<div className='col-12 mt-3'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													// icon='CustomApple'
													onClick={handleOnClick}
												>
													Signup as Agent
												</Button>
											</div>
											{/* <div className='col-12'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomGoogle'
												// onClick={handleOnClick}
												>
													Continue with Google
												</Button>
											</div> */}
										</div>

									)}
									{/* END :: Social Login */}
								</form>
								{Isloader  && (

									<div style={loader}>
										<CircularProgress style={{ margin: "22% auto", display: "block" }} />
									</div>

								)}
							</CardBody>
						</Card>

						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': isNewUser,
									'link-dark': !isNewUser,
								})}>
								Privacy policy
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': isNewUser,
									'link-dark': !isNewUser,
								})}>
								Terms of use
							</a>
						</div>
					</div>
					<div><ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          /></div>
				</div>
				<Dialog
					maxWidth="lg"
					open={openData}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						<h3>.</h3>
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<h1>You have created your account successfully</h1>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Thank You
						</Button>
					</DialogActions>
				</Dialog>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
