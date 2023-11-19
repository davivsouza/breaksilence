import { CasesPainel } from "@components/CasesPainel";
import { ReportCard } from "@components/ReportCard";
import { Center, FlatList, Text, VStack } from "native-base";
import { useAuth } from "../../hooks/useAuth";
export function ReportsHistory() {
   const { user } = useAuth()
   
   return (
      <VStack >
         <CasesPainel />
         <FlatList
         mt={12}
            height="80%"
            showsVerticalScrollIndicator={false}
            data={user.reports}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
               <ReportCard report={item} />
            )}
            ListEmptyComponent={() => (
               <Center flex={1} px={5}>
                  <Text mb={2} textAlign="center" color="gray.400" fontSize="lg" fontFamily="semiBold">Nenhuma denúncia realizada ainda.</Text>
                  <Text textAlign="center" fontSize="sm" fontFamily="body" color="gray.300">Se estiver passando por problemas não tenha medo e denuncie!</Text>
               </Center>
            )}
            contentContainerStyle={{
               paddingBottom: 300,
            }}
         />

      </VStack>
   )
}