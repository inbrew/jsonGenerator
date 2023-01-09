import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

// components
import Main from "./components/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
