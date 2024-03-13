import './App.css';
import Links from './components/Links';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notfound from './components/Notfound';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Form/>} />
          <Route path='/links' element={<Links/>} />
          <Route path='/notfound' element={<Notfound/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

