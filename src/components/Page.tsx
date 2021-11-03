import { FC } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Converter from "./Converter/Converter";

export const Page: FC = () => (
  <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <Converter/>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
);