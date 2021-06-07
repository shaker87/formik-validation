import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
const OldForm = () => {
  const initialValues = {
    name: "",
    email: "",
    number: "",
    channel: "",
  };

  const onSubmit = (values) => {
    const value = JSON.stringify(values);
    console.log("Form Data :>> ", value);
  };
  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!values.channel) {
      errors.channel = "Required";
    }

    return errors;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    channel: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    //validate,
    validationSchema,
  });

  // console.log(`formik.errors`, formik.errors);
  // console.log("formik.values :>> ", formik.values);
  // console.log("visited fields :>>", formik.touched);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="Number">Number</label>
          <input
            type="number"
            name="number"
            id="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
          />
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            name="channel"
            id="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="error">{formik.errors.channel}</div>
          ) : null}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default OldForm;
