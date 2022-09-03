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
import { Typography, Grid, Box, Stack, Link } from '@mui/material';


import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';


import { Forms } from '../../../menu';

import useTourStep from '../../../hooks/useTourStep';
import { serverUrl } from '../../../config';
import LabTabs from '../component/courseCard/appForm/tab';
import PForm from '../component/ProfileForm/PForm';



const UserProfileForm = () => {
    /**
     * For Tour
     */
    useTourStep(6);




    return (
        <PageWrapper title='User Profile'>
            <Page>
                <Stack maxWidth="100%">
                    <h3>User Profile</h3>
                    <PForm />
                </Stack>
            </Page>


        </PageWrapper>
    );
};

export default UserProfileForm;
