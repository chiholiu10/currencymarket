// import moment from "moment";
import moment from "moment";
import { FC, memo } from "react";
import { Line } from 'react-chartjs-2';
import { connect, ConnectedProps } from "react-redux";

interface ChartExtraProps {
  historyDays: number;
}

type AllChartProps = ChartProps & ChartExtraProps;

const Chart: FC<AllChartProps> = ({ storeHistory, historyDays }) => {
  const labelsArray = storeHistory.map((label: { timestamp: string; }) => moment(label.timestamp).format("DD/MM/YYYY"));
  const dataArray = storeHistory.map((data: { rate: string; }) => Number(data.rate).toFixed(3));

  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: 'Currency Rate ' + historyDays + ' days',
        data: dataArray,
        fill: false,
        backgroundColor: '#36a297',
        borderColor: '#36a297',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMin: Math.min(...dataArray),
        suggestedMax: Math.max(...dataArray)
      },
      grid: {
        display: false,
        drawTicks: false
      },
    }
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  storeHistory: state.reducer.historyData || []
});

const connector = connect(mapStateToProps);
type ChartProps = ConnectedProps<typeof connector>;
export default connector(memo(Chart));