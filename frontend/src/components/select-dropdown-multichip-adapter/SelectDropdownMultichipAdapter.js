import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
  Box,
  Chip,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectDropdownMultichipAdapter = ({ name, control, label, options }) => {
  const { loading } = useSelector((state) => state.apiCall);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            sx={{ m: 1, width: '100%' }}
            variant='standard'
            error={Boolean(fieldState.error)}
            disabled={loading || options.length < 1}
          >
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              multiple={true}
              input={<OutlinedInput label={label} />}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value._id} label={value.name} />
                    ))}
                  </Box>
                );
              }}
              MenuProps={MenuProps}
            >
              {options.map((option) => {
                return (
                  <MenuItem key={option._id} value={option}>
                    {option.name}
                  </MenuItem>
                );
              })}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default SelectDropdownMultichipAdapter;
