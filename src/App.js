// src/components/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route ,  Navigate} from 'react-router-dom';
// import Signup from './components/Signup'; // Correct import
// import Login from './components/Login'; // Assuming you have a Login component
// import Whiteboard from './components/Whiteboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/whiteboard"/>
        {/* <Route path="/" element={<Navigate to="/signup" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
