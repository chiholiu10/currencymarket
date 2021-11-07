import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { setListRates } from './Actions';
import ConversionHistory from './components/ConversionHistory/ConversionHistory';
import { Header } from './components/Header/Header';
import { Page } from './components/Page';
import { fetchData } from './Services/api';

export const App: FC = () => {
  const dispatch = useDispatch();

  const loadRates = useCallback(async () => {
    try {
      const allRates = await fetchData();
      dispatch(setListRates(allRates));
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/history" element={<ConversionHistory />} />
      </Routes>
    </>
  );
};