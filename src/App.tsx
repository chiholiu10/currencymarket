import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { setListRates } from './Actions';
import { Wrapper } from './App.styles';
import ConversionHistory from './components/ConversionHistory/ConversionHistory';
import { Header } from './components/Header/Header';
import { Page } from './components/Page';
import { fetchData } from './Services/api';

export const App: FC = () => {
  const dispatch = useDispatch();
  const [, setIsMounted] = useState<boolean>(true);

  const loadRates = useCallback(async () => {
    try {
      const allRates = await fetchData();
      console.log(allRates);
      dispatch(setListRates(allRates));
      setIsMounted(false);
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    loadRates();
    return () => setIsMounted(true);
  }, [loadRates]);

  return (
    <>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/history" element={<ConversionHistory />} />
        </Routes>
      </Wrapper>
    </>
  );
};