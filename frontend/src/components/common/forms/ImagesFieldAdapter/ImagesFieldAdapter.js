import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { FormControl, Paper, Typography, FormHelperText } from '@mui/material';
import { CloudUpload } from '../../../mui/Icons';

const ImagesFieldAdapter = ({ name, control }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, onChange, onBlur }, fieldState }) => {
        const onChangeDroppedImages = (files) => {
          const images = files.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );

          onChange(images);
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
