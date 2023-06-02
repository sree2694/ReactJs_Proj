import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import PDFGenerator from './components/PDFGenerator';
import PDFGeneratorLetter from './components/PDFGeneratorLetter';
import PreviewPage from './components/PreviewPage';
import PreviewPageLetter from './components/PreviewPageLetter';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<PDFGenerator />} />
          <Route path="/preview" element={<PreviewPage />} /> */}
          <Route path="/previewLetter" element={<PreviewPageLetter />} />
          <Route path="/" element={<PDFGeneratorLetter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
