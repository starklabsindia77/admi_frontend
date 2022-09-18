/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from "@material-ui/core/ListItemText";
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import itLocale from 'i18n-iso-countries/langs/it.json';
import Chip from '@mui/material/Chip';
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

import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';

// import Select from '../../../components/bootstrap/forms/Select';
import data from '../../../common/data/dummyProductData';
import { AdminPages, extraMenu } from '../../../menu';
import PaginationButtons, {
    dataPagination,
    PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import useSelectTable from '../../../hooks/useSelectTable';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import {
    OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import { serverUrl } from '../../../config';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Centers = () => {
    /**
     * For Tour
     */
    useTourStep(6);
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);
    const navigate = useNavigate();
    const countryObj = countries.getNames("en", { select: "official"});
    const countryArr = Object.entries(countryObj).map(([ key, value]) => {
        return {
            label: value,
            value: key
        }
    })
    const [centerList, setCenterList] = useState([]);

    const [username, setUsername] = useState();
    const [guid, setGuid] = useState();
    const [name, setName] = useState();
    const [contact, setContact] = useState();
    const [dob, setDob] = useState();
    const [role, setRole] = useState();
    const [newPassword, setPassword] = useState();
    const [centerData,setCenterData]=useState({
        centerName:'',
        pinCode:'',
        city:'',
        state:''
    })   
    const authToken = localStorage.getItem("auth");
    const [roleList, setRoleList] = useState([]);
    const getStudent = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
        };

        fetch(`${serverUrl}/auth/allCenter`, options)
            .then((response) => response.json())
            .then((d) => {
                console.log("centerlist",d)
                    setCenterList(d.results)

                // if (d.error) {
                //     console.log('error msg', d.error);
                // } else if (d.user.length > 0) {
                //     const ss = d.user.filter(val => val.role && val.role.toString().toLowerCase() !== 'agent' && val.role.toString().toLowerCase() !== 'student')
                //     setStudentList(ss)
                // }
            });
    }
