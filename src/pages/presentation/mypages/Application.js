
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { serverUrl } from '../../../config';
import ApplicationCard from '../component/ApplicationCard/ApplicationCard';

const Application = () => {
    /**
     * For Tour
     */
    useTourStep(6);

    const navigate = useNavigate();


    const authToken = localStorage.getItem("auth");
    const [applicationList, setApplicationList] = useState([]);




    const { themeStatus, darkModeStatus } = useDarkMode();
    const [upcomingEventsInfoOffcanvas, setUpcomingEventsInfoOffcanvas] = useState(false);
    const [addProductEvent, setAddProductEvent] = useState(false);
    const handleUpcomingDetails = () => {
        setUpcomingEventsInfoOffcanvas(!upcomingEventsInfoOffcanvas);
    };



    const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);
    const handleUpcomingEdit = () => {
        setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
    };
    const handleAddProduct = () => {
        setAddProductEvent(!addProductEvent);
    }
    // END :: Upcoming Events

    const apply = () => {
        navigate('/Programs/ApplicationsForm');
    };

    const userInfoName = JSON.parse(localStorage.getItem('userInfo'));
    const getApplication = () => {
        const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
		};

		fetch(`${serverUrl}/application/${userInfoName.guid}`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
                    setApplicationList(ss)
				}
			});
    }

    const getAllApplication = () => {
        const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: authToken,
			},
            body:JSON.stringify({role:userInfoName.role,id:userInfoName._id})
		};

		fetch(`${serverUrl}/application`, options)
			.then((response) => response.json())
			.then((d) => {
				// console.log('data', d);
				if (d.error) {
					console.log('error msg', d.error);
				} else if (d.result.length > 0) {
					const ss = d.result;
                    setApplicationList(ss)
				}
			});
    }

    useEffect(() => {
        if(userInfoName.role === 'Student'){
            getAllApplication();
        }else if (userInfoName.role === 'admin'){
            getAllApplication();
        }else if (userInfoName.role === 'Agent'){
            getAllApplication();
        }
        
    }, [])





    return (
        <PageWrapper title={demoPages.listPages.subMenu.listBoxed.text}>
            <Page>
                <Card stretch data-tour='list' style={{ backgroundColor: "#f1f2f5" }}>
                    <CardHeader style={{ backgroundColor: "#f1f2f5" }}>
                        <CardLabel iconColor='info'>
                            <CardTitle>
                                <h3>Applications</h3>
                            </CardTitle>
                        </CardLabel>
                        {/* <CardActions>
                            <Button
                                color={darkModeStatus ? 'light' : 'dark'}
                                isLight
                                icon='Add'
                                onClick={apply}
                            >
                                Add New
                            </Button>

                        </CardActions> */}
                    </CardHeader>
                    <CardBody className='table-responsive' isScrollable>
                        {applicationList && applicationList.length > 0 ? applicationList.map((item, index) => (
                             <div key={index}>
                                <ApplicationCard data={item} />
                             </div>                            
                        )):<div style={{display:'flex',justifyContent:'center',marginTop:'15%'}}>
                            <b>No Application Available</b>
                            </div>}
                        
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default Application;
