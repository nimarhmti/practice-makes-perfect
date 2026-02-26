"use client";
import * as Yup from "yup";
import { Formik, Form, useFormik } from "formik";
import { Input } from "@/components/ui/input";

const SignupSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string().min(6, "Too short").required("Required"),
});

type singUpFromValuesType = Yup.InferType<typeof SignupSchema>;

const initialFormValue: singUpFromValuesType = {
  email: "",
  password: "",
};

export default function TryFormik() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik<singUpFromValuesType>({
    initialValues: initialFormValue,
    validationSchema: SignupSchema,
    onSubmit: (data) => {
      console.log({ data });
    },
  });
  console.log({ values });

  return (
    <div className="px-3 py-4 flex items-center justify-center h-screen">
      {/* <Formik<singUpFromValuesType>
        initialValues={initialFormValue}
        validationSchema={SignupSchema}
        onSubmit={(data) => {
          console.log({ data });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => ( */}
      <form onSubmit={handleSubmit} className="space-y-0.5">
        {values.email}
        <div className=" h-14 space-y-1">
          <Input
            type="email"
            placeholder="email"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <p className={`text-[8px] ${errors.email && "text-red-500"}`}>
            {errors.email && touched.email && errors.email}
          </p>
        </div>
        <div className=" h-14 space-y-1">
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <p className={`text-[8px] ${errors.password && "text-red-500"}`}>
            {errors.password && touched.password && errors.password}
          </p>
        </div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
      {/* )}
      </Formik> */}
    </div>
  );
}
