/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import OffCanvas, { OffCanvasBody, OffCanvasHeader } from '../../../components/bootstrap/OffCanvas';
// import Chat, { ChatGroup, ChatHeader } from '../../../components/Chat';
// import InputGroup from '../../../components/bootstrap/forms/InputGroup';
// import Textarea from '../../../components/bootstrap/forms/Textarea';
// import Button from '../../../components/bootstrap/Button';
import USERS from '../../../common/data/userDummyData';
import Avatar from '../../../components/Avatar';
import { demoPages, extraMenu } from '../../../menu';
// import showNotification from '../../../components/extras/showNotification';
// import CHATS from '../../../common/data/chatDummyData';

const CommonHeaderChat = () => {
	const [state, setState] = useState(false);
	const navigate = useNavigate();
	// const [msgCount, setMsgCount] = useState(0);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		// setMsgCount(1);
	// 		// showNotification(
	// 		// 	<span className='d-flex align-items-center'>
	// 		// 		<Avatar
	// 		// 			srcSet={USERS.CHLOE.srcSet}
	// 		// 			src={USERS.CHLOE.src}
	// 		// 			size={36}
	// 		// 			color={USERS.CHLOE.color}
	// 		// 			className='me-3'
	// 		// 		/>
	// 		// 		<span>{USERS.CHLOE.name} sent a message.</span>
	// 		// 	</span>,
	// 		// 	<div onClick={() => setState(!state)} role='presentation'>
	// 		// 		<p>I think it's really starting to shine.</p>
	// 		// 	</div>,
	// 		// );
	// 	}, 30000);
	// 	return () => {
	// 		clearTimeout(timeout);
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// useEffect(() => {
	// 	setMsgCount(0);
	// }, [state]);
	// const profileNav = () => {
	// 	navigate('student/profile');
	// };

	const username = localStorage.getItem('userName');
	const role = localStorage.getItem('role');

	return (
		<>
			<div
				className='col d-flex align-items-center cursor-pointer'
				onClick={() => navigate(`../${extraMenu.Profile.path}`)}
				role='presentation'>
				<div className='me-3'>
					<div className='text-end'>
						<div className='fw-bold fs-6 mb-0'>{`${username}`}</div>
						<div className='text-muted'>
							<small>{role}</small>
						</div>
					</div>
				</div>
				<div className='position-relative'>
					<Avatar
						srcSet={USERS.CHLOE.srcSet}
						src={USERS.CHLOE.src}
						size={48}
						color={USERS.CHLOE.color}
					/>
					{/* {!!msgCount && (
						<span className='position-absolute top-15 start-85 translate-middle badge rounded-pill bg-danger'>
							{msgCount} <span className='visually-hidden'>unread messages</span>
						</span>
					)} */}
					<span className='position-absolute top-85 start-85 translate-middle badge border border-2 border-light rounded-circle bg-success p-2'>
						<span className='visually-hidden'>Online user</span>
					</span>
				</div>
			</div>
			{/* <OffCanvas
				id='chat'
				isOpen={state}
				setOpen={setState}
				placement='end'
				isModalStyle
				isBackdrop={false}
				isBodyScroll>
				<OffCanvasHeader setOpen={setState} className='fs-5'>
					<ChatHeader to={USERS.CHLOE.name} />
				</OffCanvasHeader>
				<OffCanvasBody>
					<Chat>
						{CHATS.CHLOE_VS_JOHN.map((msg) => (
							<ChatGroup
								key={msg.id}
								messages={msg.messages}
								user={msg.user}
								isReply={msg.isReply}
							/>
						))}
					</Chat>
				</OffCanvasBody>
				<div className='chat-send-message p-3'>
					<InputGroup>
						<Textarea />
						<Button color='info' icon='Send'>
							SEND
						</Button>
					</InputGroup>
				</div>
			</OffCanvas> */}
		</>
	);
};

export default CommonHeaderChat;
