import { VStack } from "native-base";
import { BubbleBg } from "./BubbleBg";
import BubbleBgPng from "@assets/bubble-bg.png";
import { Dimensions } from "react-native";
type Props = {
  children: React.ReactNode;
};

export function Container({ children }: Props) {
  return (
    <VStack flex={1} py={90} px={5} position="relative">
      <BubbleBg
        source={BubbleBgPng}
        style={{
          width: Dimensions.get('screen').width,
          height: 950,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {children}
    </VStack>
  );
}
