import React, { useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';

import Header from './Header';
import Footer from './Footer';

const PDFGenerator = () => {
  const componentRef = useRef();
  const [date, setDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Build the content using the form input values
    const content = `
      [Company Logo]

      ${date}

      ${firstName} and ${lastName}
      ${address}
      ${city}, ${state}, ${zip}

      Dear [Candidate Name],

      We are pleased to offer you the [full-time, part-time, etc.] position of [job title] at [company name] with a start date of [start date], contingent upon [background check, I-9 form, etc.]. You will be reporting directly to [manager/supervisor name] at [workplace location]. We believe your skills and experience are an excellent match for our company.

      In this role, you will be required to [briefly mention relevant job duties and responsibilities].

      The annual starting salary for this position is [dollar amount] to be paid on a [monthly, semi-monthly, weekly, etc.] basis by [direct deposit, check, etc.], starting on [first pay period]. In addition to this starting salary, we’re offering you [discuss stock options, bonuses, commission structures, etc. — if applicable].

      Your employment with [Company Name] will be on an at-will basis, which means you and the company are free to terminate the employment relationship at any time for any reason. This letter is not a contract or guarantee of employment for a definitive period of time.

      As an employee of [Company Name], you are also eligible for our benefits program, which includes [medical insurance, 401(k), vacation time, etc.], and other benefits which will be described in more detail in the [employee handbook, orientation package, etc.].

      Please confirm your acceptance of this offer by signing and returning this letter by [offer expiration date].

      We are excited to have you join our team! If you have any questions, please feel free to reach out at any time.

      Sincerely,
      [Your Signature]

      [Your Printed Name]
      [Your Job Title]

      Signature: ______________________________
      Printed Name: ___________________________
      Date: __________________________________
    `;

    const contentLines = content.split('\n');
    const pages = splitContentIntoPages(contentLines, 24); // Adjust the number of lines per page as needed

    // Set the content and trigger the print
    setPrintContent(pages);
    handlePrint();
  };

  const splitContentIntoPages = (lines, linesPerPage) => {
    const pages = [];
    let currentPage = [];
    lines.forEach((line, index) => {
      currentPage.push(line);
      if ((index + 1) % linesPerPage === 0 || index === lines.length - 1) {
        pages.push(currentPage);
        currentPage = [];
      }
    });
    return pages;
  };

  const [printContent, setPrintContent] = useState([]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <TextField
          label="Zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={handlePrint}
      >
        Generate PDF
      </Button>
      <div ref={componentRef}>
        {printContent.map((page, index) => (
          <div key={index} className="page">
            <Header />
            <div className="page-content">
              {page.map((line, lineIndex) => (
                <p key={lineIndex}>{line}</p>
              ))}
            </div>
            <Footer />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFGenerator;
