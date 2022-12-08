import Resizer from 'react-image-file-resizer';

export const resizeImage = (file) => {
  return new Promise((resolve) => {
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
};
