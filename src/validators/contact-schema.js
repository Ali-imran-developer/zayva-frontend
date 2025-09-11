import * as Yup from 'yup';

export const contactSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required("Email is required").matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email must be lowercase, without spaces or invalid characters"),
  subject: Yup.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters').required('Subject is required'),
  message: Yup.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters').required('Message is required')
});
