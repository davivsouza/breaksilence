import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      {isLoadingUserStorageData && <Loading />}
      {!isLoadingUserStorageData && (
        <NavigationContainer>
          {user.isLogged ? (
            <AppRoutes />
          ) : (
            <AuthRoutes
              hasAlreadyTriedToLogin={user.hasAlreadySeenTheIntroduction}
            />
          )}
        </NavigationContainer>
      )}
    </>
  );
}
