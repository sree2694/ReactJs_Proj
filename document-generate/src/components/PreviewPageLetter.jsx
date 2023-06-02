import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography, createTheme, ThemeProvider } from '@mui/material';
import jsPDF from 'jspdf';

import logoImage from '../components/slogo.jpg'; // Replace with the actual path to the image

const PreviewPage = () => {
  const location = useLocation();
  const { date, firstName, lastName, emailId, salary, emptype, jobTitle, jobDuties } = location.state;

  const handleGeneratePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const marginLeft = 20; // Left margin
    const marginRight = 20; // Right margin
    const marginTop = 10; // Top margin
    const marginBottom = 10; // Bottom margin

    const contentWidth = pageWidth - marginLeft - marginRight;

    const footer = 'Footer Content';

    const lineHeight = 1.3; 

    const content = `                                                                                                                                                                                                                                                                                                                 ${date}
                                                                        Offer of Employment

${firstName} ${lastName}
${emailId}

Dear ${firstName},

  We are pleased to offer you employment with RR Software Solutions LLC as ${jobTitle} and your duties are generally that of IT Recruiter services for RR Software Solutions LLC and its clients.

  Mr/Ms. name will be a ${emptype} employee of RR Software Solutions LLC, starting from ${date}, and works on a standard 40/20 hours/week with a yearly wage of $${salary}.00 until the completion of the project.

  Your job duties as a ${jobTitle} with RR Software Solutions LLC include but are not limited to the following:
      ${jobDuties}
      • ----

  You will need to provide us with proper employment authorization. Please note that as a requirement to work in the United States, you must complete the Employment Eligibility Verification (1-9) form and bring with you the required supporting documentation. Please send or fax your signed Offer Letter and Employment Agreement to our office as listed above.

  Confidentiality:
      Employee will perform services for Company which may require Company to disclose confidential and proprietary information ("Confidential Information") to Employee. (Confidential Information is any information of any kind, nature, or description concerning any matters affecting or relating to Employee's services for Company, the business or operations of Company, and/or products, drawings, plans, processes, or other data of Company). Accordingly, to protect the Company Confidential Information that will be disclosed to Employee, the Employee agrees as follows.
      A. Employee will hold the Confidential Information received from Company in strict confidence and shall exercise a reasonable degree of care to prevent disclosure to others.
      B. Employee will not disclose or divulge either directly or indirectly the Confidential Information to others unless first authorized to do so in writing by Company.
      C. Employee will not reproduce the Confidential Information nor use this information commercially or for any purpose other than the performance of his/her duties for Company. Employee will, upon the request or upon termination of his/her relationship with Company, deliver to Company any drawings, notes, documents, equipment, and materials received from Company or originating from its activities for Company.
      D. Company shall have the sole right to determine the treatment of any information that is Part or project-specific received from Employee, including the right to keep the same as a trade secret, to use and disclose the same without prior patent applications, to file copyright registrations in its own name or to follow any other procedure as Company may deem appropriate.
      E. Company reserves the right to take disciplinary action, up to and including termination for violations of this agreement.

  TERMINATION: Employment may be terminated at will by the Company or by you with 2 weeks' notice. Good cause for the termination of employment shall be defined as:
      (i) Any act by the employee including but not limited to misconduct, negligence, unlawfulness, dishonesty, or inattention to the business, which is detrimental to the interests of RR Software Solutions LLC, or
      (ii) The employee's unsatisfactory job performance or failure to comply with the direction, policies, rules, or regulations of RR Software Solutions LLC.

Signature of Acknowledgment:

  We believe that we will provide you with challenging and rewarding career opportunities. We believe that your contributions will be an important component to the overall success of our company. The leadership team and I look forward to you joining RR Software Solutions LLC. Please indicate your acceptance of this offer by signing and returning the original copy.

  We are looking forward to having you join us as a vital member of the team and feel that you can make a significant contribution to RR Software Solutions LLC.

  If I can answer any questions about the offer or provide any additional information, please call me at 410-938-1708.

  Sincerely,

  Ramakrishna Vuyyuru                                                                  ${firstName} ${lastName}
  CEO                                                                                               Signature:
  RR Software Solutions LLC                                                         Date:
    `;

    doc.setFont('Calibri');
    doc.setFontSize(12);
    doc.setLineHeightFactor(lineHeight);
    const lines = doc.splitTextToSize(content, contentWidth);

    let cursorY = marginTop;
    let remainingLines = lines;

    while (remainingLines.length > 0) {
      // Add header
      const headerHeight = 30; // Adjust header height as needed
      doc.addImage(logoImage, 'JPEG', pageWidth - marginRight - 20, cursorY, headerHeight, headerHeight);

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
        <Typography variant="body1" style={{ textAlign: 'right', fontWeight: 'bold' }}>
  {`Date: ${date}`}
</Typography>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            {`Dear ${firstName} ${lastName},`}
          </Typography>
          <Typography variant="body1">
            We are pleased to offer you employment with RR Software Solutions LLC as {jobTitle} and your duties are
            generally that of IT Recruiter services for RR Software Solutions LLC and its clients.
          </Typography>
          <Typography variant="body1" gutterBottom>
            {`Mr/Ms. ${firstName} will be a ${emptype} employee of RR Software Solutions LLC, starting from ${date}, and works on a standard 40/20 hours/week with a yearly wage of $${salary}.00 until the completion of the project.`}
          </Typography>
          <Typography variant="body1">
            Your job duties as a {jobTitle} with RR Software Solutions LLC include but are not limited to the following:
          </Typography>
          <Typography variant="body1">{jobDuties}</Typography>
          <Typography variant="body1" gutterBottom>
            • ----
          </Typography>
          <Typography variant="body1" gutterBottom>
            You will need to provide us with proper employment authorization. Please note that as a requirement to work in
            the United States, you must complete the Employment Eligibility Verification (1-9) form and bring with you the
            required supporting documentation. Please send or fax your signed Offer Letter and Employment Agreement to our
            office as listed above.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Confidentiality:
            <br />
            Employee will perform services for Company which may require Company to disclose confidential and proprietary
            information ("Confidential Information") to Employee. (Confidential Information is any information of any kind,
            nature, or description concerning any matters affecting or relating to Employee's services for Company, the
            business or operations of Company, and/or products, drawings, plans, processes, or other data of Company).
            Accordingly, to protect the Company Confidential Information that will be disclosed to Employee, the Employee
            agrees as follows.
          </Typography>
          <Typography variant="body1">
            A. Employee will hold the Confidential Information received from Company in strict confidence and shall exercise
            a reasonable degree of care to prevent disclosure to others.
            <br />
            B. Employee will not disclose or divulge either directly or indirectly the Confidential Information to others
            unless first authorized to do so in writing by Company.
            <br />
            C. Employee will not reproduce the Confidential Information nor use this information commercially or for any
            purpose other than the performance of his/her duties for Company. Employee will, upon the request or upon
            termination of his/her relationship with Company, deliver to Company any drawings, notes, documents, equipment,
            and materials received from Company or originating from its activities for Company.
            <br />
            D. Company shall have the sole right to determine the treatment of any information that is Part or
            project-specific received from Employee, including the right to keep the same as a trade secret, to use and
            disclose the same without prior patent applications, to file copyright registrations in its own name or to
            follow any other procedure as Company may deem appropriate.
            <br />
            E. Company reserves the right to take disciplinary action, up to and including termination for violations of this
            agreement.
          </Typography>
          <Typography variant="body1">
            TERMINATION: Employment may be terminated at will by the Company or by you with 2 weeks' notice. Good cause for
            the termination of employment shall be defined as:
          </Typography>
          <Typography variant="body1">
            (i) Any act by the employee including but not limited to misconduct, negligence, unlawfulness, dishonesty, or
            inattention to the business, which is detrimental to the interests of RR Software Solutions LLC, or
          </Typography>
          <Typography variant="body1">
            (ii) The employee's unsatisfactory job performance or failure to comply with the direction, policies, rules, or
            regulations of RR Software Solutions LLC.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Signature of Acknowledgment:
          </Typography>
          <Typography variant="body1" gutterBottom>
            We believe that we will provide you with challenging and rewarding career opportunities. We believe that your
            contributions will be an important component to the overall success of our company. The leadership team and I
            look forward to you joining RR Software Solutions LLC. Please indicate your acceptance of this offer by signing
            and returning the original copy.
          </Typography>
          <Typography variant="body1" gutterBottom>
            We are looking forward to having you join us as a vital member of the team and feel that you can make a
            significant contribution to RR Software Solutions LLC.
          </Typography>
          <Typography variant="body1" gutterBottom>
            If I can answer any questions about the offer or provide any additional information, please call me at
            410-938-1708.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sincerely,
          </Typography>
          <Typography variant="body1" gutterBottom>
            Ramakrishna Vuyyuru                                                                  {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body1">
            CEO                                                                                               Signature:
          </Typography>
          <Typography variant="body1">RR Software Solutions LLC                                                         Date:</Typography>
        </div>
        <Button variant="contained" onClick={handleGeneratePDF}>
          Generate PDF
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default PreviewPage;
