import React from 'react';
import { connect } from 'react-redux';
import schema from './schema';
import formBuilder from './formBuilder';
import { CommonForm } from '../../molecules';
import { AppWidth, FormWrapper } from '../../atoms';
import { setCurrentUser } from '../../../store/actions/user';

const RegisterForm = ({ setCurrentUser }) => {
  const handleFormSubmit = (data) => {
    const { username, email, password } = data;
    const user = {
      username,
      email,
      password,
    };
    setCurrentUser(user);
  };

  return (
    <AppWidth>
      <FormWrapper>
        <CommonForm
          buttonText="Register"
          formBuilder={formBuilder}
          schema={schema}
          onFormSubmit={handleFormSubmit}
        />
      </FormWrapper>
    </AppWidth>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);
