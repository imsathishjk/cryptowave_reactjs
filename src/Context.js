import { createContext, useEffect, useState } from "react";
const AppContext = createContext();

const AppProvider = (props) => {

    const [currency, setCurrency] = useState('eur');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    const handleChange = (e) => {
        setCurrency(e.target.value)
    }
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-CuoitxisMvELE3Vx4kF9bUEA' }
    };

    const fetchData = async () => {
        await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`, options)
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err));
    }
    useEffect(() => {
        fetchData();
        setLoading(false);
    }, [currency])
    const pagination = (page) => {
        const itemsPerPage = 10;
        const pages = data?.length / itemsPerPage;
        const pageData = Array.from({ length: pages }, (_, index) => {
            const pageStart = index * itemsPerPage;
            return data.slice(pageStart, pageStart + itemsPerPage)
        });
        return pageData[page];
    }
    
    return (
        <AppContext.Provider value={{ currency, setCurrency, handleChange, data, pagination, loading, setLoading }}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppProvider
export { AppContext }