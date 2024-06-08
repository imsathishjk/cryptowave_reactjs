import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Detail.css';
import { LineChart } from "../../Components/LineChart/LineChart";
import { AppContext } from "../../Context";
import { Loader } from "../../Components/Loader/Loader";

export const Detail = () => {
    const { currency, loading, setLoading } = useContext(AppContext)
    const { id } = useParams()
    const [coinData, setCoinData] = useState([]);
    const [marketData, setMarketData] = useState();
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const fetchSingleData = async () => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
            .then(response => response.json())
            .then(response => setCoinData(response))
            .catch(err => console.error(err));
    };

    const fetchMarketData = async () => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=5&interval=daily`, options)
            .then(response => response.json())
            .then(response => setMarketData(response))
            .catch(err => console.error(err));


    }



    useEffect(() => {
        fetchSingleData();
        fetchMarketData();
        setLoading(false);
    }, [currency]);
    if (coinData && marketData) {
        return (
            loading ? <Loader /> : <div className="detail-container">
                <div className="coin-details">
                    <h1 style={{ fontSize: '40px', color: "#eefada" }}># {coinData?.market_cap_rank}</h1>
                    <div className="coin">
                        <img src={coinData?.image?.large} alt={coinData?.name} />
                        <h1>{coinData?.name} <span style={{ fontSize: "16px", fontWeight: '500' }}>({coinData?.symbol?.toUpperCase()})</span></h1>
                    </div>

                    <div className="chart">
                        <LineChart marketData={marketData} />
                    </div>

                    <div className="market-details">
                        <ul>
                            <li>Current Price</li>
                            <li>
                                {
                                    currency === 'inr' ? <span >&#x20b9;</span> : ""
                                        || currency === 'eur' ? <span >&euro;</span> : ""
                                            || currency === 'usd' ? <span >$</span> : ""
                                } {coinData?.market_data?.current_price?.[currency].toLocaleString()}</li>
                        </ul>
                        <ul>
                            <li>Market Cap</li>
                            <li>
                                {
                                    currency === 'inr' ? <span >&#x20b9;</span> : ""
                                        || currency === 'eur' ? <span >&euro;</span> : ""
                                            || currency === 'usd' ? <span >$</span> : ""
                                } {coinData?.market_data?.market_cap?.[currency].toLocaleString()}</li>
                        </ul>
                        <ul>
                            <li>High in Last 24Hrs</li>
                            <li>
                                {
                                    currency === 'inr' ? <span >&#x20b9;</span> : ""
                                        || currency === 'eur' ? <span >&euro;</span> : ""
                                            || currency === 'usd' ? <span >$</span> : ""
                                }
                                {coinData?.market_data?.high_24h?.[currency].toLocaleString()} <span style={{ color: "#8DECB4", fontSize: '18px', fontWeight: '500' }}>&#8593;</span></li>
                        </ul>
                        <ul>
                            <li>Low in Last 24Hrs</li>
                            <li>
                                {
                                    currency === 'inr' ? <span >&#x20b9;</span> : ""
                                        || currency === 'eur' ? <span >&euro;</span> : ""
                                            || currency === 'usd' ? <span >$</span> : ""
                                }
                                {coinData?.market_data?.low_24h?.[currency].toLocaleString()} <span style={{ color: "#FF6464", fontSize: '18px', fontWeight: '500' }}>&#8595;</span></li>
                        </ul>
                    </div>
                    <div className="site">
                        <p>To Know More About {coinData?.name}</p>
                        <a href={coinData?.links?.homepage[0]} target="blank">Click Here</a>
                    </div>
                </div>
            </div >
        )
    }
}