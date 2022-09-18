/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
// import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import Card, { CardBody, CardTitle } from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';

import data, { CATEGORIES } from '../knowledge/helper/dummyKnowledgeData';
import { demoPages } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import { serverUrl } from '../../../config';

// eslint-disable-next-line react/prop-types
const Item = ({ id, image, title, description, tags, color }) => {
	useTourStep(15);
	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const handleOnClick = useCallback(
		() => navigate(`../${demoPages.knowledge.subMenu.itemID.path}/${id}`),
		[navigate, id],
	);
	return (
		<Card
			className='cursor-pointer shadow-3d-primary shadow-3d-hover'
			onClick={handleOnClick}
			data-tour={title}>
			<CardBody>
				<div
					className={classNames(
						'ratio ratio-1x1',
						'rounded-2',
						`bg-l${darkModeStatus ? 'o25' : '10'}-${color}`,
						'mb-3',
					)}>
					<img
						src={image}
						alt=''
						width='100%'
						height='auto'
						className='object-fit-contain p-3'
					/>
				</div>
				<CardTitle>{title}</CardTitle>
				<p className='text-muted truncate-line-2'>{description}</p>
				<div className='row g-2'>
					{!!tags &&
						// eslint-disable-next-line react/prop-types
						tags.map((tag) => (
							<div key={tag.text} className='col-auto'>
								<Badge isLight color={tag.color} className='px-3 py-2'>
									{tag.text}
								</Badge>
							</div>
						))}
				</div>
			</CardBody>
		</Card>
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
const ProgramSearch = () => {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const [studyAreaList, setStudyAreaList] = useState([]);
	const [countryList, setCountryList] = useState([]);
	const [country, setCountry] = useState("");
	const [studyArea, setStudyArea] = useState("");
	const [filterableData, setFilterableData] = useState(data);
	const authToken = localStorage.getItem('auth');
	const getCourses = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/courses`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
					const list = [];
					_.each(ss, (dat) => {
						list.push(dat.studyArea);
					});
					// console.log('result', list);
					const uniqueList = [...new Set(list)];
					const UL = [];
					_.each(uniqueList, (dat) => {
						UL.push({ value: dat, text: dat });
					});
					setStudyAreaList(UL);
					// console.log('unique', UL);
				}
			});
	};

	const getCountry = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/university`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
					const list = [];
					_.each(ss, (dat) => {
						list.push(dat.country);
					});
					// console.log('result', list);
					const uniqueList = [...new Set(list)];
					const UL = [];
					_.each(uniqueList, (dat) => {
						UL.push({ value: dat, text: dat });
					});
					setCountryList(UL);
					// console.log('unique', UL);
				}
			});
	};

	const searchAndFilterData = (searchValue, category) => {
		let tempData = data;

		if (category)
			tempData = data.filter((item) =>
				item.categories.find((categ) => categ.value === category),
			);

		return tempData.filter((item) => {
			return (
				item.title.toLowerCase().includes(searchValue) ||
				item.description.toLowerCase().includes(searchValue) ||
				item.content.toLowerCase().includes(searchValue) ||
				item.categories.find((categ) => categ.text.toLowerCase().includes(searchValue)) ||
				item.tags.find((tag) => tag.text.toLowerCase().includes(searchValue))
			);
		});
	};
	const programs = () => {
		if(!country.length>0)
		{
			toast.error("Please select country ", ToastOptions);	

		}
		else if(!studyArea.length>0)
		{
			toast.error("Please select studyArea ", ToastOptions);	

			
		}
		else
		{

			navigate('/programs', { state: { country, studyArea } });
		}
	};

	const debounce = (func, wait) => {
		let timeout;

		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	};

	const onFormSubmit = (values) => {
		const searchValue = values.search.toString().toLowerCase();
		const newData = searchAndFilterData(searchValue, values.category);

		if (!values.search && !values.category) {
			setFilterableData(data);
		} else {
			setFilterableData(newData);
		}
	};

	const formik = useFormik({
		initialValues: {
			search: '',
			category: '',
		},
		onSubmit: onFormSubmit,
		onReset: () => setFilterableData(data),
	});

	useEffect(() => {
		getCourses();
		getCountry();
	}, []);

	return (
		<PageWrapper title={demoPages.knowledge.subMenu.grid.text}>
			<Page>
				<div className='row'>
					<div className='col-12 text-center my-5'>
						<span className='display-3 fw-bold'>Program Finder</span>
					</div>
					<div className='col-12 text-center'>
						<span className='display-7 fw-bold'>
							Search 100,000+ from programs in 1100+ institutions from 32+ countries
							worldwide
						</span>
					</div>
					<div
						className='col-xxl-10 mx-auto text-center my-5'
						data-tour='knowledge-filter'>
						<form
							className={classNames('row', 'pb-4 px-3 mx-0 g-4', 'rounded-3', [
								`bg-l${darkModeStatus ? 'o25' : '10'}-primary`,
							])}
							onSubmit={formik.handleSubmit}>
							<div className='col-md-5'>
								<Select
									id='study'
									size='lg'
									ariaLabel='Study'
									placeholder='What do you want to Study'
									list={studyAreaList}
									className={classNames('rounded-1', {
										'bg-white': !darkModeStatus,
									})}
									onChange={(e) => {
										setStudyArea(e.target.value);
									}}
									// onChange={(e) => {
									// 	formik.handleChange(e);

									// 	if (e.target.value)
									// 		debounce(
									// 			() =>
									// 				onFormSubmit({
									// 					...formik.values,
									// 					category: e.target.value,
									// 				}),
									// 			1000,
									// 		)();
									// }}
									value={studyArea}
								/>
							</div>
							<div className='col-md-5'>
								<Select
									id='category'
									size='lg'
									ariaLabel='Category'
									placeholder='Where do you want to go'
									list={countryList}
									className={classNames('rounded-1', {
										'bg-white': !darkModeStatus,
									})}
									onChange={(e) => {
										setCountry(e.target.value);
									}}
									value={country}
								/>
							</div>
							{/* <div className='col-md-5'>
								<Input
									id='search'
									size='lg'
									placeholder='Where do you want to go'
									className={classNames('rounded-1', {
										'bg-white': !darkModeStatus,
									})}
									onChange={(e) => {
										formik.handleChange(e);

										if (e.target.value.length > 2)
											debounce(
												() =>
													onFormSubmit({
														...formik.values,
														search: e.target.value,
													}),
												1000,
											)();

										if (e.target.value.length === 0) formik.resetForm();
									}}
									value={formik.values.search}
								/>
							</div> */}
							<div className='col-md-2'>
								<Button
									size='lg'
									icon='Search'
									color='primary'
									className='w-100'
									rounded={1}
									onClick={programs}
								/>
							</div>
						</form>
					</div>
				</div>
				<div className='row mb-5'>
					{filterableData.map((item) => (
						<div key={item.id} className='col-xl-3 col-lg-4 col-md-6'>
							{/* eslint-disable-next-line react/jsx-props-no-spreading */}
							<Item {...item} />
						</div>
					))}
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
			</Page>
		</PageWrapper>
	);
};

export default ProgramSearch;
