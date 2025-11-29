
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

  // Check if device is touch-enabled and screen is small
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const isSmallScreen = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  // For touch devices or small screens, don't auto-open the sidebar
  const [isOpen, setIsOpen] = useState(
    typeof window !== 'undefined' && !isTouchDevice && !isSmallScreen
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