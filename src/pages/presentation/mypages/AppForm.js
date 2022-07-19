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
import {  Typography, Grid ,Box ,Stack ,Link} from '@mui/material';

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
import { Forms } from '../../../menu';
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
import LabTabs from '../component/courseCard/appForm/tab';



const AppForm = () => {
    /**
     * For Tour
     */
    useTourStep(6);




    return (
        <PageWrapper title={Forms.ApplicationsForm.text}>
            <Page>
            <Stack maxWidth="100%">
            <h3>{Forms.ApplicationsForm.text}</h3>
            <Stack direction="row" justifyContent="space-around">
                <Stack>
                
                    <LabTabs/>
                </Stack >
                <Stack   minWidth="60%">
                <Box  p={2} borderBottom="1px solid teal">
						<img src='src\common\data\photoOfLogo.png' alt='rishav' />
						<Typography variant="h4" mb={2}>Academies Australasia Polytechnic</Typography>
						<Typography variant='h5'>College Website</Typography>
						<Link href="http://www.aapoly.edu.au" variant="h6" mb={2}>http://www.aapoly.edu.au</Link>
					</Box>
					<Box mt={2} pl={2}>
                        <Typography variant="h4" mb={2} >Bachelor of Tourism and Hospitality Management</Typography>
						<Link href="https://aapoly.edu.au/courses/bachelor-degree/" variant='h6'>https://aapoly.edu.au/courses/bachelor-degree/</Link>
						
					</Box>

					<Grid container mt={2} p={2}>
						<Grid item xs={6} variant="h4" mb={2}>Tuition Fee:15000 AUD</Grid>
						<Grid item  xs={6} mb={2}>Application Fee:0 AUD</Grid>
						<Grid item xs={6}>Duration:36 Months</Grid>
						<Grid item xs={6}>Intake:Jul,Nov,Feb</Grid>
					</Grid>
                </Stack>
            </Stack>
            </Stack>
                
            </Page>
           
        </PageWrapper>
    );
};

export default AppForm;
