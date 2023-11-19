import { VStack, Text, Image, HStack, Box, ScrollView, Input as NativeBaseInput, Pressable, useTheme } from "native-base";
import { Button } from "@components/Button";
import { BubbleBg } from "@components/BubbleBg";
import { Input } from "@components/Input";
import BgFeedPng from "@assets/bg-feed.png"
import { Alert, Dimensions } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState, useRef } from "react";
import { Loading } from "@components/Loading";
import { userStorageSave } from "@storage/storageUser";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatPhoneNumber } from "@utils/formatPhoneNumber";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRouteProps } from "@routes/app.routes";
import { ChangeLocationModal } from "@components/ChangeLocationModal";


type UpdateUserDataFormDataProps = {
  tel: string | undefined;
};

const updateUserSchema = yup.object({
  tel: yup.string().matches(/^\d{2}\ \d{5}-\d{4}$/, 'O número de telefone não é válido'),

});


export function Profile() {
  const { user, signOut, userUpdate } = useAuth()
  const { colors } = useTheme()
  const [errorText, setErrorText] = useState('')
  const [isLoadingLocationData] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const navigation = useNavigation<AppNavigatorRouteProps>()

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserDataFormDataProps>({
    resolver: yupResolver(updateUserSchema),
  });

  function handleChangePhoneNumber(text: string) {
    const formattedPhonenumber = formatPhoneNumber(text)
    return formattedPhonenumber
  }


  async function updateUserData(data: UpdateUserDataFormDataProps) {
    try {
      setIsSending(true)
      userUpdate({ ...user, tel: data.tel })
      await userStorageSave({ ...user, tel: data.tel })

    } catch (error: any) {
      setErrorText(error.message)
    } finally {
      setIsSending(false)
    }
  }



  return (
    <>
      {isLoadingLocationData ? <Loading /> : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
        >
          <BubbleBg
            source={BgFeedPng}
            style={{
              width: Dimensions.get('screen').width,
              height: 370,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />



          <HStack alignItems="center" justifyContent="center" mt={100}>
           
            <Box width={Dimensions.get('screen').width - 30} bg="white" p={4} rounded="lg" >
              <VStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text w={220} color="black" fontSize="md" fontFamily="body" textBreakStrategy="balanced" lineBreakMode="clip" numberOfLines={2}>
                    {user.name}
                  </Text>
                  <Text color="gray.300" fontSize="xs" fontFamily="body">
                    CPF: {user.cpf}
                  </Text>
                </HStack>

                <Text color="gray.300" fontFamily="body" fontSize="sm" >
                  {user.location.street !== undefined ? `${user.location.street}, ${user.location.streetNumber} - ${user.location.district}, ${user.location.subregion} - ${user.location.region}` : 'Localização não definida'}
                </Text>
                <HStack alignItems="center" mt={2}>
                  <FontAwesome name="phone" size={15} color={colors.gray[300]} />
                  <Text color="gray.300" fontFamily="body" fontSize="xs" ml={1}>{user.tel ? user.tel : 'Telefone não cadastrado'}</Text>
                </HStack>
              </VStack>

            </Box>
          </HStack>

          <Pressable ml={8} mt={6} w={240} py={2} rounded="xl" onPress={() => navigation.navigate('ReportsHistory')}>
            <HStack alignItems="center" space={2}>
              <MaterialIcons name="history" size={24} color="white" />
              <Text color="white" fontFamily="semiBold">Ver histórico de denúncias</Text>
            </HStack>
          </Pressable>

          <Pressable ml={8} mb={10} w={240} py={2} rounded="xl" onPress={signOut}>
            <HStack alignItems="center" space={2}>
              <Ionicons name="exit-outline" size={24} color="white" />
              <Text color="white" fontFamily="semiBold">Sair</Text>
            </HStack>
          </Pressable>





          <VStack px={5} pb={120}>
            
    

            <HStack alignItems="center" mt={8} space={1}>
              <Text color="black" fontSize="sm" fontFamily="body" >Telefone</Text>
            </HStack>

            <Controller
              control={control}
              name="tel"
              render={({ field: { onChange, value = user.tel ? formatPhoneNumber(user.tel!!) : '' } }) => (
                <Input
                  mt={3}
                  maxLength={15}
                  value={value}
                  placeholder="(11) 99999-9999"
                  borderColor="black"
                  keyboardType="phone-pad"
                  onChangeText={text => onChange(handleChangePhoneNumber(text))}
                  errorMessage={errors.tel?.message}
                />

              )}
            />
            {errorText && <Text my={2} color="red.400">{errorText}</Text>}

  
            <Pressable my={4} onPress={openModal}>
              <Text color="pink.500" fontSize="md">Configurar localização</Text>
            </Pressable>
            <Button
              isLoading={isSending}
              title="Salvar"
              bg="pink.500"
              rounded="xl"
              _pressed={{
                bg: 'pink.400',
                rounded: "xl",
              }}
              onPress={handleSubmit(updateUserData)}
            />
          </VStack>
         
          <ChangeLocationModal onCloseModal={closeModal} isOpen={isOpenModal} />
        </ScrollView>
      )}
    </>

  )
}