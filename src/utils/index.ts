export const getFilteredDetails = function ({
  date,
  price,
  timePeriod,
}: {
  date: string[];
  price: string[];
  timePeriod: string;
}): { filteredDates: string[]; filteredPrices: string[] } {
  let sliceLength;
  switch (timePeriod) {
    case "1w":
      sliceLength = 7;
      break;
    case "1m":
      sliceLength = 31;
      break;
    case "6m":
      sliceLength = date.length;
      break;
    case "1y":
      sliceLength = date.length;
      break;
    case "max":
      sliceLength = date.length;
      break;
    default:
      return { filteredDates: [], filteredPrices: [] };
  }

  const filteredDates = date.slice(0, sliceLength);
  const filteredPrices = price.slice(0, sliceLength);

  return { filteredDates, filteredPrices };
};
