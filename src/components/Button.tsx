import {
  Button as NativeBaseButton,
  IButtonProps,
  Text,
  VStack,
} from "native-base";

type Props = IButtonProps & {
  title: string;
};
export function Button({ title, disabled, ...rest }: Props) {
  return (
    <VStack
      w="60%"
      height={60}
      alignSelf="center"
      rounded="xl"
      mt={8}
      bg="pink.500"
      
    >
      <NativeBaseButton
        _pressed={{ bg: "transparent" }}
        w="full"
        height="full"
        bg="transparent"
        {...rest}
      >
        <Text textAlign="center" fontFamily="body" fontSize="2xl" color="white">
          {title}
        </Text>
      </NativeBaseButton>
    </VStack>
  );
}
