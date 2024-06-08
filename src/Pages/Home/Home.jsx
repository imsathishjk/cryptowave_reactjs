import { useContext, useState, useEffect } from "react"

import { Header } from "../../Components/Header/Header"
import './Home.css'
import { AppContext } from "../../Context"
import { CurrencyBox } from "../../Components/CurrencyBox/CurrencyBox"
import { Loader } from "../../Components/Loader/Loader"
export const Home = () => {
    const [displayData, setDisplayData] = useState([]);
    const [page, setPage] = useState(0);
    const { data, pagination, loading, setLoading } = useContext(AppContext);


    useEffect(() => {
        setDisplayData(pagination(page));
        setLoading(false)
    }, [data, page])

    return (
        <div className="home_container">
            <Header />
            {loading ? <Loader /> : <CurrencyBox displayData={displayData} setDisplayData={setDisplayData} />}
            <div className="paginator">
                {
                    displayData?.map((item, index) => {
                        return <p key={index} className={`${index === page ? 'active' : ""}`}
                            onClick={() => setPage(index)}>{index + 1}</p>
                    })
                }
            </div>
        </div>
    )
}