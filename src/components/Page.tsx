import { FC } from "react";
import Converter from "./Converter/Converter";
import ExchangeHistory from "./ExchangeHistory/ExchangeHistory";

export interface PageProps {
  listRates: Array<any>;
}

export const Page: FC<PageProps> = ({ listRates }) => {
  return (
    <>
      <Converter listRates={listRates}/>
      <ExchangeHistory/>
    </>
  )

};