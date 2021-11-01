import React from 'react'
import { Formik } from 'formik'
import {addPerson}  from '../../redux/actions/person-actions'
// import validate from './validate-spected'
// import getValidationSchema from './getValidationSchema-spected'
let parentProps = null;
const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
  consent: false,
  organization: '', //org
  assistant: '', //assistant
  group: '', //group
  location: '' // location
}

export default function   (props) {
  parentProps = props;
  return (
    <Formik
      initialValues={initialValues}
      //   validate={validate(getValidationSchema)}
      onSubmit={onSubmit}
      render={PersonForm}
    />
  )
}

function PersonForm(props) {
  
  const { isSubmitting, errors, handleChange, handleSubmit, values } = props

  return (
    <div className="modalForm">
      <div className="row form">
      <div className="col-xs-12 col-sm-12 col-md-2"  style={{display:"none"}}>
          <span>Title:</span>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10" style={{display:"none"}}>
          <input
            name="initials"
            placeholder="Enter Title"
            value={values.initials}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">{errors.initials}</div>
        </div>


        <div className="col-xs-12 col-sm-12 col-md-2">
          <span>Full Name:</span>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10">
          <input
            name="name"
            placeholder="Enter FullName"
            value={values.name}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">{errors.name}</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Phone:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="phone"
            placeholder="Enter Phone Number"
            value={values.phone}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">{errors.phone}</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Email:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="email"
            placeholder="Enter Email"
            value={values.email}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">{errors.email}</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Organization:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="organization"
            placeholder="Enter Organization"
            value={values['organization']}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">
            {errors['organization']}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Assistant:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="assistant"
            placeholder="Enter Assistant"
            value={values['assistant']}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">
            {errors['assistant']}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Group:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="group"
            placeholder="Enter Group"
            value={values['group']}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">
            {errors['group']}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-2">
          <span>Location:</span>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <input
            name="location"
            placeholder="Enter Location"
            value={values['location']}
            type="text"
            onChange={handleChange}
          />
          <div className="form-field-error">
            {errors['location ']}
          </div>
        </div>

        <div className="col-xs-12">
          <button onClick={handleSubmit}>
            {isSubmitting ? 'Please wait...' : 'Add Person'}
          </button>
        </div>
      </div>
    </div>
  )
}

function onSubmit(values, { setSubmitting, setErrors }) {
  setTimeout(() => {
    var arrName = values.name.split(' ');
    values.initials = arrName[0].charAt(0).toUpperCase() + ( (arrName.length > 1) ? arrName[1].charAt(0).toUpperCase() : '');
    values.imgsrc = '';
    parentProps.addPerson(values);
    console.log('User has been sucessfully saved!', values)
    setSubmitting(false)
  }, 2000);


  

}
