import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { saveHistory } from "../../Actions";
import { getExchangeHistory } from "../../Services/api";
import { Table, Tr, Th, Td, TableColumns, TableBlock, Theader, Tbody, InputBlock, Label, InputSelect } from "../../Styles/General.styles";
import moment from "moment";

const ExchangeHistory: FC<ExchangeHistoryProps> = ({ currentCurrency, storeHistory }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [dayValue, setDayValue] = useState<string>("");
  const [historyDays, setHistoryDays] = useState<number>(7);

  const days = moment(Date.now()).subtract(historyDays, 'd').format("YYYY-MM-DD");
  const today = moment(Date.now()).format("YYYY-MM-DD");

  const loadHistory = useCallback(async (currentCurrency?, today?, days?) => {
    setLoading(false);
    try {
      const recentHistory = await getExchangeHistory(currentCurrency, today, days);
      dispatch(saveHistory(recentHistory));
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    loadHistory(currentCurrency, today, days);
  }, [loadHistory, currentCurrency, today, days]);

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    setDayValue(target.value);
    setHistoryDays(Number(target.value));
  };

  const sumValues = storeHistory.reduce((accumulator: string, currentValue: { rate: string; }) => {
    return Number(accumulator) + Number(currentValue.rate);
  }, 0);

  return (
    <div>
      <h2>Exchange History</h2>
      <InputBlock>
        <Label>Duration</Label>
        <InputSelect
          value={dayValue}
          onChange={(e) => handleDurationChange(e)}
        >
          <option value="7">7 days</option>
          <option value="14">14 days</option>
          <option value="30">30 days</option>
        </InputSelect>
      </InputBlock>

      {loading ? storeHistory.length > 0 && (
        <TableColumns data-test-id="loaded">
          <TableBlock>
            <Table>
              <Theader>
                <Tr>
                  <Th>Date</Th>
                  <Th>Exchange rate</Th>
                </Tr>
              </Theader>
              <Tbody>
                {storeHistory.map((item: any, index: number) => (
                  <Tr key={index}>
                    <Td>{moment(item.timestamp).format("DD/MM/YYYY")}</Td>
                    <Td>{Number(item.rate).toFixed(6)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableBlock>
          <TableBlock>
            <Table>
              <Theader>
                <Tr>
                  <Th>Statics</Th>
                </Tr>
              </Theader>
              <Tbody>
                <Tr>
                  <Td>Lowest {Math.min.apply(Math, storeHistory.map((item: { rate: string; }) => item.rate)).toFixed(7)}</Td>
                </Tr>
                <Tr>
                  <Td>Highest {Math.max.apply(Math, storeHistory.map((item: { rate: string; }) => item.rate)).toFixed(7)}</Td>
                </Tr>
                <Tr>
                  <Td>Average {(sumValues / historyDays).toFixed(7)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableBlock>
        </TableColumns>
      ) : <div></div>}

    </div>
  );
};

const mapStateToProps = (state: any) => ({
  fromValue: state.reducer.fromValue,
  currency: state.reducer.rates,
  currentCurrency: state.reducer.currency || "EU",
  storeHistory: state.reducer.historyData || []
});

const connector = connect(mapStateToProps);
type ExchangeHistoryProps = ConnectedProps<typeof connector>;
export default connector(memo(ExchangeHistory));
