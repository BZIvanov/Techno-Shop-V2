import { useState, useEffect } from 'react';
import { Badge, Avatar } from '@mui/material';
import { CloseOutlined } from '../../../mui/Icons';

const PreviewNewImageAvatar = ({ image, handleRemoveImage }) => {
  const [preview, setPreview] = useState();

  useEffect(() => {
    const previewUrl = URL.createObjectURL(image);
    setPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [image]);

  return (
    <Badge
      badgeContent={
        <CloseOutlined
          sx={{ cursor: 'pointer' }}
          htmlColor={'red'}
          onClick={() => {
            handleRemoveImage(image.name);
          }}
        />
      }
    >
      <Avatar
        alt='product preview'
        src={preview}
        sx={{ width: 90, height: 90 }}
      />
    </Badge>
  );
};

export default PreviewNewImageAvatar;
