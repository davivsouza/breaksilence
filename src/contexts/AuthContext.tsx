import { createContext, useEffect, useState } from "react";
import { User } from "../@types/user";
import { userStorageGet, userStorageSave } from "../storage/storageUser";

import { Report } from "../@types/report";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: User;
  reports: Report[]
  isLoadingUserStorageData: boolean;
  signIn(cpf: string, password: string): Promise<void>;
  signUp(user: User): Promise<void>;
  signOut(): void;
  userUpdate(userData: User): void;
  sendReport(report: Report): void;
}
export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [reports, setReports]= useState<Report[]>([])
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
  
  function userUpdate(userData: User) {
    setUser(userData);
  }

  async function sendReport(report: Report) {
    const reportsData = [...reports, report]
    await userStorageSave({ ...user, reports: reportsData});
    setReports(reportsData)
  }

  async function signUp(user: User) {
    try {
      setIsLoadingUserStorageData(true);
      setUser(user);
      await userStorageSave(user);
      
      
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(cpf: string, password: string) {
    try {
      const userSignedUp = await userStorageGet();

      if (cpf === userSignedUp.cpf && password === userSignedUp.password) {
        userUpdate({ ...userSignedUp, isLogged: true });
      } else {
        throw Error;
      }
    } catch (error) {
      throw Error("CPF ou senha incorreta, tente novamente.");
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    const logOutUser = user;
    userUpdate({ ...logOutUser, isLogged: false });
    await userStorageSave({ ...logOutUser, isLogged: false });
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);
      const userLogged : User = await userStorageGet();

      if (userLogged) {
        userUpdate(userLogged);
        setReports(userLogged.reports)

      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        isLoadingUserStorageData,
        signOut,
        userUpdate,
        sendReport,
        reports
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
