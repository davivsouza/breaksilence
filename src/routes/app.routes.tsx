import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import HomeSvg from "@assets/home.svg";
import ProfileSvg from "@assets/profile.svg";
import ReportSvg from "@assets/report.svg";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { Box, Pressable, Text, VStack, useTheme } from "native-base";
import { Feed } from "@screens/AppScreens/Feed";
import { Profile } from "@screens/AppScreens/Profile";
import { ReportsHistory } from "@screens/AppScreens/ReportsHistory";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { Report } from "../@types/report";
import { ReportModal } from "@components/ReportModal";

type AppRoutes = {
  Perfil: undefined;
  Home: undefined;
  ReportsHistory: undefined;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export type AppNavigatorRouteProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors } = useTheme();

  const [visible, setVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReportSent, setIsReportSent] = useState(false);
  const [isSendingReport, setIsSendingReport] = useState(false);

  const { navigate } = useNavigation<AppNavigatorRouteProps>();
  const { sendReport } = useAuth();

  function openModal() {
    setIsModalVisible(true);
  }
  function closeModal() {
    setIsModalVisible(false);
    setIsReportSent(false);
  }

  async function handleCallNotification() {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Denúncia Enviada🚓",
        body: "Sua denúncia foi enviada, autoridades à caminho!",
      },
      trigger: {
        seconds: 3,
      },
      identifier: "QuebraDeSilencioRemider",
    });
  }
  async function sendReportToThePolice(report: Report) {
    try {
      setIsSendingReport(true);
      handleCallNotification();
      sendReport(report);
    } catch (error) {
      return
    } finally {
      setIsSendingReport(false);
      setIsModalVisible(false);
    }
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      //Whenever keyboard did show make it don't visible
      setVisible(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setVisible(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <>
      <ReportModal
        isModalVisible={isModalVisible}
        isReportSent={isReportSent}
        onCloseModal={closeModal}
        onSendReport={sendReportToThePolice}
        sendingReport={isSendingReport}
      />
      <Navigator
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            display: visible ? "flex" : "none",
            width: 280,
            height: 70,
            left: "15%",
            justifyContent: "space-around",
            backgroundColor: "white",
            zIndex: 1,
            borderRadius: 15,
            elevation: 10,
            bottom: 20,
          },
        }}
        initialRouteName="Home"
      >
        <Screen
          name="Home"
          component={Feed}
          options={{
            tabBarIcon: ({ focused }) => (
              <VStack position="relative">
                <HomeSvg
                  fill={focused ? colors.pink[500] : colors.gray[300]}
                  width={30}
                  height={30}
                />
                <Text
                  textAlign="center"
                  color={focused ? colors.pink[500] : colors.gray[300]}
                  fontSize="xs"
                >
                  Home
                </Text>
              </VStack>
            ),
          }}
        />

        <Screen
          name="report_alert"
          component={Feed}
          options={{
            tabBarIcon: ({ focused }) => (
              <Pressable
                width={20}
                height={20}
                bg="pink.500"
                rounded="full"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                pb={2}
                shadow={5}
                bottom={2}
                onPress={openModal}
              >
                <ReportSvg fill="white" />
              </Pressable>
            ),
          }}
        />

        <Screen
          name="Perfil"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <VStack position="relative">
                <ProfileSvg
                  fill={focused ? colors.pink[500] : colors.gray[300]}
                />
                <Text
                  textAlign="center"
                  color={focused ? colors.pink[500] : colors.gray[300]}
                  fontSize="xs"
                >
                  Perfil
                </Text>
              </VStack>
            ),
          }}
        />

        <Screen
          name="ReportsHistory"
          component={ReportsHistory}
          options={{
            tabBarButton: () => null,
          }}
        />
      </Navigator>
    </>
  );
}
