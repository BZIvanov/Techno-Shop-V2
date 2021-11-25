import { Controller } from 'react-hook-form';
import {
  FormControl,
  InputAdornment,
  IconButton,
  TextField,
} from '@mui/material';

const TextFieldAdapter = ({ name, control, label, type = 'text', Icon }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl sx={{ m: 1, width: '100%' }}>
            <TextField
              inputProps={{ ...field, type }}
              variant='standard'
              label={label}
              error={fieldState.isTouched && Boolean(fieldState.error)}
              helperText={fieldState.isTouched && fieldState.error?.message}
              InputProps={
                Icon
                  ? {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton>
                            <Icon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : {}
              }
            />
          </FormControl>
        );
      }}
    />
  );
};

export default TextFieldAdapter;
