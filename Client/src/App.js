import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

// pages
import Main from "./pages/Main";

// components
import TabSelector from "./components/TabSelector";
import Header from "./components/Header";
import Loading from "./components/Loading";

// recoil
import { useRecoilValue } from "recoil";
import { loadingState } from "./recoil/loading";

function App() {
  const isLoading = useRecoilValue(loadingState);

  return (
    <BrowserRouter>
      <Header />
      {isLoading.isLoading ? <Loading /> : null}
      <TabSelector />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
