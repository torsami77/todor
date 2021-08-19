import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-Content">
       <div className="Todo">
          <p>Todor</p>
          <TodoList />
       </div>
      </header>
    </div>
  );
}

export default App;
