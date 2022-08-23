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
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

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

import CourseCard from "../component/courseCard/CourseCard";

// import data from '../../../common/data/dummyProductData';
import { demoPages, Pages } from '../../../menu';
import PaginationButtons, {
    dataPagination,
    PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';

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

    const location = useLocation();
    // console.log("location", location);

    const [CoursesList, setCoursesList] = useState([]);

    const [guid, setGuid] = useState();


    const authToken = localStorage.getItem("auth");
    const [Isloader, setIsloader] = useState(true);
    const UserRole = localStorage.getItem("role");
    const AgentId = localStorage.getItem("email")
    const getCourses = () => {
        // setIsloader(true);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': authToken
            },
            body: JSON.stringify(location.state),
        };

        fetch(`${serverUrl}/courses/all`, options)
            .then((response) => response.json())
            .then((d) => {
                // console.log('data', d);
                if (d.error) {
                    console.log('error msg', d.error);
                } else if (d.result.length > 0) {
                    const ss = d.result;
                    // console.log('result', ss);
                    setCoursesList(ss)
                    setIsloader(false);

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
    const loader = {
		position: "fixed",	
		top: "0",	
		left: "0",	
		right: "0",	
		bottom: "0",	
		background: "rgba(255,255,255,0.4)",
		zIndex: "100",	
		display: "table",	
		width: "100%",	
		height: "100%"	
	  }
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
                // console.log('data', d);
                if (d.error) {
                    console.log('error msg', d.error);
                } else if (d.result.length > 0) {
                    const ss = d.result[0];
                    // console.log('result', ss);
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

    const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);
	const { items, requestSort, getClassNamesFor } = useSortableData(CoursesList);

    

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
                    {/* {Isloader  && (
                        <div style={loader}>
                            <CircularProgress style={{ margin: "22% auto", display: "block" }} />
                        </div>
                    )} */}
                    <CardBody className='table-responsive' isScrollable >
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
            </Page>
        </PageWrapper>
    );
};

export default Programs;
