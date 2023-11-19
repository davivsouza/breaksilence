import { Image, VStack, Text, Box } from "native-base"
import { ImageSourcePropType } from "react-native"

type Props = {
  imgSource?: ImageSourcePropType
  title: string
  content: string
}

export function ArticleCard({ content, title, imgSource }: Props) {
  return (
    <Box
      w="full"
      alignSelf="center"
      bg="white"
      rounded="lg"
      position="relative"
      overflow="hidden"
      p={4}
      shadow={2}
    >

      <VStack>
        {imgSource && (
          <Image
            position="absolute"
            resizeMode="cover"
            source={imgSource}
            alt={title}
            w="full"
            h={150}
          />
        )}
        <Text mt={imgSource ? 40 : 0} fontFamily="semiBold" fontSize="md">{title}</Text>
        <Text fontFamily="body" color="gray.200" fontSize="sm" numberOfLines={2}>{content}</Text>
      </VStack>
    </Box>
  )
}