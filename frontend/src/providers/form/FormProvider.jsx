import React from 'react';
import { FormProvider as RHFFormProvider } from 'react-hook-form';

// This is intended to be local form provider for each form, not global app provider like the Router. This is beacuse each form has its own context
const FormProvider = ({ methods, onSubmit, children }) => {
  return (
    // We provide all the methods from useForm, so we can access them using useFormContext in any child component of the FormProvider
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </RHFFormProvider>
  );
};

export default FormProvider;
