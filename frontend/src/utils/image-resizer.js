import Resizer from 'react-image-file-resizer';

const resizeImage = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      590,
      590,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64'
    );
  });

export default resizeImage;
