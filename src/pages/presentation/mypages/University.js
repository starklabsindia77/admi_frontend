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
import { EditorState, convertToRaw } from 'draft-js';
import Checkbox from '@material-ui/core/Checkbox';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from "react-draft-wysiwyg";
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
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../../assets/css/editor.css';

const University = () => {
    /**
     * For Tour
     */
    useTourStep(6);
    // const serverUrl = "https://salty-scrubland-03771.herokuapp.com/api";
    const serverUrl = "http://localhost:3001/api";



    const [universityList, setUniversityList] = useState([]);
    const [state, setState] = useState({ editorState: EditorState.createEmpty() });
    const [students, setStudents] = useState({});
    const [username, setUsername] = useState();
    const [guid, setGuid] = useState();
    const [name, setName] = useState();
    const [country, setCountry] = useState();

    const [city, setCity] = useState();
    const [stateName, setStateName] = useState();
    const [description, setDescription] = useState();
    const [shortDescription, setShortDescription] = useState();
    const [universityData, setUniversityData] = useState({});

    const authToken = localStorage.getItem("auth");
    const UserRole = localStorage.getItem("role");
    const AgentId = localStorage.getItem("email")
    const getUniversity = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
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
                    setUniversityList(ss)

                }
            });
    }

    const saveUniversity = () => {
        setDescription(draftToHtml(convertToRaw(state.editorState.getCurrentContent())));
        // setUniversityData({ 'name': name, 'state': stateName, 'city': city, 'country': country, 'short_description': shortDescription, 'description': description });

        const body = { 'name': name, 'state': stateName, 'city': city, 'country': country, 'short_description': shortDescription, 'description': description }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
            body: JSON.stringify(body)
        };

        fetch(`${serverUrl}/university/add`, options)
            .then((response) => response.json())
            .then((d) => {
                console.log('data', d);
                if (d.error) {
                    console.log('error msg', d.error);
                    // alert('error msg', d.error);
                }
                // alert('done', d);
                getUniversity();
                setAddProductEvent(false)
            });

    }

    const updateUniversity = () => {
        setUniversityData({ 'name': "varun" });
        console.log("data", universityData);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
            body: JSON.stringify(universityData)
        };

        fetch(`${serverUrl}/university/${guid}`, options)
            .then((response) => response.json())
            .then((d) => {
                console.log('data', d);
                if (d.error) {
                    console.log('error msg', d.error);
                }
                setAddProductEvent(false)
            });

    }

    const onEditorStateChange = (editorState) => {

        setState({
            editorState,
        });

    };
    useEffect(() => {
        getUniversity();
    }, []);
    const { themeStatus, darkModeStatus } = useDarkMode();
    const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
    const [addProductEvent, setAddProductEvent] = useState(false);
    const handleUpcomingDetails = () => {
        setUpcomingEventsInfoOffcanvas(!upcomingEventsInfoOffcanvas);
    };

    const getSingleUniversity = (guidinfo) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
        };

        fetch(`${serverUrl}/university/${guidinfo}`, options)
            .then((response) => response.json())
            .then((d) => {
                console.log('data single', d);
                if (d.error) {
                    console.log('error msg', d.error);
                } else if (d.success) {
                    // setStudents(d.result[0]);
                    console.log('data single2 ', d);
                    setGuid(d.result.guid)
                    setAddProductEvent(!addProductEvent);
                }
            });
    }

    const editProduct = (guidinfo) => {
        console.log('guid', guidinfo)
        getSingleUniversity(guidinfo);
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
                                    {universityList.length}
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
                                    <th scope='col'>University Name</th>
                                    <th scope='col'>City</th>
                                    <th scope='col'>State</th>
                                    <th scope='col'>Country</th>
                                    <th scope='col' >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {universityList.length > 0 && universityList.map((item) => (
                                    <tr key={item.guid}>

                                        <td>
                                            <Checkbox
                                                id="myCheck"
                                                checked={item.checked}
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.city}</td>
                                        <td>{item.state}</td>
                                        <td>{item.country}</td>
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
                            <OffCanvasTitle id='upcomingEdit'>Edit University</OffCanvasTitle>
                        ) : (
                            <OffCanvasTitle id='upcomingEdit'>Add University</OffCanvasTitle>
                        )}
                        {/* <OffCanvasTitle id='upcomingEdit'>Add Product</OffCanvasTitle> */}
                    </ModalHeader>
                    <ModalBody>
                        <div className='row g-4'>
                            <div className='col-12'>
                                <FormGroup id='customerName' label='University Name' isFloating>
                                    <Input
                                        placeholder='University Name'
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        type='text'
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-4'>
                                <FormGroup id='city' label='city' isFloating>
                                    <Input
                                        placeholder='city'
                                        onChange={(e) => setCity(e.target.value)}
                                        value={city}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-4'>
                                <FormGroup id='state' label='state' isFloating>
                                    <Input
                                        placeholder='state'
                                        onChange={(e) => setStateName(e.target.value)}
                                        value={stateName}

                                    />
                                </FormGroup>
                            </div>
                            <div className='col-4'>
                                <FormGroup id='country' label='country' isFloating>
                                    <Input
                                        placeholder='country'
                                        onChange={(e) => setCountry(e.target.value)}
                                        value={country}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-12'>
                                <FormGroup id='short' label='Short Description' isFloating>
                                    <Textarea
                                        onChange={(e) => setShortDescription(e.target.value)}
                                        value={shortDescription}
                                    />
                                </FormGroup>

                            </div>
                            <div className='col-12'>
                                {/* <FormGroup id='description' label='Description' isFloating> */}

                                <Editor
                                    editorState={state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}

                                />
                                {/* </FormGroup> */}

                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter className='bg-transparent'>
                        {guid && guid.length > 0 ? (
                            <Button
                                color='info'
                                className='w-100'
                            // onClick={updateUniversity}
                            >
                                Update
                            </Button>
                        ) : (
                            <Button
                                color='info'
                                className='w-100'
                                onClick={saveUniversity}
                            >
                                Save
                            </Button>
                        )}

                    </ModalFooter>
                </Modal>
            </Page>
        </PageWrapper>
    );
};

export default University;
