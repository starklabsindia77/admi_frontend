/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import { Calendar as DatePicker } from 'react-date-range';
import { Grid, Divider, Paper, Box, Typography } from '@mui/material';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Avatar from '../../../components/Avatar';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import CommonFilterTag from '../../common/CommonFilterTag';
import CommonTableRow from '../../common/CommonTableRow';
import Select from '../../../components/bootstrap/forms/Select';
import Popovers from '../../../components/bootstrap/Popovers';
import data from '../../../common/data/dummyProductData';
import { demoPages } from '../../../menu';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';
import useSelectTable from '../../../hooks/useSelectTable';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { serverUrl } from '../../../config';

const Agents = () => {
	/**
	 * For Tour
	 */
	useTourStep(6);
	// // const serverUrl = "https://salty-scrubland-03771.herokuapp.com/api";
	// const serverUrl = "http://localhost:3001/api";

	const [studentList, setStudentList] = useState([]);

	const [username, setUsername] = useState();
	const [guid, setGuid] = useState();
	const [name, setName] = useState();
	const [contact, setContact] = useState();
	const [dob, setDob] = useState();
	const [role, setRole] = useState('Agent');
	const [newPassword, setPassword] = useState();
	const authToken = localStorage.getItem("auth");
	const [deleteProductEvent, setDeleteProductEvent] = useState(false);
	const deleteProduct = (guidinfo) => {
		console.log('guid', guidinfo);
		setGuid('');
		
		getSingleStudent(guidinfo);
		setDeleteProductEvent(!deleteProductEvent);
	};
	const getStudent = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'authorization': authToken
			},
		};

		fetch(`${serverUrl}/auth/userall`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.user.length > 0) {
					console.log('result', d.user)
					const ss = d.user.filter(val => val.role && val.role.toString().toLowerCase().includes("agent"))
					setStudentList(ss)
				}
			});
	}

	const saveStudent = () => {

		const userData = { 'name': name, 'email': username, 'password': newPassword, 'dob': dob, 'contact': contact, 'role': role };
		console.log("data", userData);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				// 'authorization': authToken
			},
			body: JSON.stringify(userData)
		};

		fetch(`${serverUrl}/auth/signup`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
					// alert('error msg', d.error);
				}
				// alert('done', d);
				getStudent();
				setAddProductEvent(false)
			});

	}

	const updateStudent = () => {
		const userData = { 'name': name, 'email': username, 'password': newPassword, 'dob': dob, 'contact': contact, 'role': role };
		console.log("data", userData);
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'authorization': authToken
			},
			body: JSON.stringify(userData)
		};

		fetch(`${serverUrl}/auth/user/${guid}`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				}
				getStudent();
				setAddProductEvent(false)
			});

	}

	const deleteStudent = () => {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/auth/user/${guid}`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				}
				getStudent();
				setDeleteProductEvent(false);
			});
	};
	useEffect(() => {
		getStudent();
	}, []);
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
	const [addProductEvent, setAddProductEvent] = useState(false);
	const handleUpcomingDetails = () => {
		setUpcomingEventsInfoOffcanvas(!upcomingEventsInfoOffcanvas);
	};

	const getSingleStudent = (guidinfo) => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'authorization': authToken
			},
		};

		fetch(`${serverUrl}/auth/user/${guidinfo}`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data single........................', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.success) {

					setGuid(d.result.guid)
					setName(d.result.name);
					setUsername(d.result.email);
					setDob(d.result.dob);
					setContact(d.result.contact);
					// setAddProductEvent(!addProductEvent);
				}
			});
	}

	const editProduct = (guidinfo) => {
		console.log('guid', guidinfo)
		setGuid('')
		setName('');
		setUsername('');
		setDob('');
		setContact('');
		getSingleStudent(guidinfo);
		setAddProductEvent(!addProductEvent);
	}

	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
	const handleUpcomingEdit = () => {
		setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	};
	const handleAddProduct = () => {
		setGuid('')
		setName('');
		setUsername('');
		setDob('');
		setContact('');
		setAddProductEvent(!addProductEvent);
	}
	// END :: Upcoming Events


	const [date, setDate] = useState(new Date());

	const [filterMenu, setFilterMenu] = useState(false);
	const formik = useFormik({
		initialValues: {
			minPrice: '',
			maxPrice: '',
			categoryName: '3D Shapes',
			companyA: true,
			companyB: true,
			companyC: true,
			companyD: true,
		},

		onSubmit: (values) => {
			setFilterMenu(false);
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = data.filter(
		(f) =>
			// Category
			f.category === formik.values.categoryName &&
			// Price
			(formik.values.minPrice === '' || f.price > formik.values.minPrice) &&
			(formik.values.maxPrice === '' || f.price < formik.values.maxPrice) &&
			//	Company
			((formik.values.companyA ? f.store === 'Company A' : false) ||
				(formik.values.companyB ? f.store === 'Company B' : false) ||
				(formik.values.companyC ? f.store === 'Company C' : false) ||
				(formik.values.companyD ? f.store === 'Company D' : false)),
	);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(studentList);
	// const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	// const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	return (
		<PageWrapper title={demoPages.listPages.subMenu.listBoxed.text}>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel iconColor='info'>
							<CardTitle>
								Rows:{' '}
								<small className='ms-2'>
									{/* {selectTable.values.selectedList.length
										? `${selectTable.values.selectedList.length} / `
										: null} */}
									{studentList.length}
								</small>
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Button
								color={darkModeStatus ? 'light' : 'dark'}
								isLight
								icon='Add'
								onClick={handleAddProduct}
							>
								Add New
							</Button>
							
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									{/* <th scope='col' style={{ width: 60 }}>{SelectAllCheck}</th> */}


									<th scope='col'>Name</th>
									<th scope='col'>Email</th>
									{/* <th scope='col'>DOB</th> */}
									<th scope='col'>Contact</th>
									<th scope='col' >
										Actions
									</th>
								</tr>
							</thead>
							<tbody>

								{studentList.length > 0 && dataPagination(items, currentPage, perPage).map((item) => (
									<tr key={item.guid}>
										{/* <td>
											<Checkbox
												id="myCheck"
												checked={item.checked}
											/>
										</td> */}
										<td>{item.name}</td>
										<td>{item.email}</td>
										{/* <td>{item.dob}</td> */}
										<td>{item.contact}</td>
										<td>
											<Button
												isOutline={!darkModeStatus}
												color='dark'
												isLight={darkModeStatus}
												className={classNames('text-nowrap', {
													'border-light': !darkModeStatus,
												})}
												icon='Edit'
												onClick={() => editProduct(item.guid)}
											>
												Edit
											</Button>
											<Button
													isOutline={!darkModeStatus}
													color='dark'
													isLight={darkModeStatus}
													className={classNames('text-nowrap', {
														'border-light': !darkModeStatus,
													})}
													icon='Delete'
													style={{ marginLeft: 10 }}
													onClick={() => deleteProduct(item.guid)}>
														Delete
												</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
					<PaginationButtons
						data={items}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>
				<Modal
					setIsOpen={setAddProductEvent}
					isOpen={addProductEvent}
					titleId='upcomingEdit'
					isCentered
					isScrollable
					size='lg'>
					<ModalHeader setIsOpen={setAddProductEvent}>
						{guid && guid.length > 0 ? (
							<OffCanvasTitle id='upcomingEdit'>Edit Agent</OffCanvasTitle>
						) : (
							<OffCanvasTitle id='upcomingEdit'>Add Agent</OffCanvasTitle>
						)}
						{/* <OffCanvasTitle id='upcomingEdit'>Add Product</OffCanvasTitle> */}
					</ModalHeader>
					<ModalBody>
						<div className='row g-4'>
							<div className='col-6'>
								<FormGroup id='customerName' label='Name' isFloating>
									<Input
										placeholder='Name'
										onChange={(e) => setName(e.target.value)}
										value={name}
										type='text'
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup id='service' label='email' isFloating>
									<Input
										placeholder='email'
										onChange={(e) => setUsername(e.target.value)}
										value={username}
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup id='employee' label='password' isFloating>
									<Input
										placeholder='password'
										onChange={(e) => setPassword(e.target.value)}
										value={newPassword}
										type='password'
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup id='location' label='contact' isFloating>
									<Input
										placeholder='contact'
										onChange={(e) => setContact(e.target.value)}
										value={contact}

									/>
								</FormGroup>
							</div>
							{/* <div className='col-6'>
								<FormGroup id='date' label='DOB' isFloating>
									<Input
										placeholder='DOB'
										onChange={(e) => setDob(e.target.value)}
										value={dob}
										type='date'

									/>
								</FormGroup>
							</div> */}
							{/* <div className='col-6'>
                                <FormGroup id='time' label='UPC' isFloating>
                                    <Input
                                        placeholder='UPC'
                                        onChange={(e) => { setUpc(e.target.value) }}
                                        value={upc}

                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='date' label='Manufacturer' isFloating>
                                    <Input
                                        placeholder='Manufacturer'
                                        onChange={(e) => { setManufacturer(e.target.value) }}
                                        value={manufacturer}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='time' label='Cost Price' isFloating>
                                    <Input
                                        placeholder='Cost Price'
                                        onChange={(e) => { setCostPrice(e.target.value) }}
                                        value={costPrice}

                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='date' label='Dimensions' isFloating>
                                    <Input
                                        placeholder='Dimensions'
                                        onChange={(e) => { setDimensions(e.target.value) }}
                                        value={dimensions}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='time' label='Attributes' isFloating>
                                    <Input
                                        placeholder='Attributes'
                                        onChange={(e) => { setAttributes(e.target.value) }}
                                        value={attributes}

                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='date' label='Listing Price' isFloating>
                                    <Input
                                        placeholder='Listing Price'
                                        onChange={(e) => { setListingPrice(e.target.value) }}
                                        value={listingPrice}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='time' label='Map' isFloating>
                                    <Input
                                        placeholder='Map'
                                        onChange={(e) => { setMap(e.target.value) }}
                                        value={map}

                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='date' label='Msrp' isFloating>
                                    <Input
                                        placeholder='Msrp'
                                        onChange={(e) => { setMsrp(e.target.value) }}
                                        value={msrp}

                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='time' label='Shipping Cost' isFloating>
                                    <Input
                                        placeholder='Shipping Cost'
                                        onChange={(e) => { setShippingCost(e.target.value) }}
                                        value={shippingCost}

                                    />
                                </FormGroup>
                            </div>

                            <div className='col-6'>
                                <FormGroup id='time' label='Product Quantity' isFloating>
                                    <Input
                                        placeholder='Product Quantity'
                                        onChange={(e) => { setProductQuantity(e.target.value) }}
                                        value={productQuantity}

                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                
                                <div className='col-auto'>
                                    <Input
                                        type='file'
                                        autoComplete='photo'
                                    />
                                </div>
                            </div>
                            <div className='col-12'>
                                <Card isCompact className='mb-0'>
                                    <CardHeader>
                                        <CardLabel>
                                            <CardTitle>Product Description</CardTitle>
                                        </CardLabel>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup id='note' label='Description' isFloating>
                                            <Textarea
                                                rows={8}
                                                placeholder='Description'
                                                onChange={(e) => { setProductDescription(e.target.value) }}
                                                value={productDescription}
                                            />
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </div> */}
							{/* <div className='col-12'>
								<Card isCompact className='mb-0'>
									<CardHeader>
										<CardLabel>
											<CardTitle>Notification</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<FormGroup>
											<Checks
												id='notify'
												type='switch'
												label={
													<>
														Notify the Customer
														<Popovers
															trigger='hover'
															desc='Check this checkbox if you want your customer to receive an email about the scheduled appointment'>
															<Icon
																icon='Help'
																size='lg'
																className='ms-1 cursor-help'
															/>
														</Popovers>
													</>
												}
												onChange={formik.handleChange}
												checked={formik.values.notify}
											/>
										</FormGroup>
									</CardBody>
								</Card>
							</div> */}
						</div>
					</ModalBody>
					<ModalFooter className='bg-transparent'>
						{guid && guid.length > 0 ? (
							<Button
								color='info'
								className='w-100'
								onClick={updateStudent}>
								Update
							</Button>
						) : (
							<Button
								color='info'
								className='w-100'
								onClick={saveStudent}>
								Save
							</Button>
						)}

					</ModalFooter>
				</Modal>
				<Modal
					setIsOpen={setDeleteProductEvent}
					isOpen={deleteProductEvent}
					titleId='upcomingEdit'
					isCentered
					isScrollable
					size='lg'>
					<ModalHeader setIsOpen={setDeleteProductEvent}>
						
							<OffCanvasTitle id='upcomingEdit'>Delete Agent</OffCanvasTitle>
						
						{/* <OffCanvasTitle id='upcomingEdit'>Add Product</OffCanvasTitle> */}
					</ModalHeader>
					<ModalBody>
						<Grid container spacing={1} p={2}>
								Are You Sure to Delete the Agent account					
						</Grid>
					</ModalBody>
					<ModalFooter className='bg-transparent'>
					
							<Button color='info' className='w-100' onClick={deleteStudent}>
								Delete
							</Button>
						
					</ModalFooter>
				</Modal>
			</Page>
		</PageWrapper>
	);
};

export default Agents;
