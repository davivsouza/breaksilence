import { Box, HStack, Text } from "native-base";
import { Report } from "../@types/report";

type Props = {
    report: Report
}

export function ReportCard({ report }: Props) {
    return (
        <Box w="90%" alignSelf="center" bg="white" shadow={4} pb={5} pt={3} px={5} my={2} rounded="md">
           <HStack alignItems="center" justifyContent="space-between" flex={1}>
           <HStack alignItems="center" space={1}>
                <Text fontFamily={'body'} fontSize="sm" color="gray.600" >Tipo:</Text>
                <Text fontFamily={'body'} fontSize="sm" color="pink.300" textTransform="capitalize">{report.type ? report.type : ' '}</Text>
            </HStack>
                <Text fontFamily={'body'} fontSize="xs" color="gray.400" >{report.date}</Text>

           </HStack>
            <HStack alignItems="center" space={1}>
                <Text fontFamily={'body'} fontSize="sm" color="black" >
                    {!report.description && 'Sem descrição'}
                    {report.description && report.description.trimEnd()}
                </Text>
            </HStack>
            <HStack alignItems="center" space={1}>
                <Box w={2} h={2} rounded="full" bg="orange.300" />
                <Text fontFamily={'body'} fontSize="sm" color="gray.300">{report.status === 'ON WAY' ? 'Caso em andamento' : 'Caso resolvido'}</Text>
            </HStack>
        </Box>
    )
}