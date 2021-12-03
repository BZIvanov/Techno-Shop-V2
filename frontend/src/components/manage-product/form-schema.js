import * as yup from 'yup';

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().min(0.01).required(),
    shipping: yup.string().required('Shipping is required'),
    quantity: yup.number().min(1).required(),
    color: yup.string().required('Color is required'),
    brand: yup.string().required('Brand is required'),
    category: yup.string().required('Category is required'),
    subcategories: yup
      .array()
      .of(
        yup.object().shape({
          _id: yup.string().required(),
          name: yup.string().required(),
        })
      )
      .min(1),
    images: yup.array().of(yup.mixed()).min(1),
  })
  .required();

export default schema;
