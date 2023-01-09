import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

// components
import Main from "./components/Main";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
