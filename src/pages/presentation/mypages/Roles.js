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

const Roles = () => {
    /**
     * For Tour
     */
    useTourStep(6);
    const [studentList, setStudentList] = useState([]);

    const [username, setUsername] = useState();
    const [guid, setGuid] = useState();
    const [name, setName] = useState();
    const [contact, setContact] = useState();
    const [dob, setDob] = useState();
    const [role, setRole] = useState('admin');
    const [newPassword, setPassword] = useState();
    const authToken = localStorage.getItem("auth");
    const getStudent = () => {
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
                console.log('data', d);
                if (d.error) {
                    console.log('error msg', d.error);
                } else if (d.result.length > 0) {
                    console.log('result', d.result);
                    setStudentList(d.result)
                }
            });
    }

    const saveStudent = () => {

        const userData = { 'name': name };
        console.log("data", userData);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
            body: JSON.stringify(userData)
        };

        fetch(`${serverUrl}/role`, options)
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

    const updateStudent = () => {
        const userData = { 'name': name };
        console.log("data", userData);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
            body: JSON.stringify(userData)
        };

        fetch(`${serverUrl}/role/${guid}`, options)
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

        fetch(`${serverUrl}/role/${guidinfo}`, options)
            .then((response) => response.json())
            .then((d) => {
                console.log('data single', d);
                if (d.error) {
                    console.log('error msg', d.error);
                } else if (d.result.length > 0) {
                    setGuid(d.result[0].guid)
                    setName(d.result[0].name);
                    // setUsername(d.result[0].email);
                    // setDob(d.result[0].dob);
                    // setContact(d.result[0].contact);
                    setAddProductEvent(!addProductEvent);
                }
            });
    }

    const editProduct = (guidinfo) => {
        console.log('guid', guidinfo)
        getSingleStudent(guidinfo);
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
                                    <th scope='col' style={{ width: 60 }}>{SelectAllCheck}</th>
                                    <th scope='col'>Role Name</th>
                                    <th scope='col' >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {studentList.length > 0 && studentList.map((item) => (
                                    <tr key={item.guid}>
                                        <td>
                                            <Checkbox
                                                id="myCheck"
                                                checked={item.checked}
                                            />
                                        </td>
                                        <td>{item.name}</td>
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
                        {guid && guid.length > 0 ? (
                            <OffCanvasTitle id='upcomingEdit'>Edit Role</OffCanvasTitle>
                        ) : (
                            <OffCanvasTitle id='upcomingEdit'>Add Role</OffCanvasTitle>
                        )}

                    </ModalHeader>
                    <ModalBody>
                        <div className='row g-4'>
                            <div className='col-12'>
                                <FormGroup id='customerName' label='Name' isFloating>
                                    <Input
                                        placeholder='Name'
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        type='text'
                                    />
                                </FormGroup>
                            </div>
                            {/* <div className='col-6'>
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
                                <FormGroup id='date' label='DOB' isFloating>
                                    <Input
                                        placeholder='DOB'
                                        onChange={(e) => setDob(e.target.value)}
                                        value={dob}
                                        type='date'

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
                                onClick={saveStudent}>
                                Save
                            </Button>
                        )}

                    </ModalFooter>
                </Modal>
            </Page>
        </PageWrapper>
    );
};

export default Roles;
