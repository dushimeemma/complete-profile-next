import Link from 'next/link';

import ActiveLink from './ActiveLink';

const Header = () => {
  const arrowClass = 'nav-arrow m-5';

  return (
    <div className='p-2 flex'>
      <span className='flex-1'>
        <Link href='/'>
          <h1 className='cursor-pointer font-bold text-color ml-5 logo'>
            eShuri
          </h1>
        </Link>
      </span>
      <span className='flex-1 flex'>
        <ActiveLink href='/'>
          <a className='flex-1  mr-5 nav-link'>
            Your Profile <span className={arrowClass}>&gt;</span>
          </a>
        </ActiveLink>
        <ActiveLink href='/school'>
          <a className='flex-1  mr-5 nav-link'>
            School Setup <span className={arrowClass}>&gt;</span>
          </a>
        </ActiveLink>
        <ActiveLink href='/stuff'>
          <a className='flex-1  mr-5 nav-link'>
            Invite Staff <span className={arrowClass}>&gt;</span>
          </a>
        </ActiveLink>
        <ActiveLink href='/students'>
          <a className='flex-1  mr-5 nav-link'>
            Invite Students <span className={arrowClass}>&gt;</span>
          </a>
        </ActiveLink>
        <ActiveLink href='/classes'>
          <a className='flex-1  mr-5 nav-link'>Add Classes </a>
        </ActiveLink>
      </span>
    </div>
  );
};

export default Header;
