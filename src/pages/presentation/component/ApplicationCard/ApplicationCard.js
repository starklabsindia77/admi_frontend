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
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { Grid, Divider, Paper, Box, Typography, Button } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { CometChat } from '@cometchat-pro/chat';
// chat import
import CHATS from '../../../../common/data/chatDummyData';

import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
} from '../../../../components/bootstrap/OffCanvas';
import Chat, { ChatGroup, ChatHeader } from '../../../../components/Chat';
import InputGroup from '../../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../../components/bootstrap/forms/Textarea';
import USERS from '../../../../common/data/userDummyData';
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
	const navigate = useNavigate();
	const [chatState, setChatState] = useState(false);
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
	const [singleChatMessage, setSingleChatMessageStatus] = useState({});
	const [messageText, setMessageTextStatus] = useState('');
	const [messageList, setMessageListStatus] = useState([]);

	const userUID = localStorage.getItem('email').split('@')[0];
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
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
			body:JSON.stringify({
				stdId:data.StudentID,role:userInfoName.role,agentId:data.AgentId
			})
		};
		

		fetch(`${serverUrl}/auth/roleUser`, options)
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
	const chatFunctions = (data2) => {
		const GUID = data2.ApplicationID;
		// const GUID2 = 'supergroup';
		CometChat.getGroup(GUID).then(
			(group) => {
				console.log('Group details fetched successfully:', group);
				setSingleChatMessageStatus(data2);
				getChatMessage(data2.ApplicationID);
			},
			(error) => {
				if (error.code === 'ERR_GUID_NOT_FOUND') {
					// const UID = localStorage.getItem('email');
					console.log('Email group create karo');
					const groupName = data2.ApplicationID;
					const groupType = CometChat.GROUP_TYPE.PUBLIC;
					const group = new CometChat.Group(GUID, groupName, groupType);
					const username = localStorage.getItem('email');
					const UID2 = username.split('@')[0];
					const members = [
						new CometChat.GroupMember(UID2, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT),
					];
					// if (data2 && data2.agent && data2.agent.email) {
					// 	members.push(
					// 		new CometChat.GroupMember(
					// 			data2.agent.email,
					// 			CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
					// 		),
					// 	);
					// }
					// if (data2 && data2.student && data2.student.email) {
					// 	members.push(
					// 		new CometChat.GroupMember(
					// 			data2.student.email,
					// 			CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
					// 		),
					// 	);
					// }
					// if (data2 && data2.manager && data2.manager.email) {
					// 	members.push(
					// 		new CometChat.GroupMember(
					// 			data2.cro.email,
					// 			CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
					// 		),
					// 	);
					// }
					// if (data2 && data2.cro && data2.cro.email) {
					// 	members.push(
					// 		new CometChat.GroupMember(
					// 			data2.cro.email,
					// 			CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
					// 		),
					// 	);
					// }
					// if (data2 && data2.admin && data2.cro.admin) {
					// 	members.push(
					// 		new CometChat.GroupMember(
					// 			data2.admin.email,
					// 			CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
					// 		),
					// 	);
					// }

					CometChat.createGroupWithMembers(group, members).then(
						(response) => {
							console.log('Group created successfully', response.group.guid);
							setChatState(true);
							setSingleChatMessageStatus(data2);
							getChatMessage(response.group.guid);
						},
						(error2) => {
							console.log('Some error occured while creating group', error2);
						},
					);
				}
				console.log('Group details fetching failed with exception:', error);
			},
		);
	};
	const getChatMessage = async (GID) => {
		const GUID = GID;
		// const GUID = 'supergroup'
		const limit = 30;
		const latestId = await CometChat.getLastDeliveredMessageId();
		console.log('chat guid', GUID);
		console.log('chat latestId', latestId);
		const messagesRequest = new CometChat.MessagesRequestBuilder()
			.setGUID(GUID)
			.setMessageId(latestId)
			.setLimit(limit)
			.build();

		messagesRequest.fetchPrevious().then(
			(messages) => {
				console.log('Message list fetched:', messages);
				messagesRequest.fetchNext().then(
					(messages2) => {
						console.log('Message list fetched Next:', messages2);
						setMessageListStatus(messages2);
						setChatState(true);
					},
					(error2) => {
						console.log('Message fetching Next failed with error:', error2);
					},
				);
			},
			(error) => {
				console.log('Message fetching failed with error:', error);
				if (error.code === 'ERR_GROUP_NOT_JOINED') {
					const password = '';
					const groupType = CometChat.GROUP_TYPE.PUBLIC;
					CometChat.joinGroup(GUID, groupType, password).then(
						(group) => {
							console.log('Group joined successfully:', group);
							getChatMessage(GUID);
							// setChatState(true);
						},
						(newerror) => {
							console.log('Group joining failed with exception:', newerror);
						},
					);
				}
			},
		);
	};
	const sendMessage = () => {
		if (messageText.length > 0) {
			const receiverID = singleChatMessage.ApplicationID;
			const receiverType = CometChat.RECEIVER_TYPE.GROUP;
			console.log('receiverType', receiverType);
			const textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);

			CometChat.sendMessage(textMessage).then(
				(message) => {
					console.log('Message sent successfully:', message);
					setMessageTextStatus('');
					getChatMessage(singleChatMessage.ApplicationID);
				},
				(error) => {
					console.log('Message sending failed with error:', error);
				},
			);
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
							{/* {userData && userData.name ? userData.name : 'Sahil Batra'} */}
							{data && data.studentInfo&&data.studentInfo.name ? data.studentInfo.name : 'NA'}
							<Button
								variant='contained'
								style={{
									backgroundColor: '#f1f2f5',
									marginLeft: '12px',
									color: '#000000',
									height: '20px',
								}}>
								Student ID:{data && data.stdId ? data.stdId : 'NA'}
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
							{data &&data.studentInfo&& data.studentInfo.contact ? data.studentInfo.contact : '9999219809'}
						</Button>
						<Button variant='text' size='medium' startIcon={<EmailIcon />}>
							{/* {userData && userData.email ? userData.email : 'sahil@yopmail.com'} */}
							{data&&data.studentInfo&& data.studentInfo.email ? data.studentInfo.email : 'NA'}
						</Button>
						<Button variant='text' size='medium' startIcon={<CalendarMonthIcon />}>
							{/* {userData && userData.dob ? userData.dob : 'NA'} */}
							{data &&data.studentInfo&& data.studentInfo.dob ? data.studentInfo.dob : 'NA'}
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
						{data&&data.studentInfo&&data.studentInfo.role === 'Student' && data && data.status === 'new' ? (
							<Button
								style={{ width: '180px', height: '50px', mt: '30px' }}
								variant='outlined'
								color='info'
								startIcon={<EditIcon />}>
								Edit Application
							</Button>
						) :data&&data.studentInfo&& data.studentInfo.role === 'admin' ? (
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
							{stages && stages.length > 0 && (
								<HorizontalLabelPositionBelowStepper data={data} stages={stages} />
							)}
						</Stack>
					</Stack>
				</Grid>
				<Grid item xs={11}>
					<Button variant='text' endIcon={<KeyboardArrowDownIcon />}>
						View More{' '}
					</Button>
				</Grid>
				<Grid item xs={1}>
					<Button
						variant='text'
						onClick={() => {
							// setChatState(true);
							chatFunctions(data);
						}}
						startIcon={<ChatBubbleOutlineIcon />}>
						chat{' '}
					</Button>
				</Grid>
			</Grid>
			<OffCanvas
				id='chat'
				isOpen={chatState}
				setOpen={setChatState}
				placement='end'
				isModalStyle
				isBackdrop={false}
				isBodyScroll>
				<OffCanvasHeader setOpen={setChatState} className='fs-5'>
					<ChatHeader to={singleChatMessage.ApplicationID} />
				</OffCanvasHeader>
				<OffCanvasBody>
					<Chat>
						{/* {CHATS.CHLOE_VS_JOHN.map((msg) => (
							<ChatGroup
								key={msg.id}
								messages={msg.messages}
								user={msg.user}
								isReply={msg.isReply}
							/>
						))} */}
						{messageList &&
							messageList.map((msg) => {
								if (msg.type === 'text' && msg.text !== undefined) {
									let value = false;
									if (msg.sender.uid === userUID) {
										value = true;
									}
									return (
										<ChatGroup
											key={msg.id}
											messages={msg.text}
											user={msg.sender}
											time={msg.sentAt}
											isReply={value}
										/>
									);
								}
								return null;
							})}
					</Chat>
				</OffCanvasBody>
				<div className='chat-send-message p-3'>
					<InputGroup>
						<Textarea
							size='sm'
							value={messageText}
							rows={1}
							onChange={(e) => setMessageTextStatus(e.target.value)}
						/>
						{/* <Button color='info' icon='Send'>
							SEND
						</Button> */}
						<Button
							variant='text'
							onClick={sendMessage}
							startIcon={<ChatBubbleOutlineIcon />}>
							SEND{' '}
						</Button>
					</InputGroup>
				</div>
			</OffCanvas>
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
