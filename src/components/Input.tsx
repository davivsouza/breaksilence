import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        borderColor="gray.200"
        borderRadius="md"
        // placeholderTextColor=""
        px={4}
        py={3}
        bg="transparent"
        fontSize="md"
        {...rest}
        _focus={{
          borderColor: "pink.300",
          bg: "transparent",
          borderWidth: 2,
          selectionColor: 'pink.300'
        }}
      />
      <FormControl.ErrorMessage mb={2}>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
