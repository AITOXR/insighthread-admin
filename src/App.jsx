import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CreateRatio from './features/CreateRatio';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/create-ratio" element={<CreateRatio />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
