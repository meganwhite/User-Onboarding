import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';


const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
    const [users, setUsers] = useState([]);
    console.log(users);
  
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
          }
        }, [status]);
  
    return (
      <div className="user-form">
        <h1>User Onboarding Form</h1>
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
  
          <Field type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && <p className="error">{errors.email}</p>}

          <Field type="text" name="password" placeholder="Password" />
          {touched.password && errors.password && <p className="error">{errors.password}</p>}
  
          <label className="checkbox-container">
            Terms of Service
            <Field
              type="checkbox"
              name="terms"
              checked={values.terms}
            />
            <span className="checkmark" />
          </label>
  
          <button type="submit">Submit!</button>
        </Form>

        {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}

      </div>
    );
  };
  
  const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
      return {
        terms: terms || false,
        name: name || '',
        email: email || '',
        password: password || '',
      };
    },
  
    validationSchema: Yup.object().shape({
      name: Yup.string().required('We need to know your name!'),
      email: Yup.string().required('We need to know your email!'),
      password: Yup.string('You\'re gonna want a password!')
    }),
  
    handleSubmit(values, { setStatus }) {
      axios
        .post('https://reqres.in/api/users/', values)
        .then(res => {
          setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm);
  
  export default FormikUserForm;
  