import { useGlobalContext } from "../../context/global/global-context-hook";
import { periods } from "../data";

const TimePeriodSelector = () => {
  const { timePeriod, updateTimePeriod } = useGlobalContext();

  return (
    <div className="flex space-x-2 text-xs pb-5 justify-end">
      {periods.map((period) => (
        <button
          key={period}
          className={`py-1 px-3 rounded-md ${
            period === timePeriod ? "bg-blue-500 text-white" : " text-black"
          }`}
          onClick={() => updateTimePeriod(period)}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

export default TimePeriodSelector;
