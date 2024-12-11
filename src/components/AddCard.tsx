import { FunctionComponent, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Card } from "../interfaces/Card";
import { ThemeContext } from "../contexts/ThemeContext";
import { addCard } from "../services/cardService";
import { msgError, msgSuccess } from "../services/alert";
import { useUser } from "../contexts/UserContext";

interface AddCardProps {}

const AddCard: FunctionComponent<AddCardProps> = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useUser();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: { url: "", alt: "" },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      subtitle: Yup.string().required("Subtitle is required"),
      description: Yup.string().required("Description is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      web: Yup.string().url("Invalid URL"),
      image: Yup.object({
        url: Yup.string().url("Invalid URL"),
        alt: Yup.string(),
      }),
      address: Yup.object({
        state: Yup.string(),
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        street: Yup.string().required("Street is required"),
        houseNumber: Yup.number().required("House number is required"),
        zip: Yup.number(),
      }),
    }),
    onSubmit: async (values: Card) => {
      try {
        console.log("Submitting values:", values);
        const formattedValues = {
          ...values,
          address: {
            ...values.address,
            houseNumber: Number(values.address.houseNumber),
            zip: Number(values.address.zip),
          },
        };

        await addCard(formattedValues);
        msgSuccess("Card added successfully", darkMode);
        navigate("/");
      } catch (error) {
        console.error("Error adding card:", error);
        msgError("Failed to add card", darkMode);
      }
    },
  });

  if (!user?.isBusiness) {
    return (
      <div className="text-center mt-5 p-5 display-5">
        You do not have permission to add a card.
      </div>
    );
  }

  return (
    <div className={"container p-4 mt-5 rounded"} style={{ maxWidth: "600px" }}>
      <h2 className="text-center">Add New Card</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.title && formik.errors.title ? "is-invalid" : ""
              }`}
              type="text"
              placeholder="Title*"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="invalid-feedback">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.subtitle && formik.errors.subtitle
                  ? "is-invalid"
                  : ""
              }`}
              type="text"
              placeholder="Subtitle*"
              {...formik.getFieldProps("subtitle")}
            />
            {formik.touched.subtitle && formik.errors.subtitle ? (
              <div className="invalid-feedback">{formik.errors.subtitle}</div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <textarea
              className={`form-control ${
                formik.touched.description && formik.errors.description
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Description*"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="invalid-feedback">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
              }`}
              type="tel"
              placeholder="Phone*"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              type="email"
              placeholder="Email*"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.web && formik.errors.web ? "is-invalid" : ""
              }`}
              type="url"
              placeholder="Website"
              {...formik.getFieldProps("web")}
            />
            {formik.touched.web && formik.errors.web ? (
              <div className="invalid-feedback">{formik.errors.web}</div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.image?.url && formik.errors.image?.url
                  ? "is-invalid"
                  : ""
              }`}
              type="url"
              placeholder="Image URL"
              {...formik.getFieldProps("image.url")}
            />
            {formik.touched.image?.url && formik.errors.image?.url ? (
              <div className="invalid-feedback">{formik.errors.image?.url}</div>
            ) : null}
          </div>
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.image?.alt && formik.errors.image?.alt
                  ? "is-invalid"
                  : ""
              }`}
              type="text"
              placeholder="Image Alt Text"
              {...formik.getFieldProps("image.alt")}
            />
            {formik.touched.image?.alt && formik.errors.image?.alt ? (
              <div className="invalid-feedback">{formik.errors.image?.alt}</div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.address?.state && formik.errors.address?.state
                  ? "is-invalid"
                  : ""
              }`}
              type="text"
              placeholder="State"
              {...formik.getFieldProps("address.state")}
            />
            {formik.touched.address?.state && formik.errors.address?.state ? (
              <div className="invalid-feedback">
                {formik.errors.address?.state}
              </div>
            ) : null}
          </div>
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.address?.country &&
                formik.errors.address?.country
                  ? "is-invalid"
                  : ""
              }`}
              type="text"
              placeholder="Country*"
              {...formik.getFieldProps("address.country")}
            />
            {formik.touched.address?.country &&
            formik.errors.address?.country ? (
              <div className="invalid-feedback">
                {formik.errors.address?.country}
              </div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.address?.city && formik.errors.address?.city
                  ? "is-invalid"
                  : ""
              }`}
              type="text"
              placeholder="City*"
              {...formik.getFieldProps("address.city")}
            />
            {formik.touched.address?.city && formik.errors.address?.city ? (
              <div className="invalid-feedback">
                {formik.errors.address?.city}
              </div>
            ) : null}
          </div>
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.address?.street && formik.errors.address?.street
                  ? "is-invalid"
                  : ""
              }`}
              type="text"
              placeholder="Street*"
              {...formik.getFieldProps("address.street")}
            />
            {formik.touched.address?.street && formik.errors.address?.street ? (
              <div className="invalid-feedback">
                {formik.errors.address?.street}
              </div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.address?.houseNumber &&
                formik.errors.address?.houseNumber
                  ? "is-invalid"
                  : ""
              }`}
              type="number"
              placeholder="House Number*"
              {...formik.getFieldProps("address.houseNumber")}
            />
            {formik.touched.address?.houseNumber &&
            formik.errors.address?.houseNumber ? (
              <div className="invalid-feedback">
                {formik.errors.address?.houseNumber}
              </div>
            ) : null}
          </div>
          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                formik.touched.address?.zip && formik.errors.address?.zip
                  ? "is-invalid"
                  : ""
              }`}
              type="number"
              placeholder="ZIP Code"
              {...formik.getFieldProps("address.zip")}
            />
            {formik.touched.address?.zip && formik.errors.address?.zip ? (
              <div className="invalid-feedback">
                {formik.errors.address?.zip}
              </div>
            ) : null}
          </div>
        </div>

        <button
          disabled={!formik.dirty || !formik.isValid}
          type="submit"
          className="btn btn-primary w-100"
        >
          Add Card
        </button>
      </form>
    </div>
  );
};

export default AddCard;
