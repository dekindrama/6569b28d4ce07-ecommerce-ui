export default function CurrencyFormat(number: number) {
  //* convert to currency
  let formattedNumber = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

  //* remove decimal
  formattedNumber = formattedNumber.replace(",00", "");

  //* return formatted data
  return formattedNumber;
}
