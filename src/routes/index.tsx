import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box } from "native-base";
import { StatusBar } from "expo-status-bar";

export function Routes() {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </>
  );
}
