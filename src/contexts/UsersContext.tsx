import React, { createContext, useState } from "react";
import { User } from "../@types/user";


interface UserContextData {
    users: User[]
}

interface UsersContextProviderProps {
    children: React.ReactNode
}

export const UsersContext = createContext({} as UserContextData)



export function UsersContextProvider({ children }: UsersContextProviderProps) {
    const [users, setUsers] = useState<User[]>([])

    return (
        <UsersContext.Provider value={{ 
            users,
        }}>
            {children}
        </UsersContext.Provider>
    )
}