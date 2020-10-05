import { ValidationError } from 'yup';

interface Errors{
  [key:string]: string;
}
export default function handleErrors(validation: ValidationError): Errors {
  const validationErrors:Errors = {};
  validation.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
