import FormProvider from '../providers/form/FormProvider';
import { useForm } from '../providers/form/hooks';

/**
 * Higher order helper function which wraps a component with React Hook Form
 * It is helpful for testing form fields
 * @param {React Component} WrappedComponent
 * @param {*} restProps
 * @returns {React Component}
 */
export const withReactHookForm = (WrappedComponent, props) => {
  const HOC = () => {
    const { defaultValues, onSubmit = () => {}, ...rest } = props || {};

    const formMethods = useForm({ defaultValues });

    return (
      <FormProvider onSubmit={onSubmit} methods={formMethods}>
        <WrappedComponent {...rest} />
      </FormProvider>
    );
  };

  return HOC;
};
