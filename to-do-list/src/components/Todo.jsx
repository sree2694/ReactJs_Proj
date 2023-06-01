import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Checkbox,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import {Mic, Delete, CheckCircle} from '@mui/icons-material';
import {
  Add,
  CalendarToday,
  Comment,
  FilterList,
  FormatListBulleted,
  Label,
  Notifications,
  Person,
  Refresh,
  Star,
  Storage,
  Timeline,
} from '@mui/icons-material';

const Todo = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [priority, setPriority] = useState('normal');
  const [image, setImage] = useState('');
  const [voiceCapture, setVoiceCapture] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleTaskAdd = () => {
    if (task.trim() === '') return;
    const newTask = {
      id: Date.now(),
      name: task,
      completed: false,
      priority,
      image,
      voiceCapture,
    };
    setTasks([...tasks, newTask]);
    setTask('');
    setPriority('normal');
    setImage('');
    setVoiceCapture(false);
  };

  const handleTaskToggle = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  const handleQuickAdd = (taskName) => {
    setTask(taskName);
    handleTaskAdd();
  };

  const handleRecurringDueDates = (taskId) => {
    // Handle recurring due dates logic here
    setSnackbarOpen(true);
  };

  const handleSectionAdd = () => {
    // Handle adding sections logic here
    setSnackbarOpen(true);
  };

  const handleSubtaskAdd = (sectionId, subtaskName) => {
    // Handle adding subtasks logic here
    setSnackbarOpen(true);
  };

  const handlePriorityChange = (taskId, priority) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, priority } : task
    );
    setTasks(updatedTasks);
  };

  const handleFavoriteToggle = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, favorite: !task.favorite } : task
    );
    setTasks(updatedTasks);
  };

  const handleReminderSet = (taskId) => {
    // Handle setting reminders logic here
    setSnackbarOpen(true);
  };

  const handleTaskDelegate = (taskId) => {
    // Handle task delegation logic here
    setSnackbarOpen(true);
  };

  const handleNotificationEnable = () => {
    // Handle enabling notifications logic here
    setSnackbarOpen(true);
  };

  const handleBoardCreate = () => {
    // Handle creating boards logic here
    setSnackbarOpen(true);
  };

  const handleLabelAdd = () => {
    // Handle adding labels logic here
    setSnackbarOpen(true);
  };

  const handleThemeChange = () => {
    // Handle changing themes logic here
    setSnackbarOpen(true);
  };

  const handleTaskViaEmail = () => {
    // Handle adding tasks via email logic here
    setSnackbarOpen(true);
  };

  const handleCommentAdd = () => {
    // Handle adding comments logic here
    setSnackbarOpen(true);
  };

  const handleFileUpload = () => {
    // Handle file uploads logic here
    setSnackbarOpen(true);
  };

  const handleCalendarFeed = () => {
    // Handle calendar feed logic here
    setSnackbarOpen(true);
  };

  const handleProductivityVisualization = () => {
    // Handle productivity visualization logic here
    setSnackbarOpen(true);
  };

  const handleActivityHistory = () => {
    // Handle activity history logic here
    setSnackbarOpen(true);
  };

  const handleCompletedTasksArchive = () => {
    // Handle completed tasks archive logic here
    setSnackbarOpen(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

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
        <FormControl variant="outlined" sx={{ m: 1 }}>
          <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <input
          type="file"
          id="image-upload"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <IconButton component="span">
            <AddPhotoIcon />
          </IconButton>
        </label>
        <IconButton onClick={() => setVoiceCapture(!voiceCapture)}>
          <Mic color={voiceCapture ? 'primary' : 'disabled'} />
        </IconButton>
        <Button variant="contained" onClick={handleTaskAdd}>
          Add Task
        </Button>
      </div>

      <div>
        <FormControl variant="outlined" sx={{ m: 1 }}>
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItem
                        button
                        sx={{
                          textDecoration: task.completed ? 'line-through' : 'none',
                          opacity: task.completed ? 0.7 : 1,
                        }}
                      >
                        <Checkbox
                          checked={task.completed}
                          onChange={() => handleTaskToggle(task.id)}
                        />
                        <ListItemText primary={task.name} />
                        {task.image && (
                          <img src={task.image} alt="Task" style={{ height: '40px' }} />
                        )}
                        <ListItemSecondaryAction>
                          <Tooltip title="Set Priority">
                            <IconButton onClick={() => handlePriorityChange(task.id, 'high')}>
                              <Star color={task.priority === 'high' ? 'primary' : 'disabled'} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Recurring Due Dates">
                            <IconButton onClick={() => handleRecurringDueDates(task.id)}>
                              <Refresh />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add Subtask">
                            <IconButton onClick={() => handleSubtaskAdd(task.id, 'Subtask')}>
                              <FormatListBulleted />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add Comment">
                            <IconButton onClick={handleCommentAdd}>
                              <Comment />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add File">
                            <IconButton onClick={handleFileUpload}>
                              <Storage />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Set Reminder">
                            <IconButton onClick={() => handleReminderSet(task.id)}>
                              <Notifications />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delegate Task">
                            <IconButton onClick={() => handleTaskDelegate(task.id)}>
                              <Person />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add to Favorites">
                            <IconButton onClick={() => handleFavoriteToggle(task.id)}>
                              <Star color={task.favorite ? 'primary' : 'disabled'} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Complete Task">
                            <IconButton onClick={() => handleTaskToggle(task.id)}>
                              <CheckCircle />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Task">
                            <IconButton onClick={() => handleTaskDelete(task.id)}>
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Feature successfully triggered!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Todo;
