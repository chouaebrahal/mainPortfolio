
import './index.css'; // Your CSS file
import Header from "./components/Header";

import SmoothScrollWrapper from "./components/SmoothScrollWrapper";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  useState } from 'react';
import Sidebar from './components/Sidebar';

function App() {

 const [isOpen, setIsOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth > 768 : true
  );


  return (
    <Router>
      <div id="main-content" role="main">
        <SmoothScrollWrapper >
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
        </SmoothScrollWrapper>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;