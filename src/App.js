import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Spinner />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
