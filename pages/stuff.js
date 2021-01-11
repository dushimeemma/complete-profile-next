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
import { profileRef } from './school';
import Title from '../components/CardTitle';

const validationSchema = Yup.object().shape({
  stuffEmail: Yup.string().required().min(2).label('Email Address'),
});

const Stuff = () => {
  const FormSubmit = async (values) => {
    const stuffEmails = values.stuffEmail.split(',');
    const emailObj = {
      stuffEmails,
    };
    await profileRef.set(emailObj, { merge: true });
    Router.push('/students');
  };
  return (
    <Layout>
      <div className='flex justify-center items-center'>
        <div className='text-center'>
          <Icon url='/teacher.png' alt='welcome admin' />
          <Title myTitle='Add Teachers To Your School' />
          <Formik
            initialValues={{ stuffEmail: '' }}
            validationSchema={validationSchema}
            onSubmit={FormSubmit}
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <Label>
                  Please Enter the email of the teacher to continue.
                  <br /> An invite will be sent to them via Email
                </Label>
                <Input
                  name='stuffEmail'
                  onChange={handleChange}
                  value={values.stuffEmail}
                  onBlur={handleBlur}
                  className='px-3 bg-gray-200 w-full rounded-sm border-none'
                  placeholder='Email Addresses'
                />
                <Error>
                  {errors.stuffEmail && touched.stuffEmail && errors.stuffEmail}
                </Error>
                <Button
                  myButton='Continue'
                  className={values.stuffEmail === '' ? '' : 'bg-blue-500'}
                />
              </form>
            )}
          </Formik>

          <Link href='/students'>
            <a className='dummy-link'>
              <u>Skip for later</u>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default Stuff;
