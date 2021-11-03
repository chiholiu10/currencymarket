export const fetchData = async () => {
  try {
    const currentData = await fetch(`https://api.nomics.com/v1/exchange-rates?key=${process.env.REACT_APP_API_KEY}`);
    const json = await currentData.json();
    return json;
  } catch(err) {
    console.error(err);
  }
}