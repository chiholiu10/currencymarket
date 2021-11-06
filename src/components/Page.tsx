import { FC, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Converter from "./Converter/Converter";
import ExchangeHistory from "./ExchangeHistory/ExchangeHistory";

export interface PageProps {
  listRates: Array<any>;
}

export const Page: FC<PageProps> = ({ listRates }) => {
  return (
    <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <Converter listRates={listRates}/>
      <ExchangeHistory/>
    </TabPanel>
    <TabPanel>

    </TabPanel>
  </Tabs>
  )

};