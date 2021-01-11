import Head from 'next/head';

import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Next JS | Complete</title>
      </Head>
      <Header />
      <div className='container px-4 mx-auto mt-5'>{children}</div>
    </div>
  );
};

export default Layout;
