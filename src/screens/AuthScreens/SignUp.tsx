import { AuthHeader } from "@components/AuthHeader";
import { Button } from "@components/Button";
import { Container } from "@components/Container";
import { Input } from "@components/Input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import { HStack, Pressable, ScrollView, Text } from "native-base";
import React, { useState } from "react";
import { formatCPF } from "@utils/formatCpf";
import { useAuth } from "../../hooks/useAuth";
import { Location } from "../../@types/user";

export type SignUpFormDataProps = {
  username: string;
  name: string;
  cpf: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe seu nome completo."),
  cpf: yup
    .string()
    .required("Informe seu CPF")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 dígitos.")
    .required("Informe a senha")
    .matches(/[0-9]/, "Senha deve conter pelo menos 1 número")
    .matches(/[A-Z]/, "Senha deve conter pelo menos 1 letra maiúscula")
    .matches(/\W|_/, "Senha deve conter pelo menos 1 caractere especial"),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais."),
});

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormDataProps>({
    resolver: yupResolver(signUpSchema),
  });
  const { user,signUp, isLoadingUserStorageData } = useAuth()

  function handleChange(text: string) {
    const formattedCPF = formatCPF(text);
    return formattedCPF
  }



  async function handleSignUp(data: SignUpFormDataProps) {
    await signUp({...data, hasAlreadySeenTheIntroduction: true, isLogged: true, reports: [], location: {
      subregion: 'São Caetano do Sul',
      country: 'Brasil',
      street: 'R. Bel Aliance',
      district: 'Jardim Sao Caetano',
      streetNumber: '149',
      region: 'São Paulo'
    } as Location})

    
    
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} flex={1}>
    
        <Container>
          <AuthHeader
            title="Cadastrar"
            subtitle="Parabéns pela sua excelente escolha em se cadastrar em nosso aplicativo! "
          />

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={12}
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={3}
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
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={3}
                placeholder="Confirmar a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />
          <HStack mt={2} ml={3} >
            <Text color="gray.200" mr={1}>Voce já tem uma conta?</Text>
            <Pressable
              onPress={() => {
                navigate('signIn')
              }}
            >
              <Text
                color="blue.400"

                underline
                textDecorationColor="blue.400"
              >
                Entrar
              </Text>

            </Pressable>
          </HStack>

          <Button title="Criar" onPress={handleSubmit(handleSignUp)}
            isLoading={isLoadingUserStorageData}

            _pressed={{
              bg: 'pink.400',
              rounded: "3xl",
            }} />

        </Container>
    
    </ScrollView>
  );
}
