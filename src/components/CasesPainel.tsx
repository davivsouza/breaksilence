import { VStack, Text, Box, Image, HStack } from "native-base";
import LogoPng from "@assets/quebra_silencio_logo.png"
import CasesSvg from '@assets/cases.svg'
import { useAuth } from "../hooks/useAuth";
import { Loading } from "./Loading";
import { useEffect, useState } from "react";

export function CasesPainel() {
  const { user } = useAuth()
  
  return (
    <Box w="90%" p={4} bg="white" rounded="lg" alignSelf="center" shadow={9} mt={100}>
      {!user.reports && (<Loading/>)}
     {user.reports && (
       <VStack>
       <Image alignSelf="center" source={LogoPng} alt="Quebra de silêncio" />
       <HStack alignItems="center" justifyContent="center" mt={4}>
         <CasesSvg />
         <VStack ml={4} mb={5}>
           <HStack alignItems="center">
             <Box w={3} h={3} rounded="full" bg="green.300" mr={1} />
             <Text fontFamily="body">
               7 casos resolvidos 
             </Text>
           </HStack>
           <HStack alignItems="center">
             <Box w={3} h={3} rounded="full" bg="yellow.300" mr={1} />
             <Text fontFamily="body">{user.reports.length} {user.reports.length > 1 ? 'casos pendentes' : 'caso pendente'}</Text>
           </HStack>

         </VStack>

       </HStack>
     </VStack>
     )}
    </Box>
  )
}