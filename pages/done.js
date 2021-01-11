import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import Button from '../components/FormButton';
import Icon from '../components/Icon';
import Label from '../components/CardLabel';
import Title from '../components/CardTitle';
import { profileRef } from './school';

const Done = () => {
  const [name, setName] = useState('');
  const getData = async () => {
    const data = await profileRef.get();
    if (data.data()) {
      setName(data.data().name);
    }
  };
  getData();

  return (
    <>
      <div className='p-3 flex'>
        <span className='flex-1'>
          <Link href='/'>
            <h1 className='cursor-pointer font-bold text-color ml-5 logo'>
              eShuri
            </h1>
          </Link>
        </span>
        <span className='flex-1 flex'></span>
      </div>
      <div className='text-center m-auto p-4 mt-5 shadow-md w-3/5'>
        <Icon url='/done.png' alt='done' />

        <Title myTitle='Your School is All SetUp' />

        <Label>
          Congrats {name} You are Fully setup Always High School
          <br />
          You can now Proceed to your dashboard
        </Label>
        <Button
          myButton='Continue To dashboard'
          className='px-3 bg-blue-500 border-none rounded text-white'
          onClick={() => {
            localStorage.removeItem('id');
            Router.push('/');
          }}
        />
      </div>
    </>
  );
};

export default Done;
