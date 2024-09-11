import React, { createContext, useEffect, useReducer } from "react";
import { fetchData } from "../../services";

export interface Data {
  price: string[];
  date: string[];
}

interface InitialState {
  currentTab: string;
  loading: boolean;
  timePeriod: string;
  data: Data;
}

interface GlobalContextValue {
  updateLoading: (value: boolean) => void;
  currentTab: string;
  loading: boolean;
  updateCurrentTab: (value: string) => void;
  updateTimePeriod: (value: string) => void;
  timePeriod: string;
  data: Data;
}

enum GlobalEnums {
  UPDATE_LOADING = "UPDATE_LOADING",
  UPDATE_CURRENT_TAB = "UPDATE_CURRENT_TAB",
  UPDATE_TIME_PERIOD = "UPDATE_TIME_PERIOD",
  UPDATE_DATA = "UPDATE_DATA",
}

const { UPDATE_CURRENT_TAB, UPDATE_LOADING, UPDATE_TIME_PERIOD, UPDATE_DATA } =
  GlobalEnums;

const initialState: InitialState = {
  currentTab: "chart",
  loading: false,
  timePeriod: "1w",
  data: {
    date: [],
    price: [],
  },
};

type GlobalAction =
  | { type: GlobalEnums.UPDATE_LOADING; payload: { loading: boolean } }
  | { type: GlobalEnums.UPDATE_CURRENT_TAB; payload: { currentTab: string } }
  | { type: GlobalEnums.UPDATE_TIME_PERIOD; payload: { timePeriod: string } }
  | {
      type: GlobalEnums.UPDATE_DATA;
      payload: { data: Data };
    };

export const GlobalContext = createContext<GlobalContextValue | null>(null);

export const GlobalReducer = (state: InitialState, action: GlobalAction) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_CURRENT_TAB:
      return {
        ...state,
        currentTab: payload?.currentTab,
      };
    case UPDATE_LOADING:
      return {
        ...state,
        loading: payload?.loading,
      };
    case UPDATE_TIME_PERIOD:
      return {
        ...state,
        timePeriod: payload?.timePeriod,
      };
    case UPDATE_DATA:
      return {
        ...state,
        data: payload?.data,
      };
    default:
      return { ...state };
  }
};

export const GlobalStateProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const { currentTab, loading, timePeriod, data } = state;

  const updateLoading = (loading: boolean) => {
    dispatch({
      type: UPDATE_LOADING,
      payload: { loading },
    });
  };

  const updateCurrentTab = (currentTab: string) => {
    dispatch({
      type: UPDATE_CURRENT_TAB,
      payload: { currentTab },
    });
  };

  const updateTimePeriod = (timePeriod: string) => {
    dispatch({
      type: UPDATE_TIME_PERIOD,
      payload: { timePeriod },
    });
  };

  const updateData = (data: Data) => {
    dispatch({
      type: UPDATE_DATA,
      payload: { data },
    });
  };

  useEffect(() => {
    (async () => {
      updateLoading(true);
      try {
        const { date, price } = await fetchData();
        updateData({ date, price });
      } catch (err) {
        console.error(err);
      } finally {
        updateLoading(false);
      }
    })();
  }, []);

  const value = {
    updateLoading,
    currentTab,
    loading,
    updateCurrentTab,
    updateTimePeriod,
    timePeriod,
    data,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
