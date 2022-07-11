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
import CourseCard from "../component/courseCard/CourseCard";

import data from '../../../common/data/dummyProductData';
import { demoPages, Pages } from '../../../menu';
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
import { serverUrl } from '../../../config';

const Programs = () => {
    /**
     * For Tour
     */
    useTourStep(6);
    // // const serverUrl = "https://salty-scrubland-03771.herokuapp.com/api";
    // const serverUrl = "http://localhost:3001/api";



    const [CoursesList, setCoursesList] = useState([]);

    const [guid, setGuid] = useState();


    const authToken = localStorage.getItem("auth");
    const UserRole = localStorage.getItem("role");
    const AgentId = localStorage.getItem("email")
    const getCourses = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
        };

        fetch(`${serverUrl}/courses/all`, options)
            .then((response) => response.json())
            .then((d) => {
                console.log('data', d);
                if (d.error) {
                    console.log('error msg', d.error);
                } else if (d.result.length > 0) {
                    const ss = d.result;
                    console.log('result', ss);
                    setCoursesList(ss)

                }
            });
    }


    useEffect(() => {
        getCourses();
        getWishlist();
    }, []);
    const { themeStatus, darkModeStatus } = useDarkMode();
    const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
    const [addProductEvent, setAddProductEvent] = useState(false);
    const [wishData, setWishData] = useState([]);
    const handleUpcomingDetails = () => {
        setUpcomingEventsInfoOffcanvas(!upcomingEventsInfoOffcanvas);
    };
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






    const reloadFun = () => {
        window.location.reload();
    };

    console.log('wish result', wishData);

    return (
        <PageWrapper title={Pages.Programs.text}>
            <Page>
                <Card stretch data-tour='list' style={{ backgroundColor: "#f1f2f5" }}>
                    <CardHeader style={{ backgroundColor: "#f1f2f5" }}>
                        <CardLabel iconColor='info'>
                            <CardTitle>
                                <h3>Programs</h3>
                            </CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody className='table-responsive' isScrollable >

                        {CoursesList.length > 0 && CoursesList.map((item) => (
                            <CourseCard data={item} wishData={wishData} />
                        ))}
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default Programs;
