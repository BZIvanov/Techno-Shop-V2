import { useSelector } from '../../../../store/hooks';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useFormContext } from '../../../../providers/form/hooks';

const SelectDropdownAdapter = ({ name, label, options, extendedOnChange }) => {
  const { control } = useFormContext();

  const loading = useSelector((state) => state.apiCall.loading);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, ...rest } = field;

        const handleOnChange = (event) => {
          onChange(event);
          extendedOnChange && extendedOnChange(event);
        };

        return (
          <FormControl
            sx={{ width: '100%' }}
            variant='standard'
            error={Boolean(fieldState.error)}
            disabled={loading}
          >
            <InputLabel>{label}</InputLabel>

            <Select data-testid={name} {...rest} onChange={handleOnChange}>
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

            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default SelectDropdownAdapter;
