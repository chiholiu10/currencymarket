import { shallow } from "enzyme";
import { Page } from './components/Page';
import { MemoryRouter } from 'react-router';
import ConversionHistory from "./components/ConversionHistory/ConversionHistory";

test('invalid path should redirect to Page', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/']}>
      <Page />
    </MemoryRouter>,
  );

  expect(wrapper.find(Page)).toHaveLength(1);
});

test('invalid path should redirect to History', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/history']}>
      <ConversionHistory />
    </MemoryRouter>,
  );

  expect(wrapper.find(ConversionHistory)).toHaveLength(1);
});