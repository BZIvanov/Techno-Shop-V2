import { useSelector } from '../../../../store/hooks';
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
import { useFormContext } from '../../../../providers/form/hooks';

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

const SelectDropdownMultichipAdapter = ({ name, label, options }) => {
  const { control } = useFormContext();

  const { loading } = useSelector((state) => state.apiCall);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            sx={{ width: '100%' }}
            error={Boolean(fieldState.error)}
            disabled={loading || options.length < 1}
          >
            <InputLabel>{label}</InputLabel>
            <Select
              data-testid={name}
              {...field}
              multiple={true}
              input={<OutlinedInput label={label} />}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {options
                      .filter((option) => selected.includes(option._id))
                      .map((option) => (
                        <Chip key={option._id} label={option.name} />
                      ))}
                  </Box>
                );
              }}
              MenuProps={MenuProps}
            >
              {options.map((option) => {
                return (
                  <MenuItem key={option._id} value={option._id}>
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
