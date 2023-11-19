export function formatPhoneNumber(phoneNumber: string) {
    const cleanedValue = phoneNumber.replace(/\D/g, ''); // Remove caracteres não numéricos

    const formattedValue = cleanedValue.replace(
      /^(\d{2})(\d{5})(\d{4})$/,
      '$1 $2-$3'
    );
  
    return formattedValue;

}
