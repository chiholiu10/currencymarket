export const fetchData = async () => {
  try {
    const response = await fetch(`https://api.nomics.com/v1/exchange-rates?key=${process.env.REACT_APP_API_KEY}`);
    if (!response.ok) {
      return undefined;
    }
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const getExchangeHistory = async (currency: string, today: string, days: string) => {
  try {
    const response = await fetch(`https://api.nomics.com/v1/exchange-rates/history?key=${process.env.REACT_APP_API_KEY}&currency=${currency}&start=${days}T00%3A00%3A00Z&end=${today}T00%3A00%3A00Z0`);
    if (!response.ok) {
      return undefined;
    }
    return response.json();
  } catch (err) {
    console.error(err);
  }
};