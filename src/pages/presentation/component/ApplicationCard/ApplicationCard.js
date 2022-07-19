/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
// import { Stack } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './ApplicationCard.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { Grid, Divider, Paper, Box, Typography, Button } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Icon from '../../../../components/icon/Icon';
// import Button from '../../../../components/bootstrap/Button';
import { serverUrl } from '../../../../config';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ApplicationCard({ data, wishData }) {
    const navigate = useNavigate();

    return (
        <div className='post'>
            <Grid container spacing={1} p={1}>
                <Grid item xs={1}>
                    <img
                        src='https://app.dfavo.com/assets/images/dummy-profile-pic.jpg'
                        alt='varun'
                        style={{ width: '50px', height: '50px' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div style={{ marginBottom: '-5px' }}>
                        <h5>
                            Sahil Batra
                            <Button
                                variant='contained'
                                style={{
                                    backgroundColor: '#f1f2f5',
                                    marginLeft: '12px',
                                    color: '#000000',
                                    height: '20px',
                                }}>
                                Student ID:275885
                            </Button>
                            <Button
                                variant='contained'
                                style={{
                                    backgroundColor: '#f1f2f5',
                                    marginLeft: '12px',
                                    color: '#000000',
                                    height: '20px',
                                }}>
                                Application ID: 47479
                            </Button>
                            <IconButton size='medium'>
                                <TextSnippetIcon fontSize='medium' />
                            </IconButton>
                        </h5>
                    </div>
                    <Stack direction='row'>
                        <Button variant='text' size='medium' startIcon={<LocalPhoneIcon />}>
                            9999219809
                        </Button>
                        <Button variant='text' size='medium' startIcon={<EmailIcon />}>
                            sahil@yopmail.com
                        </Button>
                        <Button variant='text' size='medium' startIcon={<CalendarMonthIcon />}>
                            20-Mar-1992
                        </Button>
                    </Stack>
                    <div style={{ marginBottom: '-5px' }}>
                        <p>
                            Indu Sharma (Study Advisor)
                            <small className='ms-2'>+1 Study Advisor</small>
                        </p>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <Stack direction='row' justifyContent='flex-end' p={1}>
                        <Button
                            style={{ width: '180px', height: '50px', mt: '30px' }}
                            variant='outlined'
                            color='info'
                            startIcon={<EditIcon />}>
                            Edit Application
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} p={1}>
                <Grid item xs={6}>
                    <h6>Academies Australasia Polytechnic, Australia</h6>
                    <p>Intake: Jan 2023</p>
                </Grid>
            </Grid>
            <Grid container spacing={2} p={1}>
                <Grid item xs={12}>
                    <div className='w-100 timeLine'>
                        <div className='w-100 tl-area'>
                            <ul>
                                <li>
                                    {' '}
                                    <span className='date topdate fwb'>Est. Date</span>
                                    <div className='step'> &nbsp; </div>{' '}
                                    <span className='date botdate fwb'>Actual Date</span>{' '}
                                </li>
                                <li className='active pending'>
                                    {' '}
                                    <span className='date topdate fwb'>XX-XX-XX</span>
                                    <div className='step-outer'>
                                        <div className='step'>
                                            <div
                                                className='status-circle'
                                                data-toggle='popover'
                                                data-trigger='hover focus'
                                                data-content='No Remarks'
                                                title=''
                                                data-original-title='Started &amp; Submitted for options'>
                                                {' '}
                                                <span>AR</span>{' '}
                                            </div>

                                            <div className='status-lines'>
                                                {' '}
                                                <span className='line' />{' '}
                                                <span className='line pending' />
                                            </div>
                                        </div>
                                    </div>
                                    <span className='date botdate fwb color-g'>19-07-22</span>{' '}
                                </li>
                                <li className='active '>
                                    {' '}
                                    <span className='date topdate fwb'>20-07-22</span>
                                    <div className='step-outer'>
                                        <div className='step'>
                                            <div
                                                className='status-circle'
                                                data-toggle='popover'
                                                data-trigger='hover focus'
                                                data-content='No Remarks'
                                                title=''
                                                data-original-title='Review and Course finalization'>
                                                {' '}
                                                <span>CF</span>{' '}
                                            </div>

                                            <div className='status-lines'>
                                                {' '}
                                                <span className='line' />{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <span className='date botdate fwb '>XX-XX-XX</span>{' '}
                                </li>
                                <li className='active '>
                                    {' '}
                                    <span className='date topdate fwb'>21-07-22</span>
                                    <div className='step-outer'>
                                        <div className='step'>
                                            <div
                                                className='status-circle'
                                                data-toggle='popover'
                                                data-trigger='hover focus'
                                                data-content='No Remarks'
                                                title=''
                                                data-original-title='Application fee Paid'>
                                                {' '}
                                                <span>AF</span>{' '}
                                            </div>

                                            <div className='status-lines'>
                                                {' '}
                                                <span className='line' />{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <span className='date botdate fwb '>XX-XX-XX</span>{' '}
                                </li>
                                <li className='active '>
                                    {' '}
                                    <span className='date topdate fwb'>22-07-22</span>
                                    <div className='step-outer'>
                                        <div className='step'>
                                            <div
                                                className='status-circle'
                                                data-toggle='popover'
                                                data-trigger='hover focus'
                                                data-content='No Remarks'
                                                title=''
                                                data-original-title='Submitted'>
                                                {' '}
                                                <span>SI</span>{' '}
                                            </div>

                                            <div className='status-lines'>
                                                {' '}
                                                <span className='line' />{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <span className='date botdate fwb '>XX-XX-XX</span>{' '}
                                </li>
                                <li className='active '>
                                    {' '}
                                    <span className='date topdate fwb'>01-08-22</span>
                                    <div className='step-outer'>
                                        <div className='step'>
                                            <div
                                                className='status-circle'
                                                data-toggle='popover'
                                                data-trigger='hover focus'
                                                data-content='No Remarks'
                                                title=''
                                                data-original-title='LOA/OL'>
                                                {' '}
                                                <span>OL</span>{' '}
                                            </div>

                                            <div className='status-lines'>
                                                {' '}
                                                <span className='line' />{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <span className='date botdate fwb '>XX-XX-XX</span>{' '}
                                </li>
                                <li className='active '>
                                    {' '}
                                    <span className='date topdate fwb'>21-08-22</span>
                                    <div className='step-outer'>
                                        <div className='step'>
                                            <div
                                                className='status-circle'
                                                data-toggle='popover'
                                                data-trigger='hover focus'
                                                data-content='No Remarks'
                                                title=''
                                                data-original-title='Tuition Fee Paid'>
                                                {' '}
                                                <span>TF</span>{' '}
                                            </div>

                                            <div className='status-lines'>
                                                {' '}
                                                <span className='line' />{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <span className='date botdate fwb '>XX-XX-XX</span>{' '}
                                </li>
                                <li className='active '>
                                    {' '}
                                    <span className='date topdate fwb'>05-09-22</span>
                                    <div className='step-outer'>
                                        <div className='step'>
                                            <div
                                                className='status-circle'
                                                data-toggle='popover'
                                                data-trigger='hover focus'
                                                data-content='No Remarks'
                                                title=''
                                                data-original-title='Visa Applied'>
                                                {' '}
                                                <span>VP</span>{' '}
                                            </div>

                                            <div className='status-lines'>
                                                {' '}
                                                <span className='line' />{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <span className='date botdate fwb '>XX-XX-XX</span>{' '}
                                </li>
                                <li className='active '>
                                    {' '}
                                    <span className='date topdate fwb'>30-09-22</span>
                                    <div className='step-outer'>
                                        <div className='step'>
                                            <div
                                                className='status-circle'
                                                data-toggle='popover'
                                                data-trigger='hover focus'
                                                data-content='No Remarks'
                                                title=''
                                                data-original-title='Visa Approved'>
                                                {' '}
                                                <span>VA</span>{' '}
                                            </div>

                                            <div className='status-lines'>
                                                {' '}
                                                <span className='line' />{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <span className='date botdate fwb '>XX-XX-XX</span>{' '}
                                </li>
                                <li className='active '>
                                    {' '}
                                    <span className='date topdate fwb'>01-10-22</span>
                                    <div className='step-outer'>
                                        <div className='step'>
                                            <div
                                                className='status-circle'
                                                data-toggle='popover'
                                                data-trigger='hover focus'
                                                data-content='No Remarks'
                                                title=''
                                                data-original-title='Enrolled &amp; Closed'>
                                                {' '}
                                                <span>EC</span>{' '}
                                            </div>

                                            <div className='status-lines'>
                                                {' '}
                                                <span className='line' />{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <span className='date botdate fwb '>XX-XX-XX</span>{' '}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Button variant="text" endIcon={<KeyboardArrowDownIcon />}>View More </Button>
                </Grid>
            </Grid>
        </div>
    );
}
export default ApplicationCard;
