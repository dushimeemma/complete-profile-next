import Layout from './Layout';

const Label = ({ children }) => {
  return (
    <label className='block mb-5 capitalize text-black text-sm label'>
      {children}
    </label>
  );
};
export default Label;
