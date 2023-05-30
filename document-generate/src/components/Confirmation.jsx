import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import Header from './Header';
import Footer from './Footer';

const Confirmation = () => {
  const navigate = useNavigate();
  const printContent = localStorage.getItem('printContent');
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    handlePrint();
  }, [handlePrint]);

  return (
    <>
      <div ref={componentRef}>
        <div className="page">
          <Header />
          <div className="page-content">
            <p>{printContent}</p>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Confirmation;
