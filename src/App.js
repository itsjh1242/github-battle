//25.03 토큰 만료

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Landing from "./components/Landing";
import Analysis from "./components/Analysis";
import AnalysisDetail from "./components/AnalysisDetail";

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/detail/:user" element={<AnalysisDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
