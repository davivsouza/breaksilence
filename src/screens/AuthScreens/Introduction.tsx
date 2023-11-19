import { Image, Text } from "native-base";
import { Button } from "@components/Button";
import { useNavigation} from "@react-navigation/native";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import WomenFlatPng from "@assets/women_flat.png";
import { Container } from "@components/Container";

export function Introduction() {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>();



  return (
    <Container>
      <Image
        source={WomenFlatPng}
        marginTop="48%"
        alignSelf="center"
        alt="Grupo de mulheres reunidas"
      />
      <Text
        textAlign="center"
        color="black"
        fontFamily="heading"
        fontSize="xl"
        mt={10}
        mb={3}
      >
        Bem vindo ao Quebra de Silêncio
      </Text>
      <Text textAlign="center" color="gray.300" fontSize="md" marginBottom={20}>
        A sua segurança é a nossa prioridade. Não fique em silêncio. Denuncie
        e proteja-se. Estamos aqui para ajudá-la a dar o primeiro passo.
      </Text>

      <Button title="Avançar" onPress={() => navigate('signUp')} />
    </Container>
  );
}
