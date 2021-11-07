import { FC } from "react";

export const ConversionHistory: FC= () => {
  const storedCurrency = localStorage.getItem('currency') || "EUR";

  const storedData = JSON.parse(localStorage.getItem('history') || '{}').filter((conversion: any) => conversion.from === storedCurrency);

  const deleteHistory = (clickedItem: number) => {
    const value = JSON.parse(localStorage.getItem('history') || '{}').find((item: any) => item.id === clickedItem)
  }

  return (
    <div>
      {storedData && (
        storedData.map((item: any) => {
          return (
            <div key={item.id}>
              <div>{item.date}</div>
              <p>Converted an amount {item.amount} {item.from} of {item.to}</p>
              <div onClick={() => deleteHistory(item.id)}>click</div>
            </div>
          )
        })
      )}
    </div>
  )
}