import { useState } from 'react';
import {
  FormControl,
  InputAdornment,
  IconButton,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordTextFieldAdapter = ({ input, meta, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }}>
      <TextField
        type={showPassword ? 'text' : 'password'}
        variant='standard'
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        {...input}
        {...rest}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default PasswordTextFieldAdapter;
