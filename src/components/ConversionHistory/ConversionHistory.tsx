import { FC, memo, useEffect, useState } from "react";
import moment from "moment";
import { conversionHistory } from "../../Actions";
import { connect, ConnectedProps, useDispatch } from "react-redux";

const ConversionHistory: FC<ConversionHistoryProps> = ({ storeHistory }) => {
  const dispatch = useDispatch();
  const localCurrency = localStorage.getItem('currency')

  storeHistory.filter((conversion: any) => console.log(conversion.from === localCurrency))
  const updateHistoryArray = localCurrency ? storeHistory.filter((conversion: {from: string}) => conversion.from === localCurrency) : storeHistory;

  useEffect(() => {
    dispatch(conversionHistory(JSON.parse(localStorage.getItem("history") || '{}')));
  }, [dispatch]);

  const deleteHistory = (clickedItem: number) => {
    const storedNames = JSON.parse(localStorage.getItem('history') || '{}');
    const value = JSON.parse(localStorage.getItem('history') || '{}').findIndex((item: any) => item.id === clickedItem);
    
    storedNames.splice(value, 1);
    localStorage.setItem("history", JSON.stringify(storedNames));
    dispatch(conversionHistory(JSON.parse(localStorage.getItem("history") || '{}')));
  }

  return (
    <div>
      {updateHistoryArray && (
        updateHistoryArray.map((item: {id: number, date: string, amount: strin}) => (
            <div key={item.id}>
              <div>{moment(item.date).format("DD/MM/YYYY") + " @ " + moment(item.date).format("HH:mm")}</div>
              <p>Converted an amount {item.amount} {item.from} of {item.to}</p>
              <div onClick={() => deleteHistory(item.id)}>click</div>
            </div>
          )
        )
      )}
    </div>
  )
}


const mapStateToProps = (state: any) => ({
    currentCurrency: state.reducer.currency || "EU",
    storeHistory: state.reducer.currentConversionHistory
});

const connector = connect(mapStateToProps);
type ConversionHistoryProps = ConnectedProps<typeof connector>;
export default connector(memo(ConversionHistory));