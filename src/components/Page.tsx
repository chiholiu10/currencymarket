import { FC } from "react";
import Converter from "./Converter/Converter";
import ExchangeHistory from "./ExchangeHistory/ExchangeHistory";

export const Page: FC = () => (
  <>
    <Converter />
    <ExchangeHistory />
  </>
);