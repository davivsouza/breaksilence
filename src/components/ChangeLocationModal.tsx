import { Modal, View, Pressable, useTheme, HStack, Text, Input, VStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { Location} from '../@types/user';
import { userStorageSave } from '../storage/storageUser';
type Props = {
    isOpen: boolean
    onCloseModal(): void
}


export function ChangeLocationModal({ isOpen, onCloseModal }: Props) {
    const { colors } = useTheme()
    const { user, userUpdate } = useAuth()
    const [rua, setRua] = useState(user.location.street)
    const [numero, setNumero] = useState(user.location.streetNumber)
    const [bairro, setBairro] = useState(user.location.district)
    const [cidade, setCidade] = useState(user.location.subregion)
    const [estado, setEstado] = useState(user.location.region)
    const [isSaving, setIsSaving] = useState(false)

    async function handleUpdateLocation() {
        try {
            setIsSaving(true)
            const location: Location = {
                ...user.location,
                street: rua,
                streetNumber: numero,
                district: bairro,
                subregion: cidade,
                region: estado

            }
            userUpdate({ ...user, location })
            await userStorageSave({ ...user, location });
        } catch (error) {
            return
        } finally {
            setIsSaving(false)
            onCloseModal()
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            px={4}

        >
            <View p={4} bg="white" rounded="xl" w={Dimensions.get('screen').width - 20}>
                <Pressable onPress={onCloseModal} alignSelf="flex-end">
                    <AntDesign name="close" size={24} color={colors.gray[300]} />
                </Pressable>
                <Text color="pink.500" fontFamily="semiBold" fontSize="lg" textAlign="center" mb={8}>
                    Configurar localização atual
                </Text>
                <HStack w="full" space={3} >
                    <VStack flex={2}>
                        <Text color="gray.200" fontSize="sm">Rua</Text>

                        <Input

                            value={rua || ''}
                            px={4}
                            py={3}
                            bg="transparent"
                            fontSize="md"
                            _focus={{
                                borderColor: "pink.300",
                                bg: "transparent",
                                borderWidth: 2,
                                selectionColor: 'pink.300'
                            }}
                            onChangeText={setRua}
                        />
                    </VStack>

                </HStack>


                <HStack w="full" space={3}>
                    <VStack flex={2}>
                        <Text color="gray.200" fontSize="sm">Bairro</Text>

                        <Input
                            value={bairro || ''}
                            px={4}
                            py={3}
                            bg="transparent"
                            fontSize="md"
                            _focus={{
                                borderColor: "pink.300",
                                bg: "transparent",
                                borderWidth: 2,
                                selectionColor: 'pink.300'
                            }}
                            onChangeText={setBairro}
                        />
                    </VStack>



                </HStack>
                <HStack w="full" space={3}>
                  
                    <VStack flex={1}>
                        <Text color="gray.200" fontSize="sm">Número</Text>

                        <Input
                            flex={1}
                            value={numero || ''}
                            px={4}
                            py={3}
                            keyboardType='number-pad'
                            bg="transparent"
                            fontSize="md"
                            _focus={{
                                borderColor: "pink.300",
                                bg: "transparent",
                                borderWidth: 2,
                                selectionColor: 'pink.300'
                            }}
                            onChangeText={setNumero}
                        />
                    </VStack>
                    <VStack flex={1}>
                        <Text color="gray.200" fontSize="sm">Cidade</Text>

                        <Input
                            value={cidade || ''}
                            px={4}
                            py={3}
                            bg="transparent"
                            fontSize="md"
                            _focus={{
                                borderColor: "pink.300",
                                bg: "transparent",
                                borderWidth: 2,
                                selectionColor: 'pink.300'
                            }}
                            onChangeText={setCidade}
                        />
                    </VStack>
                    <VStack flex={2}>
                        <Text color="gray.200" fontSize="sm">Estado</Text>
                        <Input
                            value={estado || ''}
                            px={4}
                            py={3}
                            bg="transparent"
                            fontSize="md"
                            _focus={{
                                borderColor: "pink.300",
                                bg: "transparent",
                                borderWidth: 2,
                                selectionColor: 'pink.300'
                            }}
                            onChangeText={setEstado}
                        />
                    </VStack>
                </HStack>

                <HStack alignSelf="flex-end" mt={3} space={3}>

                    <Pressable p={2} onPress={onCloseModal}>
                        <Text fontSize="lg" fontFamily="body" color="red.500">Cancelar</Text>
                    </Pressable>
                    <Pressable px={5} py={2} bg="pink.500" rounded="xl" onPress={handleUpdateLocation} _pressed={{
                        bg: 'pink.300',

                    }}>
                        <Text fontSize="lg" fontFamily="body" color="white">Salvar</Text>
                    </Pressable>
                </HStack>
            </View>
        </Modal>
    );
}