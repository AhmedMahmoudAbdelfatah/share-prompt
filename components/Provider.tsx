"use client";
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type ProviderType = {
  children: ReactNode,
}

const Provider = ({children}: ProviderType) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider