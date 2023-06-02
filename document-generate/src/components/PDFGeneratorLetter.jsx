import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const PDFGeneratorLetter = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [emptype, setEmpType] = useState('');
  const [jobDuties, setJobDuties] = useState('');



  const handlePreview = () => {
    navigate('/previewLetter', {
      state: {
        date,
        firstName,
        lastName,
        emailId,
        salary,
        emptype,
        jobTitle,
        jobDuties,
      },
    });
  };

  return (
    <div>
      <div>
        <TextField
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>     
       <div>
        <TextField
          label="EmailId"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Employment Type"
          value={emptype}
          onChange={(e) => setEmpType(e.target.value)}
        />
      </div>    
        <div>
        <TextField
          label="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>      <div>
        <TextField
          label="Job Duties"
          value={jobDuties}
          onChange={(e) => setJobDuties(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={handlePreview}>
        Preview
      </Button>
    </div>
  );
};


export default PDFGeneratorLetter;