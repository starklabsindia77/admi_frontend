/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import { Stack } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import BusinessIcon from '@mui/icons-material/Business';
import Stack from '@mui/material/Stack';
import PinDropIcon from '@mui/icons-material/PinDrop';
import './CourseCard.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Typography, Button } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Icon from '../../../../components/icon/Icon';
import { serverUrl } from '../../../../config';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function CourseCard({ data, wishData }) {
	console.log('Course Data', data, wishData);
	const navigate = useNavigate();
	// const username = localStorage.getItem('userName');
	// const role = localStorage.getItem('role');
	// const serverUrl = "https://salty-scrubland-03771.herokuapp.com/api";
	// const serverUrl = 'http://localhost:3001/api';
	const [wishListData, setWishListData] = useState(wishData);

	const authToken = localStorage.getItem('auth');
	const apply = () => {
		navigate('ApplicationsForm');
	}
	const saveWishlist = (newData) => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
			body: JSON.stringify(newData),
		};
		fetch(`${serverUrl}/wishlist`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
					console.log('result', ss);
					// setWishListData(ss.wishlist);
					// reloadFun();
				}
			});
	};

	const reloadFun = () => {
		window.location.reload();
	};

	const dataList = wishListData;
	const wishlist = () => {
		const value = dataList.filter((item) => item.courseId === data.guid);
		if (value.length > 0) {
			const left = dataList.filter((item) => item.courseId !== data.guid);
			console.log('left value', left);
			setWishListData(left);
			saveWishlist(left);
		} else {
			dataList.push({
				courseId: data.guid,
				CourseName: data.name,
				checked: true,
			});
			setWishListData(dataList);
			saveWishlist(dataList);
		}
	};
	return (
		<div className='post'>
			<Stack direction='row' justifyContent='space-between' p={2}>
				<Typography variant='h6' p={2} style={{ width: '180px', height: '150px' }} mt={4}>
					{data.name}
				</Typography>
				<Stack minWidth='1000px' p={1}>
					<Stack direction='row' justifyContent='space-between' p={1}>
						<Stack>
							{data.img ? (
								<img src='' alt='' />
							) : (
								<Typography variant='h5'>{data.name}</Typography>
							)}
							<Stack direction='row'>
								<Button variant='text' size='large' startIcon={<BusinessIcon />}>
									{data.university[0].name}
								</Button>
								<Button variant='text' size='large' startIcon={<PinDropIcon />}>
									{data.university[0].country}
								</Button>
							</Stack>
						</Stack>
						<Stack direction='row' justifyContent='flex-end'>
							<Checkbox
								{...label}
								icon={<FavoriteBorder />}
								checkedIcon={<Favorite />}
								onClick={wishlist}
								size='large'
							/>
							<IconButton size='large'>
								<TextSnippetIcon fontSize='large' />
							</IconButton>
							<Button
								style={{ width: '150px', height: '50px', mt: '30px' }}
								variant='contained'
								color='info'
								onClick={apply}
							>
								Apply Now
							</Button>
						</Stack>
					</Stack>
					<Stack
						direction='row'
						justifyContent='space-around'
						p={2}
						style={{ backgroundColor: '#F1F2F5', borderRadius: '10px' }}>
						<Stack style={{ bgColor: 'D6D6D6' }}>
							<Typography ml={2} color='#6b7280'>
								TUITION FEE{' '}
							</Typography>
							<Typography variant='h6' fontWeight='600'>
								≈ $ 15000 AUD
							</Typography>
						</Stack>
						<Stack>
							<Typography ml={2} color='#6b7280'>
								TUITION FEE{' '}
							</Typography>
							<Typography variant='h6' fontWeight='600'>
								≈ $ 15000 AUD
							</Typography>
						</Stack>
						<Stack>
							<Typography ml={2} color='#6b7280'>
								TUITION FEE{' '}
							</Typography>
							<Typography variant='h6' fontWeight='600'>
								≈ $ 15000 AUD
							</Typography>
						</Stack>
						<Stack>
							<Typography ml={2} color='#6b7280'>
								TUITION FEE{' '}
							</Typography>
							<Typography variant='h6' fontWeight='600'>
								≈ $ 15000 AUD
							</Typography>
						</Stack>
						<Stack>
							<Typography ml={2} color='#6b7280'>
								TUITION FEE{' '}
							</Typography>
							<Typography variant='h6' fontWeight='600'>
								≈ $ 15000 AUD
							</Typography>
						</Stack>
						<Stack>
							<Typography ml={2} color='#6b7280'>
								TUITION FEE{' '}
							</Typography>
							<Typography variant='h6' fontWeight='600'>
								≈ $ 15000 AUD
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</div>
	);
}

export default CourseCard;
