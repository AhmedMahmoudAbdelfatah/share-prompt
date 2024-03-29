"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className=' flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt='logo' width={30} height={30} className='object-contain' />
        <p className='logo_text'>Prompts</p>
      </Link>
      {/* Desktop Navigation  */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-post' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={() => signOut()} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile' className='cursor-pointer'>
              <Image
                src={session.user.image ?? '/assets/images/logo.svg'}
                width={35}
                height={35}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ): (
          <button
            type='button'
            onClick={() => signIn("auth0")}
            className='black_btn'
          >
            Sign in
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex cursor-pointer'>
            <Image
              src={session.user.image ?? 'assets/images/logo.svg'}
              width={35}
              height={35}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(prev => !prev)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-post'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (    
          <button
            type='button'
            onClick={() => {
              signIn("auth0");
            }}
            className='black_btn'
          >
            Sign in
          </button>
        )}
        </div>
    </nav>
  )
}

export default Nav