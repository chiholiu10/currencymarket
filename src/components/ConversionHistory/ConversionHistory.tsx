import { useRouter } from "next/router";

export const ConversionHistory = () => {
  const router = useRouter();
  const storedData = JSON.parse(localStorage.getItem('history') || '{}').filter((conversion: any) => conversion.from === "EUR");

  const deleteHistory = (clickedItem: number) => {
    const value = JSON.parse(localStorage.getItem('history') || '{}').find((item: any) => item.id === clickedItem)
    console.log(value)
    // JSON.parse(localStorage.removeItem((item: any)) => item.id === clickedItem);
  }
  return (
    <div>
      {storedData && (
        storedData.map((item: any, index: number) => {
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