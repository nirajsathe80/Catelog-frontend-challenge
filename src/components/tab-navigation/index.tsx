import { Tabs } from "../data/index";
import { useGlobalContext } from "../../context/global/global-context-hook";

const TabNavigation = () => {
  const { currentTab, updateCurrentTab } = useGlobalContext();
  return (
    <nav className="xsm:text-sm text-[10px] font-medium text-center text-gray-500 border-b border-gray-200  ">
      <ul className="flex flex-wrap -mb-px">
        {Tabs.map((tab) => {
          const { label, value } = tab;
          return (
            <li className="me-2" key={value}>
              <div
                className={`inline-block sm:p-4 p-1  rounded-t-lg  cursor-pointer ${
                  value === currentTab
                    ? "text-black border-blue-400 z-10 border-b-2 "
                    : ""
                }   `}
                onClick={() => updateCurrentTab(value)}
              >
                {label}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TabNavigation;
