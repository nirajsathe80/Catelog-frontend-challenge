import { useMemo } from "react";
import { useGlobalContext } from "../../context/global/global-context-hook";
import { getFilteredDetails } from "../../utils";

const Summary = () => {
  const { data, timePeriod } = useGlobalContext();
  const { filteredPrices } = useMemo(() => {
    return getFilteredDetails({
      date: data.date,
      price: data.price,
      timePeriod,
    });
  }, [timePeriod, data]);

  const price =
    filteredPrices.length > 0 ? filteredPrices[filteredPrices.length - 1] : "0";

  return (
    <div className="flex justify-center p-4 rounded-md mt-4">
      <div>
        <p className="text-2xl font-bold">
          Current Price: {price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          <sup className="text-gray-500 font-normal"> USD</sup>
        </p>
        <p className="text-base text-green-700 pt-2">
          Ratio: +2,164.42 (3.54%)
        </p>
      </div>
    </div>
  );
};

export default Summary;
