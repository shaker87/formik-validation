import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const Select = (props) => {
  const { name, label, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={label}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Select;
