import * as yup from "yup";

// Login validation schema
export const LoginValidation = yup.object().shape({
   email: yup.string().email("Invalid email format").required("Email is required").trim(),
   password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be less than 20 characters long")
      .matches(/(?=.*[0-9])/, "Password must contain a number"),
});

// Register validation schema
export const RegisterValidation = yup.object().shape({
   email: yup.string().email("Invalid email format").required("Email is required").trim(),
   password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be less than 20 characters long")
      .matches(/(?=.*[0-9])/, "Password must contain a number"),
   fullName: yup
      .string()
      .required("Full Name is required")
      .max(20, "Full Name must be less than 20 characters long")
      .matches(/^[a-zA-Z\s]+$/, "Full Name must contain only alphabetic characters and spaces")
      .trim(),
});

export const ProfileValidation = yup.object().shape({
   fullName: yup
      .string()
      .required("Full Name is required")
      .max(20, "Full Name must be less than 20 characters long")
      .matches(/^[a-zA-Z\s]+$/, "Full Name must contain only alphabetic characters and spaces")
      .trim(),
   email: yup.string().email("Invalid email format").required("Email is required").trim(),
});

export const PasswordValidation = yup.object().shape({
   oldPassword: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be less than 20 characters long")
      .matches(/(?=.*[0-9])/, "Password must contain a number"),
   newPassword: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be less than 20 characters long")
      .matches(/(?=.*[0-9])/, "Password must contain a number"),
   confirmPassword: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be less than 20 characters long")
      .matches(/(?=.*[0-9])/, "Password must contain a number")
      .oneOf([yup.ref("newPassword"), null], "password must match"),
});

export const ForgotPasswordValidation = yup.object().shape({
   email: yup.string().email("Invalid email").required("Email is required"),
});
// export default { LoginValidation, RegisterValidation, ProfileValidation, PasswordValidation };
