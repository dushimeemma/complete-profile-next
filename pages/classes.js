import { Formik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import Link from 'next/link';

import Button from '../components/FormButton';
import Error from '../components/InputError';
import firebase from '../config/firebase';
import Label from '../components/CardLabel';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import Input from '../components/FormInput';
import Title from '../components/CardTitle';
import { profileRef } from './school';

const increment = firebase.firestore.FieldValue.increment(1);

const validationSchema = Yup.object().shape({
  class: Yup.string().required().min(2).label('Class Name'),
});

const Classes = () => {
  const FormSubmit = async (values) => {
    const classes = values.class.split(',');
    const classObj = {
      classes,
    };
    await profileRef.set(classObj, { merge: true });
    await profileRef.update({ reads: increment });
    Router.push('/done');
  };
  return (
    <Layout>
      <div className='flex justify-center items-center'>
        <div className='text-center'>
          <Icon url='/school.png' alt='welcome admin' />
          <Title myTitle='Create Classes' />
          <Formik
            initialValues={{ class: '' }}
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
                  Here you can configure classes in Always High School
                  <br />
                  Enter the new class name to continue
                </Label>
                <Input
                  name='class'
                  onChange={handleChange}
                  value={values.class}
                  onBlur={handleBlur}
                  className='px-3 bg-gray-200 w-full rounded-sm border-none'
                  placeholder='Class Name'
                />
                <Error>{errors.class && touched.class && errors.class}</Error>
                <Button
                  myButton='Continue'
                  className={values.class === '' ? '' : 'bg-blue-500'}
                />
              </form>
            )}
          </Formik>

          <Link href='/done'>
            <a className='dummy-link'>
              <u>Skip for later</u>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default Classes;
