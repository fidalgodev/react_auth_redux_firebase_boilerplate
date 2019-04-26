import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import styles from './Signup.module.css';
import Input from '../../../components/UI/forms/input/Input';
import Button from '../../../components/UI/button/Button';
import Heading from '../../../components/UI/heading/Heading';

import * as actions from '../../../store/actions';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short.')
    .max(50, 'Too Long.')
    .required('Your name is required.'),
  lastName: Yup.string()
    .min(2, 'Too Short.')
    .max(50, 'Too Long.')
    .required('Your last name is required.'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Email is required.'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
    .required('You must re-type your password.'),
});

const SignUp = ({ signUp, authError, loading }) => {
  return (
    <div className={styles.FormWrapper}>
      <Heading type="h1">Create an Account</Heading>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          signUp(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={styles.Form}>
            <Field
              type="text"
              name="firstName"
              placeholder="First Name"
              component={Input}
            />

            <Field
              type="text"
              name="lastName"
              placeholder="Last Name"
              component={Input}
            />

            <Field
              type="email"
              name="email"
              placeholder="Email"
              component={Input}
            />

            <Field
              type="password"
              name="password"
              placeholder="Password"
              component={Input}
            />

            <Field
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              component={Input}
            />

            <Button type="submit" disabled={isSubmitting || !isValid}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <div className={styles.Loading}>{loading ? 'Signing up...' : null}</div>
      <div className={styles.ErrorMessage}>{authError}</div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  authError: auth.authError,
  loading: auth.loadingAuth,
});

const mapDispatchToProps = {
  signUp: actions.signUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);