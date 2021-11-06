
   
import { FC, useCallback, useEffect, useState } from 'react';
import { Page } from './components/Page';
import { fetchData } from './Services/api';

export const App: FC = () => {
  const [listRates, setListRates] = useState([]);
  const [, setLoading] = useState<boolean>(false);
  
  const loadRates = useCallback(async () => {
    setLoading(false);
    try {
      const allRates = await fetchData();
      setListRates(allRates)
    } catch(err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  return (
    <Page listRates={listRates}/>
  )
}