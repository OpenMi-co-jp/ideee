import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/lib/generated/client';

export const UserProfileContext = createContext<User | undefined>(undefined);

type UserProviderProps = {
    children: ReactNode;
    user: User;
};


export function UserProvider({ children, user}: UserProviderProps) {
    return <UserProfileContext.Provider value={user}>{children}</UserProfileContext.Provider>
}

export function useUser() {
    const context = useContext(UserProfileContext);
    if(!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}