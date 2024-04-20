import logo from './logo.svg';
import './App.css';
import './index.css';

import Navbar from './Component/Navbar';
import { Routes, Route } from "react-router-dom";
import StoreStory from './Component/StoreStory';
import ShowStory from './Component/ShowStory';
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<StoreStory/>} />
      <Route path='/ShowStory' element={<ShowStory/>} />
    </Routes>
    </>
  );
}

export default App;
