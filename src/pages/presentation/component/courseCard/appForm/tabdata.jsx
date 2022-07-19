import * as React from 'react';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const BasicSelect=()=> {
 

 

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
       
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value='AGE'
          
          
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect
