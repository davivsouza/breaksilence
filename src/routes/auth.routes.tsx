import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Introduction } from "@screens/AuthScreens/Introduction";
import { SignIn } from "@screens/AuthScreens/SignIn";
import { SignUp} from "@screens/AuthScreens//SignUp";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
  introduction: undefined;
};

export type AuthNavigatorRouteProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();
type Props = {
  hasAlreadyTriedToLogin?: boolean
}
export function AuthRoutes({hasAlreadyTriedToLogin}:Props) {
  return (
    <Navigator
    initialRouteName={hasAlreadyTriedToLogin ? 'signIn' : 'introduction'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="introduction" component={Introduction} />
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
