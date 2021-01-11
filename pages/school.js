import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';

import Button from '../components/FormButton';
import Error from '../components/InputError';
import Label from '../components/CardLabel';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import Input from '../components/FormInput';
import firebase from '../config/firebase';
import Title from '../components/CardTitle';

const ISSERVER = typeof window === 'undefined';

let id;

if (!ISSERVER) {
  id = localStorage.getItem('id') || process.env.NEXT_PUBLIC_DUMMY_ID;
}

export const profileRef = firebase.firestore().collection('school').doc(id);

const validationSchema = Yup.object().shape({
  school: Yup.string().required().min(2).label('School Name'),
});

const School = () => {
  const [name, setName] = useState('');
  const getData = async () => {
    const data = await profileRef.get();
    if (data.data()) {
      setName(data.data().name);
    }
  };
  getData();
  return (
    <Layout>
      <div className='flex justify-center items-center'>
        <div className='text-center'>
          <Icon url='/school.png' alt='welcome admin' />
          <Title myTitle='Setup your School' />
          <Formik
            initialValues={{ school: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await profileRef.set(values, { merge: true });
              Router.push('/stuff');
            }}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Label>Great {name}, What is The Name of Your School</Label>
                <Input
                  name='school'
                  onChange={handleChange}
                  value={values.school}
                  onBlur={handleBlur}
                  className='px-3 bg-gray-200 w-full rounded-sm border-none'
                  placeholder='School Name'
                />
                <Error>
                  {errors.school && touched.school && errors.school}
                </Error>
                <Button
                  myButton='Continue'
                  className={values.school === '' ? '' : 'bg-blue-500'}
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};
export default School;
