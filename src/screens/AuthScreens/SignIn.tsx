import { AuthHeader } from "@components/AuthHeader";
import { Button } from "@components/Button";
import { Container } from "@components/Container";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import { HStack, Pressable, ScrollView, Text, useToast } from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { formatCPF } from "@utils/formatCpf";

type SignInFormDataProps = {
  cpf: string;
  password: string;
};

const signInSchema = yup.object({
  cpf: yup
    .string()
    .required("Informe seu CPF")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 dígitos.")
    .required("Informe a senha"),
});

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>();
  const [errorText, setErrorText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const navigation = useNavigation<AuthNavigatorRouteProps>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const { signIn, isLoadingUserStorageData } = useAuth()

  function handleChange(text: string) {
    const formattedCPF = formatCPF(text);
    return formattedCPF
  }


  async function handleSignIn(data: SignInFormDataProps) {

    try {
      setIsSending(true)
      await signIn(data.cpf, data.password)
      setErrorText("")
    } catch (error: any) {

      setErrorText(error.message)

    }finally{
      setIsSending(false)
    }
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} flex={1}>
    
        <Container>
          <AuthHeader
            title="Entrar"
            subtitle="Introduza os seus dados cadastrados para continuar"
          />

          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={3}
                maxLength={14}

                placeholder="CPF"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={text => onChange(handleChange(text))}
                value={value}
                errorMessage={errors.cpf?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"

            render={({ field: { onChange, value } }) => (
              <Input
                mt={3}
                placeholder="Senha"
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignIn)}
                onChangeText={onChange}
                returnKeyType="send"
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          {errorText && <Text my={2} color="red.400">{errorText}</Text>}
          <HStack mt={2} ml={3} >
            <Text color="gray.200" mr={1}>Voce não tem uma conta?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('signUp')
              }}
            >
              <Text
                color="blue.400"

                underline
                textDecorationColor="blue.400"
              >
                Cadastre-se
              </Text>

            </Pressable>
          </HStack>

          {/* {loginTrys === 0 ? (
            <>
              <Text textAlign="center" color="red.500" fontSize="xs" mt={2}>
                Você tentou acessar muitas vezes, tente novamente mais tarde.
              </Text>
              <Button title="Entrar" disabled={true} />
            </>
          ) : (
            <>
              {loginTrys <= 3 && loginTrys >= 1 ? (
                <>
                  <Text textAlign="center" color="red.500" fontSize="xs" mt={2}>
                    Senha Incorreta! {loginTrys}{" "}
                    {loginTrys == 1
                      ? "tentativa restante"
                      : "tentativas restantes"}
                  </Text>
                  <Button title="Entrar" onPress={handleSubmit(handleSignIn)} />
                </>
              ) : (
                <Button
                  title="Entrar"
                  onPress={handleSubmit(handleSignIn)}
                  _pressed={{
                    bg: 'pink.400',
                    rounded: "3xl",
                  }}
                />
              )}
            </>
          )} */}
          <Button
            title="Entrar"
            isLoading={isSending}
            onPress={handleSubmit(handleSignIn)}
            _pressed={{
              bg: 'pink.400',
              rounded: "3xl",
            }}
          />
        </Container>
    </ScrollView>
  );
}
