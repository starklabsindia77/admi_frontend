/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, Button } from '@mui/material';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { TextField } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';

import BasicSelect from './tabdata';

const TabTab = () => {
    const [inputValue, setInputValue] = useState('');
    const [role, setRole] = useState();
    const [college, setcollege] = useState(['college1', 'college2', 'college3']);
    const [openData, setOpenData] = useState(false);
    const handleClose = () => {
        setOpenData(false);
    };

    return (
        <>
            <Box pt={2} pb={2}>
                <h5 style={{ fontWeight: 'bold' }}>Prefer College</h5>
                {/* <BasicSelect style={{ width: '100%' }} /> */}

                <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={college}
                    value={role}
                    onChange={(event, newValue) => {
                        setRole(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
            <Box pt={2} pb={2}>
                <h5 style={{ fontWeight: 'bold' }}>Prefer Course</h5>
                <BasicSelect style={{ width: '100%' }} />
            </Box>
            <Stack direction='row' justifyContent='space-between' pt={2} pb={4}>
                <Box mr={2}>
                    <h5 style={{ fontWeight: 'bold' }}>Intake</h5>
                    <BasicSelect />
                </Box>
                <Box>
                    <h5 style={{ fontWeight: 'bold' }}>Year</h5>
                    <BasicSelect />
                </Box>
            </Stack>
            <h5 style={{ fontWeight: 'bold' }}>Remark</h5>
            <TextField
                id='outlined-basic'
                variant='outlined'
                // label='Multiline'
                multiline
                rows={4}
                // defaultValue='Default Value'
                fullWidth
                mt={2}
            />
            <Box pt={2}>
                <Button variant='contained' size='large'>
                    Add Student Application
                </Button>
                {/* <Dialog
                    maxWidth='lg'
                    open={openData}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'>
                        <h3>.</h3>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            <h1>You have created your account successfully</h1>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>
                            Thank You
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </Box>
        </>
    );
};

export default TabTab;
