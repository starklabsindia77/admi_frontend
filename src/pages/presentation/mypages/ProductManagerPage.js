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
import classNames from 'classnames';
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

const ProductManagerPage = () => {
	/**
	 * For Tour
	 */
	useTourStep(6);
	const serverUrl = "https://salty-scrubland-03771.herokuapp.com//api";
	// const serverUrl = "http://localhost:3001/api";
	const [newGuid, setNewGuid] = useState();
	const [productName, setProductName] = useState("");
	const [isbn, setIsbn] = useState("");
	const [skuid, setSkuid] = useState("");
	const [hsn, setHsn] = useState("");
	const [upc, setUpc] = useState("");
	const [ean, setEan] = useState("");
	const [manufacturer, setManufacturer] = useState("");
	const [dimensions, setDimensions] = useState("");
	const [attributes, setAttributes] = useState("");
	const [costPrice, setCostPrice] = useState("");
	const [listingPrice, setListingPrice] = useState("");
	const [map, setMap] = useState("");
	const [msrp, setMsrp] = useState("");
	const [shippingCost, setShippingCost] = useState("");
	const [productQuantity, setProductQuantity] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [newproducts, setNewProducts] = useState({
		"guid": newGuid,
		"product_name": productName,
		"isbn": isbn,
		"skuid": skuid,
		"hsn": hsn,
		"ean": ean,
		"upc": upc,
		"manufacturer": manufacturer,
		"dimensions": dimensions,
		"attributes": attributes,
		"cost_price": costPrice,
		"listing_price": listingPrice,
		"map": map,
		"msrp": msrp,
		"Shipping_cost": shippingCost,
		"product_quantity": productQuantity,
		"product_description": productDescription
	});
	const [products, setProducts] = useState({});
	const authToken = localStorage.getItem("auth");
	const getProduct = () => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'authorization': authToken
			},
		};

		fetch(`${serverUrl}/products`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					setProducts(d.result)
				} else {
					setProducts({
						"guid": " ",
						"product_name": " ",
						"isbn": " ",
						"skuid": " ",
						"hsn": " ",
						"ean": " ",
						"upc": " ",
						"manufacturer": " ",
						"dimensions": " ",
						"attributes": " ",
						"cost_price": " ",
						"listing_price": " ",
						"map": " ",
						"msrp": " ",
						"Shipping_cost": " ",
						"product_quantity": " ",
						"product_description": ""
					})
				}
			});
	}

	const saveProduct = () => {
		const data = {
			"product_name": productName,
			"isbn": isbn,
			"skuid": skuid,
			"hsn": hsn,
			"ean": ean,
			"upc": upc,
			"manufacturer": manufacturer,
			"dimensions": dimensions,
			"attributes": attributes,
			"cost_price": costPrice,
			"listing_price": listingPrice,
			"map": map,
			"msrp": msrp,
			"Shipping_cost": shippingCost,
			"product_quantity": productQuantity,
			"product_description": productDescription
		}
		console.log("Saving product", data);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'authorization': authToken
			},
			body: JSON.stringify(data)
		};

		fetch(`${serverUrl}/product_manager`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
					// alert('error msg', d.error);
				}
				// alert('done', d);
				setAddProductEvent(false)
			});

	}

	const updateProduct = () => {
		const data = {
			"product_name": productName,
			"isbn": isbn,
			"skuid": skuid,
			"hsn": hsn,
			"ean": ean,
			"upc": upc,
			"manufacturer": manufacturer,
			"dimensions": dimensions,
			"attributes": attributes,
			"cost_price": costPrice,
			"listing_price": listingPrice,
			"map": map,
			"msrp": msrp,
			"Shipping_cost": shippingCost,
			"product_quantity": productQuantity,
			"product_description": productDescription
		}
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'authorization': authToken
			},
			body: JSON.stringify(data)
		};

		fetch(`${serverUrl}/products/${newGuid}`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				}
				setAddProductEvent(false)
			});

	}
	useEffect(() => {
		getProduct();
	}, []);
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
	const [addProductEvent, setAddProductEvent] = useState(false);
	const handleUpcomingDetails = () => {
		setUpcomingEventsInfoOffcanvas(!upcomingEventsInfoOffcanvas);
	};

	const getSingleProduct = (guid) => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'authorization': authToken
			},
		};

		fetch(`${serverUrl}/products/${guid}`, options)
			.then((response) => response.json())
			.then((d) => {
				console.log('data single', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					setNewGuid(d.result[0].guid)
					setProductName(d.result[0].guid)
					setIsbn(d.result[0].isbn)
					setSkuid(d.result[0].skuid)
					setHsn(d.result[0].hsn)
					setUpc(d.result[0].upc)
					setEan(d.result[0].ean)
					setManufacturer(d.result[0].manufacturer)
					setDimensions(d.result[0].dimensions)
					setAttributes(d.result[0].attributes)
					setCostPrice(d.result[0].cost_price)
					setListingPrice(d.result[0].listing_price)
					setMap(d.result[0].map)
					setMsrp(d.result[0].msrp)
					setShippingCost(d.result[0].Shipping_cost)
					setProductQuantity(d.result[0].product_quantity)
					setProductDescription(d.result[0].product_description)
					setAddProductEvent(true);
				}
			});
	}

	const editProduct = (guid) => {
		console.log('guid', guid)
		getSingleProduct(guid);
	}

	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
	const handleUpcomingEdit = () => {
		setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	};
	const handleAddProduct = () => {
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

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);

	return (
		<PageWrapper title={demoPages.listPages.subMenu.listBoxed.text}>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel iconColor='info'>
							<CardTitle>
								Rows:{' '}
								<small className='ms-2'>
									{selectTable.values.selectedList.length
										? `${selectTable.values.selectedList.length} / `
										: null}
									{products.length}
								</small>
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Dropdown isButtonGroup>
								<Popovers
									desc={
										<DatePicker
											onChange={(item) => setDate(item)}
											date={date}
											color={process.env.REACT_APP_PRIMARY_COLOR}
										/>
									}
									placement='bottom-end'
									className='mw-100'
									trigger='click'>
									<Button color='success' isLight icon='WaterfallChart'>
										{moment(date).format('MMM Do')}
									</Button>
								</Popovers>
								<DropdownToggle>
									<Button color='success' isLight />
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd>
									<DropdownItem>
										<span>Last Hour</span>
									</DropdownItem>
									<DropdownItem>
										<span>Last Day</span>
									</DropdownItem>
									<DropdownItem>
										<span>Last Week</span>
									</DropdownItem>
									<DropdownItem>
										<span>Last Month</span>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Button
								color='info'
								icon='CloudDownload'
								isLight
								tag='a'
								to='/somefile.txt'
								target='_blank'
								download>
								Export
							</Button>
							<Button
								color={darkModeStatus ? 'light' : 'dark'}
								isLight
								icon='Add'
								onClick={handleAddProduct}
							>
								Add New
							</Button>
							{/* <Dropdown className='d-inline'>
								<DropdownToggle hasIcon={false}>
									<Button color={themeStatus} icon='MoreHoriz' />
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd>
									<DropdownItem>
										<Button icon='Edit'>Edit</Button>
									</DropdownItem>
									<DropdownItem>
										<Button icon='Delete'>Delete</Button>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown> */}
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col' style={{ width: 60 }}>{SelectAllCheck}</th>
									{/* <th
										scope='col'
										onClick={() => requestSort('id')}
										className='cursor-pointer text-decoration-underline'>
										#{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('id')}
											icon='FilterList'
										/>
									</th> */}
									<th scope='col'>SKUID</th>
									<th scope='col'>Name</th>
									<th scope='col'>Manufacturer</th>
									<th
										scope='col'
										onClick={() => requestSort('stock')}
										className='cursor-pointer text-decoration-underline'>
										Stock{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('stock')}
											icon='FilterList'
										/>
									</th>
									<th
										scope='col'
										onClick={() => requestSort('price')}
										className='cursor-pointer text-decoration-underline'>
										Price{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('price')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'>Shipping Cost</th>
									<th scope='col' >
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{/* {onCurrentPageItems.map((i) => (
									<CommonTableRow
										key={i.id}
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...i}
										selectName='selectedList'
										selectOnChange={selectTable.handleChange}
										selectChecked={selectTable.values.selectedList.includes(
											i.id.toString(),
										)}
									/>
								))} */}
								{products.length > 0 && products.map((item) => (
									<tr key={item.guid}>
										<td>
											<Button
												isLight
												color={item.statusColor}
												icon='Info'

											/>
										</td>
										<td>
											{item.skuid}
										</td>
										<td>
											<div>
												<div>{item.name}</div>
												<div className='small text-muted'>
													{item.isbn}
												</div>
											</div>
										</td>
										<td>{item.manufacturer}</td>
										<td>{item.product_quantity}</td>
										<td>{item.cost_price}</td>
										<td>{item.Shipping_cost}</td>
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
						{newGuid ? (
							<OffCanvasTitle id='upcomingEdit'>Edit Product</OffCanvasTitle>
						) : (
							<OffCanvasTitle id='upcomingEdit'>Add Product</OffCanvasTitle>
						)}
						{/* <OffCanvasTitle id='upcomingEdit'>Add Product</OffCanvasTitle> */}
					</ModalHeader>
					<ModalBody>
						<div className='row g-4'>
							<div className='col-6'>
								<FormGroup id='customerName' label='Product Name' isFloating>
									<Input
										placeholder='Product Name'
										onChange={(e) => {
											// console.log("product Name", e.target.value);
											setProductName(e.target.value);
										}}
										value={productName}
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup id='service' label='ISBN' isFloating>
									<Input
										placeholder='ISBN'
										onChange={(e) => { setIsbn(e.target.value) }}
										value={isbn}
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup id='employee' label='SKUID' isFloating>
									<Input
										placeholder='SKUID'
										onChange={(e) => { setSkuid(e.target.value) }}
										value={skuid}
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup id='location' label='HSN' isFloating>
									<Input
										placeholder='HSN'
										onChange={(e) => { setHsn(e.target.value) }}
										value={hsn}
									/>
								</FormGroup>
							</div>
							<div className='col-6'>
								<FormGroup id='date' label='EAN' isFloating>
									<Input
										placeholder='EAN'
										onChange={(e) => { setEan(e.target.value) }}
										value={ean}

									/>
								</FormGroup>
							</div>
							<div className='col-6'>
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
								{/* <FormGroup id='time' label='Shipping Cost' isFloating>
									<Input
										placeholder='Shipping Cost'
										onChange={formik.handleChange}
										value={formik.values.time}

									/>
								</FormGroup> */}
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
							</div>
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
						{newGuid ? (
							<Button
								color='info'
								className='w-100'
								onClick={updateProduct}>
								Update
							</Button>
						) : (
							<Button
								color='info'
								className='w-100'
								onClick={saveProduct}>
								Save
							</Button>
						)}
						{/* <Button
							color='info'
							className='w-100'
							onClick={saveProduct}>
							Save
						</Button> */}
					</ModalFooter>
				</Modal>
			</Page>
		</PageWrapper>
	);
};

export default ProductManagerPage;
