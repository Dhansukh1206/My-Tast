import React from "react";
import { useFormik } from "formik";

const FormComponent = ({ createData }) => {
  const formik = useFormik({
    initialValues: {
      domain: "",
      string: "",
    },
    onSubmit: (values, { resetForm }) => {
      createData(values);
      resetForm();
    },
  });
  return (
    <div className="container w-25 p-3 ">
      <h1>Add Data</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="domain">Domain</label>
          <input
            type="text"
            className="form-control"
            id="domain"
            onChange={formik.handleChange}
            value={formik.values.domain}
            placeholder="Enter your domain"
          />
        </div>
        <div className="form-group">
          <label htmlFor="string">String</label>
          <input
            type="string"
            className="form-control"
            id="string"
            placeholder="Enter your string"
            onChange={formik.handleChange}
            value={formik.values.string}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
