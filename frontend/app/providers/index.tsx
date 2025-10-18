'use client';

import React, { ReactNode } from 'react';
import ReduxProvider from './ReduxProvider';
import { ActionsProvider } from './ActionsProvider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <ActionsProvider>
        {children}
      </ActionsProvider>
    </ReduxProvider>
  );
};
