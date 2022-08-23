/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable vars-on-top */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Papa from 'papaparse';
import { useFormik } from 'formik';
import { Calendar as DatePicker } from 'react-date-range';
import classNames from 'classnames';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Checkbox from '@material-ui/core/Checkbox';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from "react-draft-wysiwyg";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
// import Button from "@material-ui/core/Button";

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
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../../assets/css/editor.css';
import CourseCard from "../component/courseCard/CourseCard";
import { serverUrl } from '../../../config';

const Courses = () => {
    /**
     * For Tour
     */
    useTourStep(6);
    // // const serverUrl = "https://salty-scrubland-03771.herokuapp.com/api";
    // const serverUrl = "http://localhost:3001/api";

    

    const [CoursesList, setCoursesList] = useState([]);
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
    const [CoursesData, setCoursesData] = useState({});
    const [uploadedData, setUploadedData] = useState([]);
    const [uploadedData2, setUploadedData2] = useState([]);
    const [openData, setOpenData] = useState(false);
    const [wishData, setWishData] = useState([]);

    const authToken = localStorage.getItem("auth");
    const UserRole = localStorage.getItem("role");
    const AgentId = localStorage.getItem("email");
    const getWishlist = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: authToken,
            },
        };
        fetch(`${serverUrl}/wishlist`, options)
            .then((response) => response.json())
            .then((d) => {
                console.log('data', d);
                if (d.error) {
                    console.log('error msg', d.error);
                } else if (d.result.length > 0) {
                    const ss = d.result[0];
                    console.log('result', ss);
                    setWishData(ss.wishlist);
                }
            });
    };
    const getCourses = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
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
                    console.log('result', ss);
                    setCoursesList(ss)

                }
            });
    }

    const saveCourses = () => {
        setDescription(draftToHtml(convertToRaw(state.editorState.getCurrentContent())));
        const body = { 'name': name, 'state': stateName, 'city': city, 'country': country, 'short_description': shortDescription, 'description': description }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
            body: JSON.stringify(body)
        };

        fetch(`${serverUrl}/Courses/add`, options)
            .then((response) => response.json())
            .then((d) => {
                console.log('data', d);
                if (d.error) {
                    console.log('error msg', d.error);
                    // alert('error msg', d.error);
                }
                // alert('done', d);
                getCourses();
                setAddProductEvent(false)
            });

    }

    const updateCourses = () => {
        setCoursesData({ 'name': "varun" });
        console.log("data", CoursesData);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
            body: JSON.stringify(CoursesData)
        };

        fetch(`${serverUrl}/Courses/${guid}`, options)
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
        getCourses();
        getWishlist();
    }, []);
    const { themeStatus, darkModeStatus } = useDarkMode();
    const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
    const [addProductEvent, setAddProductEvent] = useState(false);
    const handleUpcomingDetails = () => {
        setUpcomingEventsInfoOffcanvas(!upcomingEventsInfoOffcanvas);
    };

    const getSingleCourses = (guidinfo) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
        };

        fetch(`${serverUrl}/Courses/${guidinfo}`, options)
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
        getSingleCourses(guidinfo);
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
    // const formik = useFormik({
    //     initialValues: {
    //         minPrice: '',
    //         maxPrice: '',
    //         categoryName: '3D Shapes',
    //         companyA: true,
    //         companyB: true,
    //         companyC: true,
    //         companyD: true,
    //     },

    //     onSubmit: (values) => {
    //         setFilterMenu(false);
    //         // alert(JSON.stringify(values, null, 2));
    //     },
    // });

    // const filteredData = data.filter(
    //     (f) =>
    //         // Category
    //         f.category === formik.values.categoryName &&
    //         // Price
    //         (formik.values.minPrice === '' || f.price > formik.values.minPrice) &&
    //         (formik.values.maxPrice === '' || f.price < formik.values.maxPrice) &&
    //         //	Company
    //         ((formik.values.companyA ? f.store === 'Company A' : false) ||
    //             (formik.values.companyB ? f.store === 'Company B' : false) ||
    //             (formik.values.companyC ? f.store === 'Company C' : false) ||
    //             (formik.values.companyD ? f.store === 'Company D' : false)),
    // );

    const [countUpdated, setCountUpdated] = useState(0);
    const [countValid, setCountValid] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [totalCount1, setTotalCount] = useState(0);
    // import csv code 

    const handleClose = () => {
        setOpenData(false);
    };

    const importCSV = (event) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            // you can use this method to get file and perform respective operations
            const files = Array.from(input.files);
            console.log("files", files[0]);
            // console.log("event.target.files[0]", event.target.files[0])
            Papa.parse(files[0], {
                complete: updateData,
                header: true
            });
        };
        input.click();
    };

    const reloadFun = () => {
        window.location.reload();
    };

    const updateData = (result) => {
        const { data } = result;
        const finalData = [];
        console.log("result data ::", data);

        data.map((dat) => {
            finalData.push({
                "Course name": dat.Course,
                "Application Fees": dat["Application Fees"],
                "Study Level": dat["Study Level"],
                "University": dat["Name of University/college"],
            })
        })

        setUploadedData(finalData);
        setUploadedData2(data);
        setOpenData(true);

    }

    const updateUploadedData = async (appArr) => {
        if (window.confirm("Only Validated Document will be processed...")) {
            if (uploadedData2.length > 0) {
                setTotalCount(uploadedData2.length);
                setCountUpdated(1)
                setRefresh(!refresh)
            }
            // let count = 0;
            // for (const i = 0; i < totalCount1; i++){
            //     const options = {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json;charset=utf-8',
            //             'authorization': authToken
            //         },
            //         body: JSON.stringify(uploadedData2[i])
            //     };

            //     fetch(`${serverUrl}/Courses/csv`, options)
            //         .then((response) => response.json())
            //         .then((d) => {
            //             console.log('data', d);
            //             if (d.error) {
            //                 console.log('error msg', d.error);
            //             } else if (d.result == 'Done') {
            //                 // const ss = d.result;
            //                 // setCoursesList(ss)
            //                 count = count + 1;
            //                 i++
            //                 if (count == totalCount1) {
            //                     setCountValid(true)
            //                 }
            //                 setCountUpdated(count);
            //                 setRefresh(!refresh)

            //             }
            //         });
            // }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'authorization': authToken
                },
                body: JSON.stringify(uploadedData2)
            };

            fetch(`${serverUrl}/Courses/csv`, options)
                .then((response) => response.json())
                .then((d) => {
                    console.log('data', d);
                    if (d.error) {
                        console.log('error msg', d.error);
                    } else if (d.result === 'Done') {
                        // const ss = d.result;
                        // setCoursesList(ss)
                        // count = count + 1;
                        // i++
                        // if (count == totalCount1) {
                        //     setCountValid(true)
                        // }
                        // setCountUpdated(count);
                        setRefresh(!refresh)
                        reloadFun();

                    }
                });

        } else {
            console.log("cancelled")
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const { items, requestSort, getClassNamesFor } = useSortableData(CoursesList);
    // console.log("pagination working test", items, "t1", requestSort,"t3", getClassNamesFor)
    return (
        <PageWrapper title={AdminPages.CoursesManager.subMenu.courses.text}>
            <Page>
                <Card stretch data-tour='list'>
                    <CardHeader>
                        <CardLabel iconColor='info'>
                            <CardTitle>
                                <h3>Courses:{' '}
                                    <small className='ms-2'>
                                        {CoursesList.length}
                                    </small>
                                </h3>
                            </CardTitle>
                        </CardLabel>
                        <CardActions>
                            <Button
                                color={darkModeStatus ? 'light' : 'dark'}
                                isLight
                                icon='Add'
                                onClick={(event) => importCSV(event)}
                            >
                                Import CSV
                            </Button>

                        </CardActions>
                    </CardHeader>
                    <CardBody className='table-responsive' isScrollable>
                        {CoursesList.length > 0 && dataPagination(items, currentPage, perPage).map((item) => (
                            <CourseCard data={item} wishData={wishData} />
                        ))}
                        <PaginationButtons
                            data={items}
                            label='items'
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                        />
                    </CardBody>

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
                            <OffCanvasTitle id='upcomingEdit'>Edit Courses</OffCanvasTitle>
                        ) : (
                            <OffCanvasTitle id='upcomingEdit'>Add Courses</OffCanvasTitle>
                        )}
                        {/* <OffCanvasTitle id='upcomingEdit'>Add Product</OffCanvasTitle> */}
                    </ModalHeader>
                    <ModalBody>
                        <div className='row g-4'>
                            <div className='col-12'>
                                <FormGroup id='customerName' label='Courses Name' isFloating>
                                    <Input
                                        placeholder='Courses Name'
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
                            // onClick={updateCourses}
                            >
                                Update
                            </Button>
                        ) : (
                            <Button
                                color='info'
                                className='w-100'
                                onClick={saveCourses}
                            >
                                Save
                            </Button>
                        )}

                    </ModalFooter>
                </Modal>

                <Dialog
                    maxWidth="lg"
                    open={openData}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {countUpdated === 0 && !countValid ?
                            <>
                                Check the data uploaded...
                            </> : countUpdated === totalCount1 && countValid ?
                                <>
                                    All records have been updated. Please click reload button to refresh the screen.
                                </> :
                                <>
                                    Please wait while your record {countUpdated} of {totalCount1} is being is processed
                                </>
                        }
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <TableContainer>
                                <Table aria-label="customized table" size="large">
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: '#ebedef' }}>
                                            {uploadedData.length > 0 && Object.keys(uploadedData[0]).map((key) => (
                                                <TableCell style={{ border: "1px solid black" }} align="center"><b>{key}</b></TableCell >
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {uploadedData.length > 0 && uploadedData.map((data, idx) =>
                                            <TableRow >
                                                {Object.keys(data).map((key) => (
                                                    <TableCell style={{ border: "1px solid black" }} align="center"><b style={{ color: (data && data[key] && data[key].toString().includes("Error")) ? "red" : "#000" }}>{data[key]}</b></TableCell >
                                                ))}
                                            </TableRow>
                                        )}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {countUpdated === 0 && !countValid ?
                            <>
                                <Button onClick={() => updateUploadedData()} color="primary">
                                    Update
                                </Button>
                                <Button onClick={handleClose} color="danger" autoFocus>
                                    Close
                                </Button>
                            </>
                            : countUpdated === totalCount1 && countValid ? <Button onClick={reloadFun} color="primary">
                                Reload
                            </Button> : <Button color="primary">
                                please wait...
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </Page>
        </PageWrapper>
    );
};

export default Courses;
