import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import React from "react";
import * as Yup from "yup";
import TextError from "./TextError";
const NewForm = () => {
  const initialValues = {
    name: "",
    email: "",
    number: "",
    channel: "",
    address: "",
    comments: "",
    social: {
      facebook: "",
      youtube: "",
    },
    phone: ["", ""],
    phNumber: [""],
  };

  const onSubmit = (values) => {
    const value = JSON.stringify(values);
    console.log("Form Data :>> ", value);
  };
  // const validate = (values) => {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "Required";
  //   }
  //   if (!values.email) {
  //     errors.email = "Required";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "Invalid email format";
  //   }
  //   if (!values.channel) {
  //     errors.channel = "Required";
  //   }

  //   return errors;
  // };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    channel: Yup.string().required("Required"),
  });

  const validateComments = (value) => {
    let error;
    if (!error) {
      error = "Required";
    }
    return error;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {(formik) => {
        console.log(`formik`, formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="Email">Email</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email">
                {(errMsg) => {
                  return <div className="error">{errMsg}</div>;
                }}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="Number">Number</label>
              <Field type="number" name="number" id="number" />
              <ErrorMessage name="number" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field type="text" name="channel" id="channel" />
              <ErrorMessage name="channel" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <Field name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </Field>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook</label>
              <Field type="text" name="social.facebook" id="facebook" />
              <ErrorMessage name="facebook" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="youtube">Youtube</label>
              <Field type="text" name="social.youtube" id="youtube" />
              <ErrorMessage name="youtube" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="primaryPhone">Primary Phone</label>
              <Field type="text" name="phone[0]" id="primaryPhone" />
              <ErrorMessage name="phone[0]" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryPhone">Secondary Phone</label>
              <Field type="text" name="phone[1]" id="secondaryPhone" />
              <ErrorMessage name="phone[1]" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="phoneNumber">Phone Number List</label>
              <FieldArray name="phNumber">
                {(fieldArrayProps) => {
                  console.log(`fieldArrayProps`, fieldArrayProps);
                  const { form, push, remove } = fieldArrayProps;
                  const { values } = form;
                  const { phNumber } = values;
                  return (
                    <div>
                      {phNumber.map((ph, index) => (
                        <div key={index}>
                          <Field name={`phNumber[${index}]`} />
                          {index > 0 && (
                            <button onClick={() => remove(index)}>-</button>
                          )}
                          <button onClick={() => push("")}>+</button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            {/* <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                name="comments"
                id="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div> */}
            <button disabled={!formik.isValid}>Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewForm;
