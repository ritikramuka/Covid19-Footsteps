import React ,{useState, useEffect} from 'react'
import Line from 'react-chartjs-2'

function LineChart() {
    const [data, setData] = useState([]);

    const BuildChartData = (data, casesType = "cases") => {
        const chartData = [];
        let lastDataPoint;
        for(let date in data[casesType]) {
          if(lastDataPoint) {
            const newDataPoint = {
              x: date,
              y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
          } 
          lastDataPoint = data['cases'][date];
        }
        return chartData;
      }

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then((data) => {
            const chartData = BuildChartData(data);
            setData(chartData);
        })
    }, [])

    return (
        <div className = "lineChart">
            <h1>Im graph</h1>
            <Line data={{
                datasets : [
                {
                    backgroundColor : "#ff3421",
                    borderColor : "#f3f3ff",
                    data: data
                }]
            }}></Line>
        </div>

)
}

export default LineChart
