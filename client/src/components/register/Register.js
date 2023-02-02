import React from 'react'
import { useFormik } from 'formik';
import { signUpSchema } from '../../schemas';
import axios from 'axios';

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: ""
}
const Register = (props) => {

  const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();

      axios.post('http://localhost:8080/api/v1/auth/signup', values )
        .then(res => console.log(res))
    }
  })

  
  const { changeAuthMode } = props;
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label htmlFor='name'>Full Name</label>
            <input
              type="text"
              id='name'
              name='name'
              autoComplete='off'
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            { errors.name && touched.name ? (
              <p>{ errors.name }</p>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor='email'>Email address</label>
            <input
              type="email"
              id='email'
              name='email'
              autoComplete='off'
              className="form-control mt-1"
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            { errors.email && touched.email ? (
              <p>{ errors.email }</p>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              id='password'
              name='password'
              autoComplete='off'
              className="form-control mt-1"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            { errors.password && touched.password ? (
              <p>{ errors.password }</p>
            ) : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input
              type="password"
              id='confirm_password'
              name='confirm_password'
              autoComplete='off'
              className="form-control mt-1"
              placeholder="Confirm Password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            { errors.confirm_password && touched.confirm_password ? (
              <p>{ errors.confirm_password }</p>
            ) : null}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
