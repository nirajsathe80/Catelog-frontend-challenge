import { useMemo } from "react";
import TabNavigation from "../../components/tab-navigation";
import Chart from "../../components/charts";
import Summary from "../../components/summery";
import Heading from "../../components/heading";
import { getFilteredDetails } from "../../utils";
import { useGlobalContext } from "../../context/global/global-context-hook";
import Analysis from "../../components/analysis";

const Homepage = function () {
  const { currentTab, timePeriod, data, loading } = useGlobalContext();

  const { filteredDates, filteredPrices } = useMemo(() => {
    return getFilteredDetails({
      date: data.date,
      price: data.price,
      timePeriod,
    });
  }, [timePeriod, data]);

  return (
    <div className="sm:h-[90vh] h-max w-[90vw] p-6 rounded-xl bg-white">
      <Heading />
      <TabNavigation />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {currentTab === "chart" && (
            <Chart dates={filteredDates} price={filteredPrices} />
          )}
          {currentTab === "summary" && <Summary />}
          {currentTab === "analysis" && <Analysis />}
          {currentTab === "statistics" && <Analysis />}
          {currentTab === "settings" && <Analysis />}
        </>
      )}
    </div>
  );
};

export default Homepage;
