import { FC, useCallback, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import ConversionHistory from './components/ConversionHistory/ConversionHistory';
import { Header } from './components/Header/Header';
import { Page } from './components/Page';
import { fetchData } from './Services/api';

export const App: FC = () => {
  const [listRates, setListRates] = useState([]);
  const [, setLoading] = useState<boolean>(false);
  
  const loadRates = useCallback(async () => {
    setLoading(false);
    try {
      const allRates = await fetchData();
      setListRates(allRates);
    } catch(err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Page listRates={listRates}/>}/>
      <Route path="/history" element={<ConversionHistory/>}/>
    </Routes>
    </>
  )
}