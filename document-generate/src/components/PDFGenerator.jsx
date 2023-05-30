import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const PDFGenerator = () => {
  const navigate = useNavigate();
  const [candidateName, setCandidateName] = useState('');
  const [date, setDate] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [startDate, setStartDate] = useState('');

  const handlePreview = () => {
    navigate('/preview', {
      state: {
        candidateName,
        date,
        jobTitle,
        startDate,
      },
    });
  };

  return (
    <div>
      <div>
        <TextField
          label="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={handlePreview}>
        Preview
      </Button>
    </div>
  );
};

export default PDFGenerator;
