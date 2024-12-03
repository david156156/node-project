import { FunctionComponent } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { addUser } from "../services/userService";
import { User } from "../interfaces/User";

interface SignupProps {}

const Signup: FunctionComponent<SignupProps> = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.object({
      first: yup.string().min(2).max(256).required("First name is required"),
      middle: yup.string().min(2).max(256),
      last: yup.string().min(2).max(256).required("Last name is required"),
    }),
    phone: yup.string().min(9).max(11).required("Phone is required"),
    email: yup
      .string()
      .min(5)
      .email("Invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8)
      .max(20)
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@%$#^&*\-_]).{7,20}$/,
        "Password must contain uppercase, lowercase, 4 numbers and special character"
      )
      .required("Password is required"),
    image: yup.object({
      url: yup.string().min(14),
      alt: yup.string().min(2).max(256),
    }),
    address: yup
      .object({
        state: yup.string().min(2).max(256),
        country: yup.string().min(2).max(256).required("Country is required"),
        city: yup.string().min(2).max(256).required("City is required"),
        street: yup.string().min(2).max(256).required("Street is required"),
        houseNumber: yup.number().min(1).required("House number is required"),
        zip: yup.number().required("Zip is required"),
      })
      .required(),
    isBusiness: yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      name: { first: "", middle: "", last: "" },
      phone: "",
      email: "",
      password: "",
      image: { url: "", alt: "" },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
      },
      isBusiness: false,
    },
    validationSchema,
    onSubmit: async (values: User) => {
      try {
        await addUser(values);
        alert("User added successfully");
        formik.resetForm(); // איפוס השדות
        navigate("/"); // ניווט לעמוד הכרטיסים
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed");
      }
    },
  });

  const { darkMode } = useTheme();

  return (
    <div
      className={`container p-4 mt-5 rounded ${
        darkMode ? "divDark" : "divLight"
      }`}
      style={{ maxWidth: "600px" }}
    >
      <h2 className="text-center">SIGN UP</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className={`form-control ${
                formik.touched.name?.first && formik.errors.name?.first
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="First Name"
              {...formik.getFieldProps("name.first")}
            />
            {formik.touched.name?.first && formik.errors.name?.first && (
              <div className="invalid-feedback">{formik.errors.name.first}</div>
            )}
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Middle Name"
              {...formik.getFieldProps("name.middle")}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className={`form-control ${
                formik.touched.name?.last && formik.errors.name?.last
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Last Name"
              {...formik.getFieldProps("name.last")}
            />
            {formik.touched.name?.last && formik.errors.name?.last && (
              <div className="invalid-feedback">{formik.errors.name.last}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <input
            type="tel"
            className={`form-control ${
              formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
            }`}
            placeholder="Phone"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="invalid-feedback">{formik.errors.phone}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "is-invalid"
                : ""
            }`}
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="url"
            className="form-control mb-3"
            placeholder="Image URL"
            {...formik.getFieldProps("image.url")}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image Alt Text"
            {...formik.getFieldProps("image.alt")}
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className={`form-control ${
                formik.touched.address?.country &&
                formik.errors.address?.country
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Country"
              {...formik.getFieldProps("address.country")}
            />
            {formik.touched.address?.country &&
              formik.errors.address?.country && (
                <div className="invalid-feedback">
                  {formik.errors.address.country}
                </div>
              )}
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="State"
              {...formik.getFieldProps("address.state")}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className={`form-control ${
                formik.touched.address?.city && formik.errors.address?.city
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="City"
              {...formik.getFieldProps("address.city")}
            />
            {formik.touched.address?.city && formik.errors.address?.city && (
              <div className="invalid-feedback">
                {formik.errors.address.city}
              </div>
            )}
          </div>
          <div className="col">
            <input
              type="text"
              className={`form-control ${
                formik.touched.address?.street && formik.errors.address?.street
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Street"
              {...formik.getFieldProps("address.street")}
            />
            {formik.touched.address?.street &&
              formik.errors.address?.street && (
                <div className="invalid-feedback">
                  {formik.errors.address.street}
                </div>
              )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              type="number"
              className={`form-control ${
                formik.touched.address?.houseNumber &&
                formik.errors.address?.houseNumber
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="House Number"
              {...formik.getFieldProps("address.houseNumber")}
            />
            {formik.touched.address?.houseNumber &&
              formik.errors.address?.houseNumber && (
                <div className="invalid-feedback">
                  {formik.errors.address.houseNumber}
                </div>
              )}
          </div>
          <div className="col">
            <input
              type="number"
              className={`form-control ${
                formik.touched.address?.zip && formik.errors.address?.zip
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="ZIP Code"
              {...formik.getFieldProps("address.zip")}
            />
            {formik.touched.address?.zip && formik.errors.address?.zip && (
              <div className="invalid-feedback">
                {formik.errors.address.zip}
              </div>
            )}
          </div>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isBusiness"
            {...formik.getFieldProps("isBusiness")}
          />
          <label className="form-check-label" htmlFor="isBusiness">
            Business Account
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
