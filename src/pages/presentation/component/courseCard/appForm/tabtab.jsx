import * as React from 'react';

import Box from '@mui/material/Box';
import { Stack, Button} from '@mui/material';
import { TextField } from '@material-ui/core';

import BasicSelect from './tabdata';


const TabTab=()=>{
    return(
        <><Box pt={2}>
            <BasicSelect style={{ width: '100%' }} />
        </Box><Box pt={2}>
                <BasicSelect style={{ width: '100%' }} />
            </Box><Stack direction='row' justifyContent='space-between' pt={2} pb={2}>
                <Box mr={2}>
                    <BasicSelect />
                </Box>
                <Box>
                    <BasicSelect />
                </Box>
            </Stack><TextField
                id='outlined-basic'
                variant='outlined'
                label='Multiline'
                multiline
                rows={4}
                defaultValue='Default Value'
                fullWidth
                mt={2} /><Box pt={2}>
                <Button variant='contained' size="large">Add Student Application</Button>
            </Box></>
    )
}

export default TabTab;