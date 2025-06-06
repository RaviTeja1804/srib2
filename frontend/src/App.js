import './App.css';
import Homepage from './pages/Homepage.js';
import LoginSignup from './pages/LoginSignup.js';
import FestivalImage from './pages/festivalImage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginSignup />} />
          <Route path='/home' element={<Homepage />} /> 
          <Route path='/puzzle' element={<FestivalImage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;