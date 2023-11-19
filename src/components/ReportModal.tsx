import { Alert, Modal } from 'react-native'
import { Box, HStack, Pressable, StatusBar, Text, VStack, useTheme, PresenceTransition, TextArea } from 'native-base'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ReportSvg from '@assets/report.svg'
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { Report } from '../@types/report';

import { Loading } from './Loading';

type Props = {
  isModalVisible: boolean
  isReportSent: boolean
  sendingReport: boolean
  onCloseModal: () => void
  onSendReport: (report: Report) => void
}

export function ReportModal({ isModalVisible, isReportSent, onCloseModal, onSendReport,sendingReport }: Props) {
  const { colors } = useTheme()
  const { user } = useAuth()
  const [description, setDescription] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<'abuso' | 'assédio'  | null>(null)

  function handleSendReport() {
    if(selectedMessage === null){
      Alert.alert(
        'Precisamos saber o motivo!',
        'Selecione uma das mensagens rápidas',
        [{ text: 'OK'}],
        { cancelable: false }
      );
    }else{
      const dataAtual = new Date();

      // Função para adicionar um zero à esquerda se o número for menor que 10
      const adicionarZero = (num: number) => (num < 10 ? `0${num}` : num);
    
      // Obtém o dia, mês, ano, hora, minuto e segundo
      const dia = adicionarZero(dataAtual.getDate());
      const mes = adicionarZero(dataAtual.getMonth() + 1); // Mês começa do zero
      const ano = dataAtual.getFullYear();
      const hora = adicionarZero(dataAtual.getHours());
      const minuto = adicionarZero(dataAtual.getMinutes());
    
      // Formata a data no formato brasileiro
      const dataFormatada = `${hora}:${minuto} - ${dia}/${mes}/${ano} `;

      const reportData: Report = {
        id: Math.floor(Math.random() * 1238912),
        description: description,
        status: 'ON WAY',
        type: selectedMessage,
        date: dataFormatada
      }
  
      onSendReport(reportData)
      setDescription('')
      setSelectedMessage(null)
    }
  }

  function onSelectMessage(msg: 'abuso' | 'assédio') {
    if (msg === selectedMessage) {
      setSelectedMessage(null)
    } else {
      setSelectedMessage(msg)
    }

  }

 
  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType='slide'
      onRequestClose={onCloseModal}

    >
      <Box w="full" flex={1} bg="rgba(0,0,0,0.3)" justifyContent="center" alignItems="center" >
        <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
        <VStack w="80%" min-h={350} bg="white" rounded="xl" shadow={5} px={6} py={8} alignItems="center" position="relative">
          <Pressable
            p={2}
            position="absolute"
            top={3} right={3}
            onPress={onCloseModal}
            alignSelf="flex-end"
          >
            <Ionicons name="close" size={20} color={colors.gray[300]} />
          </Pressable>
          {sendingReport && <Loading/>}
          {isReportSent ? (
            <PresenceTransition visible={isReportSent} initial={{
              opacity: 0,
              scale: 0
            }} animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 250
              }
            }}

            >
              <Text fontFamily="semiBold" fontSize="2xl" color="pink.500" >Denúncia Enviada!</Text>
              <VStack alignItems="center" justifyContent="center" h={250}>
                <MaterialCommunityIcons name="police-badge-outline" size={90} color={colors.pink[500]} />
                <Text mt={4} color="gray.500" fontFamily="body" fontSize="lg" textAlign="center">As autoridades estão à caminho!</Text>
              </VStack>
            </PresenceTransition>
          ) : (
            <>
              <HStack alignItems="center" justifyContent="center">
                <Text color="pink.300" fontFamily="heading" fontSize="2xl">DENUNCIE!</Text>
                <ReportSvg fill={colors.pink[300]} width={30} height={30} style={{ marginBottom: 4 }} />
              </HStack>
              <Text color="gray.300" fontFamily="body" fontSize="md" textAlign="center">Selecione uma  mensagem pronta ou descreva se quiser.</Text>
              <HStack alignItems="center" mt={5} >
                <Pressable
                  onPress={() => onSelectMessage('abuso')}
                  flex={1} justifyContent="center"
                  alignItems="center"
                  bg={selectedMessage === 'abuso' ? 'pink.300' : 'white'}
                  shadow={5}
                  mr={4}
                  p={4}
                  rounded="md"

                >
                  <Text color={selectedMessage === 'abuso' ? 'white' : 'black'} fontFamily="heading" fontSize="lg">ABUSO</Text>
                </Pressable>
                <Pressable
                  onPress={() => onSelectMessage('assédio')}
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  bg={selectedMessage === 'assédio' ? 'pink.300' : 'white'}
                  shadow={5}
                  p={4}
                  rounded="md"
                >
                  <Text color={selectedMessage === 'assédio' ? 'white' : 'black'} fontFamily="heading" fontSize="lg">ASSÉDIO</Text>
                </Pressable>
              </HStack>

              <TextArea
                w="full"
                h={20}
                rounded="md"
                color="black"
                bg="transparent"
                borderWidth={2}
                borderColor="gray.200"
                placeholder="Adicionar uma descrição"
                placeholderTextColor="gray.200"
                fontSize="md"
                fontFamily="body"
                my={4}
                p={4}
                onChangeText={setDescription}
                autoCompleteType="off"
                _focus={{
                  bg: "transparent",
                  borderColor: 'pink.300',
                  _android: {
                    selectionColor: 'pink.300'
                  }
                }}
              />
              <HStack mt={3} mb={1} alignItems="flex-start">
                <Ionicons name="location-sharp" size={15} color={colors.gray[300]} style={{ marginTop: 4 }} />
                <Text color="gray.300" fontFamily="body" fontSize="sm" ml={1}>
                  {user.location.street !== undefined ? `${user.location.street}, ${user.location.streetNumber} - ${user.location.district}, ${user.location.subregion} - ${user.location.region}` : 'Procurando localização..'}
                </Text>
              </HStack>
              <Pressable
                w="70%"
                mt={6}
                justifyContent="center"
                alignItems="center"
                bg="pink.300"
                shadow={2}
                p={4}
                rounded="lg"
                onPress={handleSendReport}
                _pressed={{
                  bg: 'pink.400'
                }}
              >
                <Text color="white" fontFamily="body" fontSize="md">Enviar denúncia!</Text>
              </Pressable>
            </>

          )}
        </VStack>
      </Box>

    </Modal>
  )
}