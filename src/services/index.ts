import { Data } from "../context/global/global-context";
import { IData } from "../types";

export const fetchData = async function (): Promise<Data> {
  let date: string[] = [];
  let price: string[] = [];
  try {
    const result = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
    );
    const data: IData = await result.json();

    date = data.prices.map((price) => new Date(price[0]).toLocaleDateString());
    price = data.prices.map((price) => parseInt(price[1])?.toFixed(2));
    return { date, price };

    // setData({ labels, values });
  } catch (error) {
    console.error("Error fetching data:", error);
    return { date, price };
  }
};
