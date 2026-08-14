import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  username: yup.string().trim().required('modals.required'),
  password: yup.string().required('modals.required'),
});

export const signupValidationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('signup.required')
    .min(3, 'signup.usernameConstraints')
    .max(20, 'signup.usernameConstraints'),
  password: yup
    .string()
    .trim()
    .required('signup.required')
    .min(6, 'signup.passMin'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'signup.mustMatch'),
});

export const messageValidationSchema = yup.object({
  body: yup.string().trim().required('modals.required'),
});

export const getChannelValidationSchema = (existingNames) => yup.object({
  name: yup
    .string()
    .trim()
    .required('modals.required')
    .min(3, 'modals.min')
    .max(20, 'modals.max')
    .test('unique', 'modals.uniq', (value) => !existingNames.includes(value)),
});
