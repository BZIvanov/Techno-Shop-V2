import { useForm as useFormHook } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// this is a thin wrapper over the original useForm, this way it will be easier to refactor in the future
// it also allows us to have centralized import/usage of the yupResolver
export const useForm = (props) => {
  const { schema, ...rest } = props || {};

  const methods = useFormHook({
    resolver: schema ? yupResolver(schema) : undefined,
    ...rest,
  });

  return methods;
};
