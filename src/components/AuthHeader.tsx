import { Heading, Image, Text, VStack } from "native-base";
import LogoPng from "@assets/quebra_silencio_logo.png";
type Props = {
  title: string;
  subtitle: string;
};
export function AuthHeader({ subtitle, title }: Props) {
  return (
    <VStack  mt="10%">
      <Heading
        textAlign="center"
        color="white"
        fontFamily="semiBold"
        fontWeight="semibold"
        fontSize="5xl"
        mb={2}
      >
        {title}
      </Heading>
      <Text
        textAlign="center"
        mx="auto"
        color="white"
        fontFamily="body"
        fontSize="sm"
        w="80%"
      >
        {subtitle}
      </Text>

      <Image
        source={LogoPng}
        alt="Quebra de Silêncio"
        alignSelf="center"
        mt="30%"
      />
    </VStack>
  );
}
