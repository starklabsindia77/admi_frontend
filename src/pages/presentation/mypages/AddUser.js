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
import { useFormik } from 'formik';
import { Calendar as DatePicker } from 'react-date-range';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from "@material-ui/core/ListItemText";
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import itLocale from 'i18n-iso-countries/langs/it.json';
import Chip from '@mui/material/Chip';
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
import NewSelect from '../../../components/bootstrap/forms/NewSelect';
import Option, { Options } from '../../../components/bootstrap/Option';
import Popovers from '../../../components/bootstrap/Popovers';
import data from '../../../common/data/dummyProductData';
import { AdminPages } from '../../../menu';
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


const AddUser = () => {
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);
    const countryObj = countries.getNames("en", { select: "official"});
    const countryArr = Object.entries(countryObj).map(([ key, value]) => {
        return {
            label: value,
            value: key
        }
    })
    const [studentList, setStudentList] = useState([]);

    const [username, setUsername] = useState();
    const [guid, setGuid] = useState();
    const [name, setName] = useState();
    const [contact, setContact] = useState();
    const [dob, setDob] = useState();
    const [role, setRole] = useState({});
    const [newPassword, setPassword] = useState();
    const [ centerName, setCenterName] = useState();
    const [city, setCity] = useState();
    const [inputValue, setInputValue] = useState('');
    const authToken = localStorage.getItem("auth");
    const [roleList, setRoleList] = useState([]);


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
                    console.log('result', d.result);
                    const list = []
                    setRoleList(d.result);
                }
            });
    }

    const saveStudent = () => {

        const userData = { 
            'name': name, 
            'email': username, 
            'password': newPassword, 
            'contact': contact, 
            'centerName': centerName, 
            'centerCity' : city,
            "countries": selected, 
            'role': role 
        };
        // console.log("userdatainput", userData);
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

            });

    }

    const updateStudent = () => {
        const userData = { 
            'name': name, 
            'email': username, 
            'password': newPassword, 
            'contact': contact, 
            'centerName': centerName, 
            'centerCity' : city,
            "countries": selected, 
            'role': role 
        };
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

            });

    }
    useEffect(() => {
        getAllRoles();
    }, []);
    const { themeStatus, darkModeStatus } = useDarkMode();  

    
    const [selected, setSelected] = useState([]);
    const newHandleChange = (event) => {
        console.log('handleChange', event.target.value)
        const {value} = event.target;
        setSelected(value);
      };

    const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
    
    // END :: Upcoming Events

  return (
    <PageWrapper title={AdminPages.user.subMenu.sub.text}>
            <Page>
                <Card stretch data-tour='list'>
                    <CardHeader>
                        <CardLabel iconColor='info'>
                            <CardTitle>
                                {guid && guid.length > 0 ? (
                                    <OffCanvasTitle id='upcomingEdit'>Edit Sub User</OffCanvasTitle>
                                ) : (
                                    <OffCanvasTitle id='upcomingEdit'>Add Sub User</OffCanvasTitle>
                                )}
                            </CardTitle>
                        </CardLabel>
                        <CardActions />                       
                    </CardHeader>
                    <CardBody className='table-responsive' isScrollable>
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
                            <div className='col-6'>
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
                                        className={classNames('rounded-1', {
                                            'bg-white': !darkModeStatus,
                                        })}
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
                                </FormControl>
                            </div>                            
                            <div className='col-6'>                                
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
                            </div>
                            <div className='col-10' />
                            <div className='col-2'>
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
                            </div>
                        </div>
                    </CardBody>                    
                </Card>
            </Page>
        </PageWrapper>
  )
}

export default AddUser