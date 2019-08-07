import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { Card } from 'semantic-ui-react'


const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
    const [users, setUsers] = useState([]);
    console.log(users);
  
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
          }
        }, [status]);
  
    return (
        <div className = 'container'>
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

                        <Field component="select" className="role-select" name="role">
                        <option>Please Choose an Option</option>
                        <option value="Front-end developer">Front-end developer</option>
                        <option value="Back-end developer">Back-end developer</option>
                        <option value="UX designer">UX designer</option>
                        <option value="UI designer">UI designer</option>
                        <option value="Data scientist">Data scientist</option>
                        </Field>
                
                        <label className="checkbox-container">
                            Terms of Service
                            <Field
                            type="checkbox"
                            name="terms"
                            checked={values.terms}
                            />
                            <span className="checkmark" />
                        </label>
                        {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}

            
                        <button type="submit">Submit!</button>
                        </Form>
                    </div>

            <div className='user-list'>
                {users.map(user => (
                    <Card>
                        <div className = "ui raised cards">
                            <div class="card">
                                <div class="content">
                                    <div class="header" key={user.id}>{user.name}</div>
                                    <div class="meta" key={user.id}>{user.role}</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
  };
  
  const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, role, terms }) {
      return {
        terms: terms || false,
        name: name || '',
        email: email || '',
        password: password || '',
        role: role || '',
      };
    },
  
    validationSchema: Yup.object().shape({
      name: Yup.string().required('We need to know your name!'),
      email: Yup.string().required('We need to know your email!'),
      password: Yup.string().required('You\'re gonna want a password!'),
      terms: Yup.bool().oneOf([true],'You must agree to our terms!'),
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
  