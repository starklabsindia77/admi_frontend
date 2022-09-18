import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { CometChat } from '@cometchat-pro/chat';
import USERS from '../../common/data/userDummyData';
import { demoPages, extraMenu } from '../../menu';
import { DropdownItem, DropdownMenu } from '../../components/bootstrap/Dropdown';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle';

const User = () => {
	const navigate = useNavigate();
	const handleItem = useNavigationItemHandle();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
	const UserRole = localStorage.getItem('role');

	const [collapseStatus, setCollapseStatus] = useState(false);
	const link = () => {
		if (UserRole === 'Student') {
			navigate(`../${extraMenu.Profile.path}`);
		} else {
			navigate(
				`../${demoPages.appointment.subMenu.employeeID.path}/${USERS.JOHN.id}`,
				handleItem(),
			);
		}
	};

	const { t } = useTranslation(['translation', 'menu']);
	const username = localStorage.getItem('userName');
	const role = localStorage.getItem('role');
	const userLogout = () => {
		CometChat.logout().then(
			() => {
				console.log('Logout completed successfully');
				localStorage.clear();
				navigate(`../${demoPages.login.path}`)
				window.location.reload();
			},
			(error) => {
				console.log('Logout failed with exception:', { error });
				localStorage.clear();
				navigate(`../${demoPages.login.path}`)
				window.location.reload();
			},
		);
	};

	return (
		<>
			<div
				className={classNames('user', { open: collapseStatus })}
				role='presentation'
				onClick={() => setCollapseStatus(!collapseStatus)}>
				{/* <div className='user-avatar'>
					<img
						srcSet={USERS.JOHN.srcSet}
						src={USERS.JOHN.src}
						alt='Avatar'
						width={128}
						height={128}
					/>
				</div> */}
				<div className='user-info'>
					<div className='user-name d-flex align-items-center'>
						{`${username}`}
						<Icon icon='Verified' className='ms-1' color='info' />
					</div>
					<div className='user-sub-title'>{role}</div>
				</div>
			</div>
			<DropdownMenu>
				<DropdownItem>
					<Button icon='AccountBox' onClick={() => link()}>
						Profile
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
						onClick={() => setDarkModeStatus(!darkModeStatus)}
						aria-label='Toggle fullscreen'>
						{darkModeStatus ? 'Dark Mode' : 'Light Mode'}
					</Button>
				</DropdownItem>
			</DropdownMenu>

			<Collapse isOpen={collapseStatus} className='user-menu'>
				<nav aria-label='aside-bottom-user-menu'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => link()}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='AccountBox' className='navigation-icon' />
									<span className='navigation-text'>{t('menu:Profile')}</span>
								</span>
							</span>
						</div>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								setDarkModeStatus(!darkModeStatus);
								handleItem();
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon
										icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
										color={darkModeStatus ? 'info' : 'warning'}
										className='navigation-icon'
									/>
									<span className='navigation-text'>
										{darkModeStatus ? t('menu:DarkMode') : t('menu:LightMode')}
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
				<NavigationLine />
				<nav aria-label='aside-bottom-user-menu-2'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => userLogout()}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='Logout' className='navigation-icon' />
									<span className='navigation-text'>{t('menu:Logout')}</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
			</Collapse>
		</>
	);
};

export default User;
