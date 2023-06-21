import { useFormik } from "formik";

const LoginForm = ({ loginApi }) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      loginApi(values);
      resetForm();
    },
  });
  return (
    <div className="container w-25 p-3 ">
      <h1>Login Here</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter your Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("Token");
            localStorage.removeItem("User_Type");
            console.log("deom");
          }}
          className="btn btn-primary m-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
