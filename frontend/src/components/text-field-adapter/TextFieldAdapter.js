import {
  FormControl,
  InputAdornment,
  IconButton,
  TextField,
} from '@mui/material';

const TextFieldAdapter = ({ input, meta, ...rest }) => {
  const { Icon, ...restProps } = rest;

  return (
    <FormControl sx={{ m: 1, width: '25ch' }}>
      <TextField
        variant='standard'
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        {...input}
        {...restProps}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton>
                <Icon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default TextFieldAdapter;
