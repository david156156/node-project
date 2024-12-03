import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login, LoginCredentials } from "../services/userService";
import { useTheme } from "../contexts/ThemeContext";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(7, "The password must contain at least 8 characters.")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(
          /[a-z]/,
          "The password must contain at least one lowercase letter."
        )
        .matches(/\d{4,}/, "The password must contain at least four numbers")
        .matches(
          /[!@%$#^&*\-_]/,
          "The password must contain at least one special character (!@%$#^&*-_*)."
        ),
    }),
    onSubmit: async (values: LoginCredentials) => {
      try {
        await login(values);
        alert("Login successful");
        navigate("/cards");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  const { darkMode } = useTheme();

  return (
    <div
      className={`container p-4 mt-5 rounded ${
        darkMode ? "divDark" : "divLight"
      }`}
      style={{ width: "300px" }}
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
      <button onClick={() => navigate("/sign-up")} className="btn btn-link p-0">
        Sign Up
      </button>
    </div>
  );
};

export default Login;
