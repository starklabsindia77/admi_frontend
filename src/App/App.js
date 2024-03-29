import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { ThemeProvider } from 'react-jss';
import { ReactNotifications } from 'react-notifications-component';
import { useFullscreen } from 'react-use';
import { Route, Routes } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { CometChat } from '@cometchat-pro/chat';
import { TourProvider } from '@reactour/tour';
import ThemeContext from '../contexts/themeContext';

import Aside from '../layout/Aside/Aside';
import Wrapper from '../layout/Wrapper/Wrapper';
import Portal from '../layout/Portal/Portal';
import { demoPages, layoutMenu } from '../menu';
import { Toast, ToastContainer } from '../components/bootstrap/Toasts';
import useDarkMode from '../hooks/useDarkMode';
import COLORS from '../common/data/enumColors';
import { getOS } from '../helpers/helpers';
import steps, { styles } from '../steps';
import { COMETAPP_ID, COMETAPP_REGION } from '../config';

const App = () => {
	getOS();

	/**
	 * Dark Mode
	 */
	const { themeStatus, darkModeStatus } = useDarkMode();
	const comchatint = () => {
		const appID = COMETAPP_ID;
		const region = COMETAPP_REGION;
		const appSetting = new CometChat.AppSettingsBuilder()
			.subscribePresenceForAllUsers()
			.setRegion(region)
			.autoEstablishSocketConnection(true)
			.build();
		CometChat.init(appID, appSetting).then(
			() => {
				console.log('Initialization completed successfully');
			},
			(error) => {
				console.log('Initialization failed with error:', error);
			},
		);
	};

	const theme = {
		theme: themeStatus,
		primary: COLORS.PRIMARY.code,
		secondary: COLORS.SECONDARY.code,
		success: COLORS.SUCCESS.code,
		info: COLORS.INFO.code,
		warning: COLORS.WARNING.code,
		danger: COLORS.DANGER.code,
		dark: COLORS.DARK.code,
		light: COLORS.LIGHT.code,
	};

	useEffect(() => {
		comchatint()
		if (darkModeStatus) {
			document.documentElement.setAttribute('theme', 'dark');
		}
		return () => {
			document.documentElement.removeAttribute('theme');
		};
	}, [darkModeStatus]);

	/**
	 * Full Screen
	 */
	const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
	const ref = useRef(null);
	useFullscreen(ref, fullScreenStatus, {
		onClose: () => setFullScreenStatus(false),
	});

	/**
	 * Modern Design
	 */
	useLayoutEffect(() => {
		if (process.env.REACT_APP_MODERN_DESGIN === 'true') {
			document.body.classList.add('modern-design');
		} else {
			document.body.classList.remove('modern-design');
		}
	});

	//	Add paths to the array that you don't want to be "Aside".
	const withOutAsidePages = [demoPages.login.path, demoPages.signUp.path, layoutMenu.blank.path];

	return (
		<ThemeProvider theme={theme}>
			<ToastProvider components={{ ToastContainer, Toast }}>
				<TourProvider
					steps={steps}
					styles={styles}
					showNavigation={false}
					showBadge={false}>
					<div
						ref={ref}
						className='app'
						style={{
							backgroundColor: fullScreenStatus && 'var(--bs-body-bg)',
							zIndex: fullScreenStatus && 1,
							overflow: fullScreenStatus && 'scroll',
						}}>
						<Routes>
							{withOutAsidePages.map((path) => (
								<Route key={path} path={path} />
							))}
							<Route path='*' element={<Aside />} />
						</Routes>
						<Wrapper />
					</div>
					<Portal id='portal-notification'>
						<ReactNotifications />
					</Portal>
				</TourProvider>
			</ToastProvider>
		</ThemeProvider>
	);
};

export default App;
