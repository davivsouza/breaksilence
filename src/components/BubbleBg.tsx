import { ImageBackground, ImageBackgroundProps } from "react-native"

type Props = ImageBackgroundProps 

export function BubbleBg({children, ...rest}:Props){
    return (
    <ImageBackground {...rest}/>
    )
}