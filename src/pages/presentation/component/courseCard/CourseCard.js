/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import { Stack } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './CourseCard.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Typography, Button } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Icon from '../../../../components/icon/Icon';
import { serverUrl } from '../../../../config';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function CourseCard({ data, wishData }) {
	console.log('Course Data', data);
	// const username = localStorage.getItem('userName');
	// const role = localStorage.getItem('role');
	// const serverUrl = "https://salty-scrubland-03771.herokuapp.com/api";
	// const serverUrl = 'http://localhost:3001/api';
	const [wishListData, setWishListData] = useState(wishData);

	const authToken = localStorage.getItem('auth');

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
			<Stack direction='row' p={4}>
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4LGmHTec_Ol4RKKuavhMlTpDg259wVY6syA&usqp=CAU'
					alt='rishav'
				/>
				<Stack>
					<Stack>
						<Typography variant='h4'>{data.name}</Typography>
						<Stack direction='row'>
							<Button variant='text' size='large' startIcon={<BusinessIcon />}>
								{data.university[0].name}
							</Button>
							<Button
								variant='text'
								size='large'
								style={{ marginLeft: 10 }}
								stratIcon={<LocationOnIcon />}>
								{data.university[0].country}
							</Button>

							<Checkbox
								{...label}
								icon={<FavoriteBorder />}
								checkedIcon={<Favorite />}
								onClick={wishlist}
							/>
							<Checkbox
								{...label}
								icon={<BookmarkBorderIcon />}
								checkedIcon={<BookmarkIcon />}
							/>
							<Button variant='outlined'>Apply Now</Button>
						</Stack>
					</Stack>
					<Stack direction='row' justifyContent='space-around'>
						<Stack>
							<Typography>TUITION FEE </Typography>
							<Typography>≈ $ 15000 AUD</Typography>
						</Stack>
						<Stack>
							<Typography>TUITION FEE </Typography>
							<Typography>≈ $ 15000 AUD</Typography>
						</Stack>
						<Stack>
							<Typography>TUITION FEE </Typography>
							<Typography>≈ $ 15000 AUD</Typography>
						</Stack>
						<Stack>
							<Typography>TUITION FEE </Typography>
							<Typography>≈ $ 15000 AUD</Typography>
						</Stack>
						<Stack>
							<Typography>TUITION FEE </Typography>
							<Typography>≈ $ 15000 AUD</Typography>
						</Stack>
						<Stack>
							<Typography>TUITION FEE </Typography>
							<Typography>≈ $ 15000 AUD</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</div>
	);
}

export default CourseCard;
