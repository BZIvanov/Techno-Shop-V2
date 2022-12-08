import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { FormControl, Paper, Typography, FormHelperText } from '@mui/material';
import { CloudUpload } from '../../../mui/Icons';
import { useFormContext } from '../../../../providers/form/hooks';

const ImagesFieldAdapter = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, onChange, onBlur }, fieldState }) => {
        const onChangeDroppedImages = (files) => {
          onChange(files);
        };

        return (
          <FormControl sx={{ width: '100%' }}>
            <Dropzone onDrop={onChangeDroppedImages}>
              {({ getRootProps, getInputProps }) => {
                return (
                  <Paper
                    variant='outlined'
                    sx={{
                      backgroundColor: (theme) => theme.palette.grey[200],
                      textAlign: 'center',
                      cursor: 'pointer',
                      color: (theme) => theme.palette.text.secondary,
                      padding: (theme) => theme.spacing(1),
                    }}
                    {...getRootProps()}
                  >
                    <CloudUpload
                      sx={{ color: (theme) => theme.palette.text.secondary }}
                      fontSize='large'
                    />
                    <input
                      data-testid='input-file'
                      {...getInputProps()}
                      name={name}
                      onBlur={onBlur}
                      accept='image/*'
                    />
                    <Typography variant='body2'>
                      Drag and drop images here, or click to select
                    </Typography>
                  </Paper>
                );
              }}
            </Dropzone>

            {fieldState.error && (
              <FormHelperText
                sx={{ margin: 0 }}
                error={Boolean(fieldState.error)}
              >
                {fieldState.error.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default ImagesFieldAdapter;