const handleChange=(e)=>{
    // const name=e.target.name
    // const value=e.target.value
    setCenterData((values)=>({...values,[e.target.name]:e.target.value}))
}
console.log("centerData:;",centerData)
    const getAllRoles = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
        };

        fetch(`${serverUrl}/role`, options)
            .then((response) => response.json())
            .then((d) => {
                if (d.error) {
                    console.log('error msg', d.error);
                } else if (d.result.length > 0) {
                    setRoleList(d.result);
                }
            });
    }

    const saveCenter = () => {

        const payload = { 
            centerName: centerData.centerName, 
            pinCode: centerData.pinCode, 
            city: centerData.city, 
            state: centerData.state, 
            
        };
        // console.log("userdatainput", userData);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                // 'authorization': authToken
            },
            body: JSON.stringify(payload)
        };

        fetch(`${serverUrl}/auth/createCenter`, options)
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
        const userData = { 'name': name, 'email': username, 'password': newPassword, 'contact': contact, 'role': role };
        console.log("updatedata", userData);
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
    useEffect(() => {
        getStudent();
        getAllRoles();
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
                console.log('data single', d);
                if (d.error) {
                    console.log('error msg', d.error);
                } else if (d.result.length > 0) {

                    setGuid(d.result[0].guid)
                    setName(d.result[0].name);
                    setUsername(d.result[0].email);
                    setDob(d.result[0].dob);
                    setContact(d.result[0].contact);
                    setAddProductEvent(!addProductEvent);
                }
            });
    }

    const editProduct = (guidinfo) => {
        // console.log('guid', guidinfo)
        // getSingleStudent(guidinfo);
        setCenterData(guidinfo)
        setAddProductEvent(true)
    }
    const [selected, setSelected] = useState([]);
    const newHandleChange = (event) => {
        console.log('handleChange', event.target.value)
        const {value} = event.target;
        setSelected(value);
      };
    const deleteUser = (guidinfo) => {
        console.log('guid', guidinfo)
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
        };

        fetch(`${serverUrl}/auth/user/${guidinfo}`, options)
            .then((response) => response.json())
            .then((d) => {
                console.log('data', d);
                if (d.error) {
                    console.log('error msg', d.error);
                }
                getStudent();
            });
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
        <PageWrapper title={AdminPages.user.subMenu.sub.text}>
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
                                    {centerList&&centerList.length}
                                </small>
                            </CardTitle>
                        </CardLabel>
                        <CardActions>
                            <Button
                                color={darkModeStatus ? 'light' : 'dark'}
                                isLight
                                icon='Add'
                                // onClick={() => navigate(`../${extraMenu.AddUser.path}`)}
                                onClick={()=>setAddProductEvent(true)}
                            >
                                Add New
                            </Button>
                        </CardActions>
                    </CardHeader>
                    <CardBody className='table-responsive' isScrollable>
                        <table className='table table-modern table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col' style={{ width: 60 }}>{SelectAllCheck}</th>
                                    <th scope='col'>Center Name</th>
                                    <th scope='col'>Pin Code</th>
                                    <th scope='col'>City</th>
                                    <th scope='col'>State</th>
                                    <th scope='col' >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {centerList&&centerList.length > 0 && centerList.map((item) => (
                                    <tr key={item.guid}>
                                        <td>
                                            <Checkbox
                                                id="myCheck"
                                                checked={item.checked}
                                            />
                                        </td>
                                        <td>{item.centerName}</td>
                                        <td>{item.pinCode}</td>
                                        <td>{item.city}</td>
                                        <td>{item.state}</td>
                                        <td>
                                            <Button
                                                isOutline={!darkModeStatus}
                                                color='dark'
                                                isLight={darkModeStatus}
                                                className={classNames('text-nowrap', {
                                                    'border-light': !darkModeStatus,
                                                })}
                                                icon='Edit'
                                                onClick={() => editProduct(item)}
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
                                                style={{ marginLeft: 10 }}
                                                icon='Delete'
                                                onClick={() => deleteUser(item.guid)}
                                            >
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
                            <OffCanvasTitle id='upcomingEdit'>Edit Center User</OffCanvasTitle>
                        ) : (
                            <OffCanvasTitle id='upcomingEdit'>Add Center User</OffCanvasTitle>
                        )}

                    </ModalHeader>
                    <ModalBody>
                        <div className='row g-4'>
                            <div className='col-6'>
                                <FormGroup id='customerName' label='Center Name' isFloating>
                                    <Input
                                        placeholder='centerName'
                                        name="centerName"
                                        onChange={handleChange}
                                        value={centerData.centerName}
                                        type='text'
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='service' label='City' isFloating>
                                    <Input
                                        placeholder='city'
                                        name="city"
                                        onChange={handleChange}
                                        value={centerData.city}
                                        type='text'
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='employee' label='State' isFloating>
                                    <Input
                                       placeholder='state'
                                       name="state"
                                       onChange={handleChange}
                                       value={centerData.state}
                                       type='text'
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='location' label='Pin Code' isFloating>
                                    <Input
                                        placeholder='pinCode'
                                        name="pinCode"
                                        onChange={handleChange}
                                        value={centerData.pinCode.replace(/[^0-9.]/g, '')}
                                        type='text'
                                        maxLength={6}
                                        

                                    />
                                </FormGroup>
                            </div>
                            {/* <div className='col-6'>
                                <FormGroup id='employee' label='Center Name' isFloating>
                                    <Input
                                        placeholder='Center Name'
                                        onChange={(e) => setCenterName(e.target.value)}
                                        value={centerName}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='employee' label='Center City' isFloating>
                                    <Input
                                        placeholder='Center City'
                                        onChange={(e) => setCity(e.target.value)}
                                        value={city}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormControl fullWidth>
                                    <InputLabel id="mutiple-select-label">Select Country</InputLabel>
                                    <Select
                                        labelId="mutiple-select-label"
                                        multiple
                                        value={selected}
                                        onChange={newHandleChange}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((option) => (
                                                    <Chip key={option.value} label={option.label} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        >                    
                                        {!!countryArr.length && countryArr.map((option) => (
                                            <MenuItem key={option.value} value={option} >
                                                <ListItemText primary={option.label} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl> */}
                                {/* <FormGroup id='location' label='Assign Country' isFloating>
                                    <Input
                                        placeholder='Assign Country'
                                        onChange={(e) => setContact(e.target.value)}
                                        value={contact}

                                    />
                                </FormGroup> */}
                            {/* </div>                             */}
                            {/* <div className='col-6'>
                                <FormGroup id='role' isFloating>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={roleList.map((option) => option.name)}
                                        value={role}
                                        onChange={(event, newValue) => {
                                            setRole(newValue);
                                        }}
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue(newInputValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Role" />}
                                    />
                                </FormGroup>
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
                                onClick={saveCenter}>
                                Save
                            </Button>
                        )}

                    </ModalFooter>
                </Modal>
            </Page>
        </PageWrapper>
    );
};

export default Centers;
