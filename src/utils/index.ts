export const getFilteredDetails = function ({
  date,
  price,
  timePeriod,
}: {
  date: string[];
  price: string[];
  timePeriod: string;
}): { filteredDates: string[]; filteredPrices: string[] } {
  const reversedDate = date.reverse();
  const reversedPrice = price.reverse();

  let sliceLength;
  switch (timePeriod) {
    case "1w":
      sliceLength = 7;
      break;
    case "1m":
      sliceLength = 31;
      break;
    case "6m":
      sliceLength = reversedDate.length;
      break;
    case "1y":
      sliceLength = reversedDate.length;
      break;
    case "max":
      sliceLength = reversedDate.length;
      break;
    default:
      return { filteredDates: [], filteredPrices: [] };
  }

  const filteredDates = reversedDate.slice(0, sliceLength);
  const filteredPrices = reversedPrice.slice(0, sliceLength);

  return { filteredDates, filteredPrices };
};
