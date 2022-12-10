import { Badge, Avatar } from '@mui/material';
import { CloseOutlined } from '../../../mui/Icons';

const PreviewExistingImageAvatar = ({ image, handleRemoveImage }) => {
  return (
    <Badge
      badgeContent={
        <CloseOutlined
          sx={{ cursor: 'pointer' }}
          htmlColor={'red'}
          onClick={() => {
            handleRemoveImage(image.publicId);
          }}
        />
      }
    >
      <Avatar
        alt='product preview'
        src={image.imageUrl}
        sx={{ width: 90, height: 90 }}
      />
    </Badge>
  );
};

export default PreviewExistingImageAvatar;
