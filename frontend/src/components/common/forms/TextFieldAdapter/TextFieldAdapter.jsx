import { Controller } from 'react-hook-form';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import { useFormContext } from '../../../../providers/form/hooks';

const TextFieldAdapter = ({
  name,
  label,
  type = 'text',
  multiline = false,
  minRows,
  maxRows,
  placeholder,
  icon,
}) => {
  // After we provided the form methods to the FormProvider, we can now get them from the context
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl sx={{ width: '100%' }}>
            <TextField
              inputProps={{ ...field, type }}
              variant='standard'
              label={label}
              error={fieldState.isTouched && Boolean(fieldState.error)}
              helperText={fieldState.isTouched && fieldState.error?.message}
              InputProps={
                icon
                  ? {
                      endAdornment: (
                        <InputAdornment position='end' sx={{ padding: '8px' }}>
                          {icon}
                        </InputAdornment>
                      ),
                    }
                  : {}
              }
              multiline={multiline} // textarea type
              minRows={multiline && minRows ? minRows : undefined}
              maxRows={multiline && maxRows ? maxRows : undefined}
              placeholder={placeholder}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default TextFieldAdapter;
