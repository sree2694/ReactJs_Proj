import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import PDFGenerator from './components/PDFGenerator';
import PreviewPage from './components/PreviewPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PDFGenerator />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
