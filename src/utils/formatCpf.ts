export function formatCPF(value: string) {
   if(value){
     // Remove todos os caracteres não numéricos
     const cleanedValue = value.replace(/\D/g, "");

     // Aplica a formatação (XXX.XXX.XXX-XX)
     const formattedValue = cleanedValue.replace(
       /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
       "$1.$2.$3-$4"
     );
     return formattedValue;
   }

   return " "
}
