
import { useContext, useRef } from 'react';
import './Currency.css';
import { AppContext } from '../../Context';
import { Loader } from '../Loader/Loader';
import { Link } from 'react-router-dom';
export const CurrencyBox = ({ displayData, setDisplayData, loading }) => {
    const inputRef = useRef();
    const { currency, data } = useContext(AppContext);

    const handleFetchCoin = () => {
        let input = inputRef.current.value.toLowerCase();

        const newDisplayData = data.filter((item) => {
            return item.name.toLowerCase().includes(input);
        })
        setDisplayData(newDisplayData);
        inputRef.current.value = '';
    }

    return (
        <div className='curreny-container'>
            <div className='seach-box'>
                <input type="text" placeholder='Search Crypto' ref={inputRef} />
                <button className='search-btn' onClick={handleFetchCoin}>Search</button>
            </div>
            <div className='list-box'>
                <div className='list-container'>
                    <p className='list-header'>#</p>
                    <p className='list-header'>Coins</p>
                    <p className='list-header'>Price</p>
                    <p className='list-header'>24 Hrs Change ( % )</p>
                    <p className='list-header'>Market Cap</p>
                </div>
                {
                    displayData ? displayData.map((item, index) => {
                        return (
                            <Link to={`/detail/${item.id}`} key={index} className='list-container'>
                                <p className='rank'>{item.market_cap_rank}</p>
                                <p className='coin_logo'><img src={item?.image} alt={item?.name} />{item.name}</p>
                                <p className='price'>
                                    {
                                        currency === 'inr' ? <span >&#x20b9;</span> : ""
                                            || currency === 'eur' ? <span >&euro;</span> : ""
                                                || currency === 'usd' ? <span >$</span> : ""
                                    }
                                    {item.current_price.toLocaleString()}</p>
                                <p
                                    className={item.price_change_percentage_24h > 0 ? "green" : "red"}>{item?.price_change_percentage_24h.toFixed(2)}
                                    {
                                        item.price_change_percentage_24h > 0 ? <span>&#8593;</span> : <span>&#8595;</span>
                                    }
                                </p>
                                <p className='market-cap'>
                                    {
                                        currency === 'inr' ? <span>&#x20b9;</span> : ""
                                            || currency === 'eur' ? <span >&euro;</span> : ""
                                                || currency === 'usd' ? <span >$</span> : ""
                                    }
                                    {item?.market_cap.toLocaleString()}</p>
                            </Link >
            )
                    }) : <div>
                <Loader />
            </div>
                }
        </div>
        </div >
    )
}