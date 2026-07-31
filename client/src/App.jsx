import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Remove <Navbar /> from here so it doesn't double-render at the top */}
      <AppRoutes />
    </div>
  );
}

export default App;