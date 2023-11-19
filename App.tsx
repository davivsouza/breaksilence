import { NativeBaseProvider } from "native-base";
import { Loading } from "@components/Loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import { THEME } from "./src/theme";
import { Routes } from "@routes/index";
import { AuthContextProvider } from "./src/contexts/AuthContext";
export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  

  return (
    <NativeBaseProvider theme={THEME} >
      {!fontsLoaded && <Loading/>}
      {fontsLoaded &&
        (
            <AuthContextProvider>
                <Routes />
            </AuthContextProvider>
        ) 
      }
    </NativeBaseProvider>
  );
}
