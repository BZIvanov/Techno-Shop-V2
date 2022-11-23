import { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  InputAdornment,
  IconButton,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '../../../mui/Icons';

const PasswordTextFieldAdapter = ({ name, control, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl sx={{ width: '100%' }}>
            <TextField
              type={showPassword ? 'text' : 'password'}
              inputProps={{ ...field }}
              label={label}
              variant='standard'
              error={fieldState.isTouched && Boolean(fieldState.error)}
              helperText={fieldState.isTouched && fieldState.error?.message}
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
      }}
    />
  );
};

export default PasswordTextFieldAdapter;
