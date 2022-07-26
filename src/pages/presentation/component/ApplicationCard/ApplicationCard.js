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
import Stack from '@mui/material/Stack';
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
// import Button from '../../../../components/bootstrap/Button';
import { serverUrl } from '../../../../config';

import HorizontalLabelPositionBelowStepper from './appstepper';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ApplicationCard({ data, wishData }) {
	const navigate = useNavigate();

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
				<Grid item xs={6}>
					<div style={{ marginBottom: '-5px' }}>
						<h5>
							Sahil Batra
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
								Application ID: 47479
							</Button>
							<IconButton size='medium'>
								<TextSnippetIcon fontSize='medium' />
							</IconButton>
						</h5>
					</div>
					<Stack direction='row'>
						<Button variant='text' size='medium' startIcon={<LocalPhoneIcon />}>
							9999219809
						</Button>
						<Button variant='text' size='medium' startIcon={<EmailIcon />}>
							sahil@yopmail.com
						</Button>
						<Button variant='text' size='medium' startIcon={<CalendarMonthIcon />}>
							20-Mar-1992
						</Button>
					</Stack>
					<div style={{ marginBottom: '-5px' }}>
						<p>
							Indu Sharma (Study Advisor)
							<small className='ms-2'>+1 Study Advisor</small>
						</p>
					</div>
				</Grid>
				<Grid item xs={5}>
					<Stack direction='row' justifyContent='flex-end' p={1}>
						<Button
							style={{ width: '180px', height: '50px', mt: '30px' }}
							variant='outlined'
							color='info'
							startIcon={<EditIcon />}>
							Edit Application
						</Button>
					</Stack>
				</Grid>
			</Grid>
			<Divider />
			<Grid container spacing={2} p={1}>
				<Grid item xs={6}>
					<h6>Academies Australasia Polytechnic, Australia</h6>
					<p>Intake: Jan 2023</p>
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
							Started & Submitted for options
						</Button>
					</Stack>
				</Grid>
			</Grid>
			<Grid container spacing={2} p={1}>
				<Grid item xs={12}>
					<Stack direction='row'>
						<Stack gap={6}>
							<Typography>est. date</Typography>
							<Typography mt='8px'>actual date</Typography>
						</Stack>
						<Stack>
							<Stack direction='row' gap={6} ml='38px'>
								{date.map((dat) => (
									<Typography variant='h6'>{dat.date1}</Typography>
								))}
							</Stack>

							<HorizontalLabelPositionBelowStepper />
                            <Stack direction='row' gap={6} ml='38px' mt='8px'>
								{date.map((dat) => (
									<Typography variant='h6'>{dat.date1}</Typography>
								))}
							</Stack>
							
						</Stack>
					</Stack>
					<Button variant='text' endIcon={<KeyboardArrowDownIcon />}>
						View More{' '}
					</Button>
				</Grid>
			</Grid>
		</div>
	);   
}
export default ApplicationCard;
