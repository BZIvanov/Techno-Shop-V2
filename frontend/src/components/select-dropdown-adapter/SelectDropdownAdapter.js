import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

const SelectDropdownAdapter = (props) => {
  const { input, meta, label, options } = props;

  return (
    <FormControl
      sx={{ m: 1, width: '100%' }}
      variant='standard'
      error={meta.touched && Boolean(meta.error)}
    >
      <InputLabel>{label}</InputLabel>
      <Select {...input}>
        {options.map((option) => {
          if (typeof option === 'string') {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          }

          return (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectDropdownAdapter;
