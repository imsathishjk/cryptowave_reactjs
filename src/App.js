import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import { Home } from './Pages/Home/Home';
import './index.css';
import { Detail } from './Pages/DetailsPage/Detail';
import { Error } from './Pages/Error/Error';
import { Footer } from './Components/Footer/Footer';
const App = () => {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/detail/:id' element={< Detail />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
