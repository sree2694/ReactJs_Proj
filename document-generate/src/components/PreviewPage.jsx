import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography, createTheme, ThemeProvider } from '@mui/material';
import jsPDF from 'jspdf';

import logoImage from '../components/slogo.jpg'; // Replace with the actual path to the image

const PreviewPage = () => {
  const location = useLocation();
  const { candidateName, date, jobTitle, startDate } = location.state;

  const handleGeneratePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const marginLeft = 20; // Left margin
    const marginRight = 20; // Right margin
    const marginTop = 20; // Top margin
    const marginBottom = 20; // Bottom margin

    const contentWidth = pageWidth - marginLeft - marginRight;

    const footer = 'Footer Content';

    const content = `                                                                                                                                 Date: ${date}
Dear ${candidateName},

  RR SOFT is delighted to offer you the full-time position of ${jobTitle} starting from ${startDate}, upon a successful round of [background check, drug screening, training details, etc].

As the ${jobTitle}, you will be responsible for the following:
[Mention job responsibilities].

You will be supervised by [Manager/supervisor name and title], and your working hours will be: [Mention working hours and days].

The base salary for this position is [Salary details as per month/year], and you will be paid on a [weekly, biweekly, monthly, etc.] basis. 

In addition, to the base salary, you will be eligible to receive [Mention additional compensation if applicable]. 

[Company name] offers an employee benefits program, which includes [Mention additional employee benefits].

You are also entitled to a leave of [Mention leave, sick days, paid time off details].  

You and the company are free to terminate employment at any time, with or without cause or advance notice. This offer letter is not a contract.

Please confirm your acceptance by signing this letter. 

On behalf of [Company_name], 

[Sender_Signature]

[Sender’s Full Name]

[Sender’s Job Title]

`;

    doc.setFont('Calibri');
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(content, contentWidth);

    let cursorY = marginTop;
    let remainingLines = lines;

    while (remainingLines.length > 0) {
      // Add header
      const headerHeight = 30; // Adjust header height as needed
      doc.addImage(logoImage, 'JPEG', pageWidth - marginRight - 20, cursorY, headerHeight, headerHeight);

      // If Image should Left
      // doc.addImage(imgData, 'JPEG', marginLeft, cursorY, headerHeight, headerHeight);
      
      cursorY += headerHeight; // Increase cursor position after header image

      // Calculate the number of lines that fit on the current page
      const availableLines = Math.floor((pageHeight - cursorY - marginBottom) / 6);
      const currentLines = remainingLines.slice(0, availableLines);

      // Add content
      doc.setFontSize(12);
      doc.text(currentLines, marginLeft, cursorY);

      remainingLines = remainingLines.slice(availableLines);
      cursorY = marginTop; // Reset cursor position to the top margin for the next page

      if (remainingLines.length > 0) {
        doc.addPage(); // Add a new page if there is remaining content
      }
    }

    // Add footer to every page
    for (let i = 1; i <= doc.internal.getNumberOfPages(); i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(footer, marginLeft, pageHeight - marginBottom - 10);
    }

    doc.save('generated_pdf.pdf');
  };

  const theme = createTheme({
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fontSize: 16,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h2">Preview</Typography>
      <div>
        <div>
          <Typography variant="body1" style={{ textAlign: 'right' }}>
            {`Date: ${date}`}
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            {`Dear ${candidateName},`}
          </Typography>
          <Typography variant="body1">
            {`RR SOFT is delighted to offer you the full-time position of ${jobTitle} starting from ${startDate}, upon a successful round of [background check, drug screening, training details, etc].`}
          </Typography>
          <Typography variant="body1">
            {`As the ${jobTitle}, you will be responsible for the following:`}
          </Typography>
          <Typography variant="body1">
            {`[Mention job responsibilities].
You will be supervised by [Manager/supervisor name and title], and your working hours will be: [Mention working hours and days].`}
          </Typography>
          <Typography variant="body1">
            The base salary for this position is [Salary details as per month/year], and you will be paid on a [weekly, biweekly, monthly, etc.] basis.
          </Typography>

          <Typography variant="body1">
            In addition, to the base salary, you will be eligible to receive [Mention additional compensation if applicable].
          </Typography>
          <Typography variant="body1">
            [Company name] offers an employee benefits program, which includes [Mention additional employee benefits].
          </Typography>
          <Typography variant="body1">
            You are also entitled to a leave of [Mention leave, sick days, paid time off details].
          </Typography>
          <Typography variant="body1">
            You and the company are free to terminate employment at any time, with or without cause or advance notice. This offer letter is not a contract.
          </Typography>
          <Typography variant="body1">
            Please confirm your acceptance by signing this letter.
          </Typography>
        </div>
        <Button variant="contained" onClick={handleGeneratePDF}>
          Generate PDF
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default PreviewPage;
