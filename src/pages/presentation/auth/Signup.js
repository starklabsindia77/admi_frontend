/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { createPdfFromHtml } from "./Logic";
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import { serverUrl } from '../../../config';

// eslint-disable-next-line react/prop-types
const LoginHeader = ({ isNewUser }) => {
    if (isNewUser) {
        return (
            <>
                <div className='text-center h2 fw-bold mt-5'>Create Account As Agent,</div>
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
const Signup = ({ isSignUp }) => {
    const { darkModeStatus } = useDarkMode();

    const [usernameInput, setUsernameInput] = useState(false);
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
    const [isNewUser, setIsNewUser] = useState(isSignUp);
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [contact, setContact] = useState();
    const [image, setImage] = useState();
    const [role, setRole] = useState('Agent');
    const [newPassword, setPassword] = useState("");
    const [openData, setOpenData] = useState(false);
    const [newUser, setNewUser] = useState({});
    const [Isloader, setIsloader] = useState(false);
    // // const serverUrl = "https://salty-scrubland-03771.herokuapp.com/api";
    // const serverUrl = "http://localhost:3001/api";
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/'), [navigate]);
    const signupClick = () => {
        // setOpenData(true);
        // createPdfFromHtml("<h1>Hello World</h1>");
        if(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(username)){
    
        const userData = { 'name': name, 'email': username, 'password': newPassword, 'contact': contact, 'role': role };
        console.log("data", userData);
        setIsloader(true);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            mode: "cors",
            body: JSON.stringify(userData),
        };

        fetch(`${serverUrl}/auth/signup`, options)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                if (data.message !== 'Successfully created a new Agent') {
                    console.log('error msg', data.message);
                } else {
                    setOpenData(true);
                    localStorage.setItem('auth', data.token);
                    localStorage.setItem('userName', name);
                    localStorage.setItem('role', role);
                    localStorage.setItem('email', username);
                    setTimeout(() => {
                        setIsloader(false);
                        navigate('dashboard');
                    }, 1000);
                }
            }).catch(()=>{
                setIsloader(false);
            })
        }
        else{
            toast.error("Please enter a valid email ", ToastOptions);
        }
    }

    const LoginClick = () => {
        console.log('username', username, newPassword);
        setIsloader(true);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            mode: "cors",
            body: JSON.stringify({ email: username, password: newPassword }),
        };

        fetch(`${serverUrl}/auth/login`, options)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                if (data.message) {

                    console.log('error msg', data.message);
                } else {
                    localStorage.setItem('auth', data.token);
                    localStorage.setItem('userName', data.user.name);
                    localStorage.setItem('userInfo', JSON.stringify(data.user));
                    localStorage.setItem('role', data.user.role);
                    localStorage.setItem('email', username);
                    navigate('dashboard');
                    setIsloader(false);
                }
            });
    };
    // console.log("status", status);

    const handleClose = () => {
        setOpenData(false);
    };
    const emailVerify=()=>{
        if(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(username)){
    
            setUsernameInput(true)
        }
        else{
            toast.error("Please enter a valid email ", ToastOptions);
        }
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
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt=''
                                                        width={128}
                                                        height={128}
                                                        className='mx-auto d-block img-fluid mb-3'
                                                    />
                                                ) : (
                                                    <PlaceholderImage
                                                        width={128}
                                                        height={128}
                                                        className='mx-auto d-block img-fluid mb-3 rounded'
                                                    />
                                                )}
                                            </div> */}

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
                                                <div className='row g-4'>
                                                    <div className='col-12'>
                                                        <Input type='file' autoComplete='photo' />
                                                    </div>
                                                    {/* <div className='col-12'>
                                                        <Button
                                                            color='dark'
                                                            isLight
                                                            icon='Delete'
                                                            className='w-100'
                                                        
                                                        >
                                                            Delete Image
                                                        </Button>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <Button
                                                    color='info'
                                                    className='w-100 py-3'
                                                    onClick={signupClick}>
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
                                                      	onClick={emailVerify}>
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
                                        <>
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
                                                    onClick={handleOnClick}>
                                                    Student Login
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
													onClick={handleOnClick}>
													Continue with Google
												</Button>
											</div> */}
                                        </>
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
                            <h1>You have created your Agent account successfully</h1>
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
Signup.propTypes = {
    isSignUp: PropTypes.bool,
};
Signup.defaultProps = {
    isSignUp: false,
};

export default Signup;
