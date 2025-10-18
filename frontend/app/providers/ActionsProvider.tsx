'use client';

import { createContext, useContext } from 'react';
import * as serverActions from '@/app/actions';

const ActionsContext = createContext(serverActions);

export function ActionsProvider({ children }: { children: React.ReactNode }) {
  return (
    <ActionsContext.Provider value={serverActions}>
      {children}
    </ActionsContext.Provider>
  );
}

export const useServerActions = () => useContext(ActionsContext);