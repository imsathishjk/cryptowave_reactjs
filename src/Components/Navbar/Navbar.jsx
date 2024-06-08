import { useContext } from 'react';
import logo from '../../assets/Logo.png'
import './Navbar.css';
import {AppContext} from '../../Context.js';
import { Link } from 'react-router-dom';
export const Navbar = () => {
    const{handleChange} = useContext(AppContext)
    return (
        <nav className="nav_container">
            <Link to={'/'} className="header">
                <img src={logo} alt="logo" />
                <h1>CryptoWave</h1>
            </Link >
            <div className="nav_links">
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li>Features</li>
                    <li>Pricing</li>
                </ul>
            </div>
            <div className='currency-box'>
                <select onChange={handleChange}>
                    <option value="eur">EURO</option>
                    <option value="inr">INR</option>
                    <option value="usd">USD</option>
                </select>
            </div>
        </nav>
    )
}