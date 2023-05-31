import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Todo from './components/Todo';

function App() {
  return (
<Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Todo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
