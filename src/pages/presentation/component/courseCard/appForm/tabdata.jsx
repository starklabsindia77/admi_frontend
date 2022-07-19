/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';

// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

const BasicSelect = () => {
  const [inputValue, setInputValue] = useState('');
  const [role, setRole] = useState();
  return (
    <Box sx={{ minWidth: 200 }}>
      {/* <FormControl fullWidth>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value='AGE'
          variant='outlined'>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}

      <FormGroup id='role' isFloating>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          // options={roleList.map((option) => option.name)}
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
      </FormGroup>
    </Box>
  );
};

export default BasicSelect;
