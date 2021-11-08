import { FC, memo, useCallback, useEffect } from "react";
import { getConversionHistory } from "../../Actions";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { Table, Tr, Th, Td, TableColumns, Theader, Tbody } from "../../Styles/General.styles";
import { DeleteButton } from "./Conversion.styles";
import { ConversationHistoryProps } from "../../Type/Type";
import moment from "moment";

const ConversionHistory: FC<ConversionHistoryProps> = ({ storeHistory }) => {
  const dispatch = useDispatch();
  const localCurrency = localStorage.getItem('currency');
  const updateHistoryArray = localCurrency ? storeHistory.filter((conversion: { from: string; }) => conversion.from === localCurrency) : storeHistory;
  const getLocalStorage = JSON.parse(localStorage.getItem("history") || '{}');

  const checkLocalStorage = useCallback(() => {
    dispatch(getConversionHistory(JSON.parse(localStorage.getItem("history") || '{}')));
  }, [dispatch]);

  useEffect(() => {
    checkLocalStorage();
  }, [checkLocalStorage]);

  const deleteHistory = (clickedItem: number) => {
    const storedNames = getLocalStorage;
    const value = getLocalStorage.findIndex((item: any) => item.id === clickedItem);

    storedNames.splice(value, 1);
    localStorage.setItem("history", JSON.stringify(storedNames));
    dispatch(getConversionHistory(getLocalStorage));
  };

  return (
    <div>
      <h1>Conversion History</h1>
      <TableColumns>
        <Table>
          <Theader>
            <Tr>
              <Th>Date</Th>
              <Th>Event</Th>
              <Th>Actions</Th>
            </Tr>
          </Theader>
          <Tbody>
            {updateHistoryArray && (
              updateHistoryArray.map((item: ConversationHistoryProps) => (
                <Tr key={item.id}>
                  <Td>{moment(item.date).format("DD/MM/YYYY") + " @ " + moment(item.date).format("HH:mm")}</Td>
                  <Td>Converted an amount {item.amount} {item.from} of {item.to}</Td>
                  <Td><DeleteButton onClick={() => deleteHistory(item.id)}>delete</DeleteButton></Td>
                </Tr>
              )
              )
            )}
          </Tbody>
        </Table>
      </TableColumns>
    </div>
  );
};


const mapStateToProps = (state: any) => ({
  currentCurrency: state.reducer.currency || "EU",
  storeHistory: state.reducer.currentConversionHistory
});

const connector = connect(mapStateToProps);
type ConversionHistoryProps = ConnectedProps<typeof connector>;
export default connector(memo(ConversionHistory));
