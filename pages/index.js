import { Formik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';

import Layout from '../components/Layout';
import Icon from '../components/Icon';
import firebase from '../config/firebase';
import Button from '../components/FormButton';
import Error from '../components/InputError';
import Input from '../components/FormInput';
import Label from '../components/CardLabel';
import Title from '../components/CardTitle';

export const db = firebase.firestore();

export const profileRef = db.collection('school');

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).label('Full Name'),
});

const Home = () => {
  return (
    <Layout>
      <div className='flex justify-center items-center'>
        <div className='text-center'>
          <Icon url='/welcom.png' alt='welcome admin' />
          <Title myTitle='Hi, Administrator' />
          <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values) => {
              const res = await profileRef.add(values);
              localStorage.setItem('id', res.id);
              Router.push('/school');
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
            }) => (
              <form onSubmit={handleSubmit}>
                <Label>Welcome, Please Enter Your Name To Continue</Label>
                <Input
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className='px-3 bg-gray-200 w-full rounded-sm border-none'
                  placeholder='Full Name'
                />
                <Error>{errors.name && touched.name && errors.name}</Error>
                <Button
                  myButton='Continue'
                  className={values.name === '' ? '' : 'bg-blue-500'}
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
