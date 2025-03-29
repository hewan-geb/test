import './App.css';
import Login from './components/login'
import Predict from './components/predict'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/predict" element={<Predict />}/>
      </Routes>
    </BrowserRouter>
  );
}
