import { useMemo } from "react";
import { useGlobalContext } from "../../context/global/global-context-hook";
import { getFilteredDetails } from "../../utils";

const Heading = function () {
  const { data, timePeriod } = useGlobalContext();
  const { filteredPrices } = useMemo(() => {
    return getFilteredDetails({
      date: data.date,
      price: data.price,
      timePeriod,
    });
  }, [timePeriod, data]);

  const price =
    filteredPrices.length > 0 ? filteredPrices[filteredPrices.length - 1] : 0;

  return (
    <div className="pb-4">
      <p className="text-2xl font-bold">
        {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        <sup className="text-gray-500 font-normal">USD</sup>
      </p>
      <p className="text-base text-green-700 pt-2">+2,164.42 (3.54%)</p>
    </div>
  );
};

export default Heading;
