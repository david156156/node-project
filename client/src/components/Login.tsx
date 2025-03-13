import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { decode, login, LoginCredentials } from "../services/userService";
import { useTheme } from "../contexts/ThemeContext";
import { useUser } from "../contexts/UserContext";
import { msgError, msgSuccess } from "../services/alert";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(7, "The password must contain at least 8 characters."),
    }),
    onSubmit: async (values: LoginCredentials) => {
      try {
        const response = await login(values);
        msgSuccess("Login successful", darkMode);
        const decoded = decode(response);
        setUser(decoded);
        navigate("/");
      } catch (error) {
        msgError("Login failed: Invalid email or password", darkMode);
      }
    },
  });

  const { darkMode } = useTheme();

  return (
    <div
      className={`container px-4 mt-5 rounded ${
        darkMode ? "divDark" : "divLight"
      }`}
      style={{ width: "300px", height: "500px", paddingTop: "70px" }}
    >
      <h2 className=" text-center">LOGIN</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger">{formik.errors.email}</div>
        )}

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-danger">{formik.errors.password}</div>
        )}

        <button
          disabled={!formik.dirty || !formik.isValid}
          type="submit"
          className="btn btn-info mb-1 w-100"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
