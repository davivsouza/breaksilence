import { UsersContext } from "@contexts/UsersContext";
import { useContext } from "react";

export function useUsers(){
    const context = useContext(UsersContext)
    return context
}