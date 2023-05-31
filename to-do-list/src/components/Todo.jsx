import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Todo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleTaskAdd = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleTaskDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <Container maxWidth="sm">
      <h1>To-Do List</h1>
      <div>
        <TextField
          label="Add Task"
          variant="outlined"
          value={task}
          onChange={handleTaskChange}
        />
        <Button variant="contained" onClick={handleTaskAdd}>
          Add
        </Button>
      </div>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleTaskDelete(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Todo;
