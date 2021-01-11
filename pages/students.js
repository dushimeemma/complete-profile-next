import { Formik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import Link from 'next/link';

import Button from '../components/FormButton';
import Error from '../components/InputError';
import Label from '../components/CardLabel';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import Input from '../components/FormInput';
import Title from '../components/CardTitle';
import { profileRef } from './school';

const validationSchema = Yup.object().shape({
  studentEmail: Yup.string().required().min(2).label('Email Address'),
});

const Students = () => {
  const FormSubmit = async (values) => {
    const studentEmails = values.studentEmail.split(',');
    const emailObj = {
      studentEmails,
    };
    await profileRef.set(emailObj, { merge: true });
    Router.push('/classes');
  };
  return (
    <Layout>
      <div className='flex justify-center items-center'>
        <div className='text-center'>
          <Icon url='/teacher.png' alt='welcome admin' />
          <Title myTitle='Add student to your School' />
          <Formik
            initialValues={{ studentEmail: '' }}
            validationSchema={validationSchema}
            onSubmit={FormSubmit}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>
                <Label>
                  Please enter the email of student to continue <br /> An invite
                  will be sent to them via email
                </Label>
                <Input
                  name='studentEmail'
                  onChange={handleChange}
                  value={values.studentEmail}
                  onBlur={handleBlur}
                  className='px-3 bg-gray-200 w-full rounded-sm border-none'
                  placeholder='Email Addresses'
                />
                <Error>
                  {errors.studentEmail &&
                    touched.studentEmail &&
                    errors.studentEmail}
                </Error>
                <Button
                  myButton='Continue'
                  className={values.studentEmail === '' ? '' : 'bg-blue-500'}
                />
              </form>
            )}
          </Formik>

          <Link href='/classes'>
            <a className='dummy-link'>
              <u>Skip for later</u>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default Students;
