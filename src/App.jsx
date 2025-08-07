import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import SinglePostPage from './components/SinglePostPage/SinglePostPage';
import './App.css';

// Main application component that handles routing between pages
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:postId" element={<SinglePostPage />} />
      </Routes>
    </div>
  );
}

export default App; 