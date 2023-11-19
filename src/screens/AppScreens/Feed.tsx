import { BubbleBg } from "@components/BubbleBg";
import { VStack, Text, ScrollView } from "native-base";
import { ArticleCard } from "@components/ArticleCard";
import BgFeedPng from "@assets/bg-feed.png";
import ArticleTemplateJpg from "@assets/article_template.jpg";
import ArticleTemplateDois from "@assets/article_template2.jpeg";
import {  Dimensions, TouchableOpacity } from "react-native";
import { CasesPainel } from "@components/CasesPainel";

export function Feed() {

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <BubbleBg
          source={BgFeedPng}
          style={{
            width: Dimensions.get("screen").width,
            height: 370,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        <CasesPainel />
        <VStack mt={130} px={5} pb={120}>
          <Text fontFamily="semiBold" fontSize="2xl" ml={2} mb={8}>
            Artigos para se informar
          </Text>
        
          <TouchableOpacity >
            <ArticleCard
              title="Como funciona a Lei Maria da Penha?"
              content="A Lei Maria da Penha é uma lei federal brasileira, cujo objetivo principal é estipular punição adequada e coibir atos de violência doméstica contra a mulher."
              imgSource={ArticleTemplateJpg}
            />
          </TouchableOpacity>
          <TouchableOpacity  style={{marginTop: 16}}>
            <ArticleCard
              title="Fortalecendo Mulheres: O Poder da Autodefesa e a Construção da Segurança Pessoal"
              content="Explora-se a necessidade crucial de as mulheres se sentirem capacitadas e seguras, abordando técnicas e estratégias acessíveis para fortalecer a segurança pessoal."
              imgSource={ArticleTemplateDois}
            />
          </TouchableOpacity>
        </VStack>
      </ScrollView>
    );
  }

