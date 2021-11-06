export const fetchData = async () => {
  try {
    const currentData = await fetch(`https://api.nomics.com/v1/exchange-rates?key=${process.env.REACT_APP_API_KEY}`);
    const json = await currentData.json();
    return json;
  } catch(err) {
    console.error(err);
  }
}

export const getExchangeHistory = async (currency: string, today: string, days: string) => {
  try {
    const data = await fetch(`https://api.nomics.com/v1/exchange-rates/history?key=${process.env.REACT_APP_API_KEY}&currency=${currency}&start=${days}T00%3A00%3A00Z&end=${today}T00%3A00%3A00Z0`)
    .then(response => response.json());
    console.log(data)
    return data;
  } catch(err) {
    console.error(err)
  }
}