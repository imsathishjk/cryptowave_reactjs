import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const Options = {
    colors:["#F6B17A","#7077A1"],
    chartArea:{
        width:'60%'
    }
    
}
export const LineChart = ({ marketData }) => {
    const [data, setData] = useState([['Date', 'Prices']]);
    useEffect(() => {
        let dataCopy = [['Date', 'Prices']];
        if (marketData.prices) {
            marketData.prices.map((item) => {
                return dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]]);
            })
            setData(dataCopy);
        }
    }, [marketData])
    return (
        <Chart
            chartType="AreaChart"
            data={data}
            legendToggle
            options={Options}
        />
    )
};