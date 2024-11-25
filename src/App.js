import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Spinner from "./components/Spinner";
import Payment from "./components/Payment";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import QA from "./components/QA";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path='/' element={<Login/>}/>
          <Route path="/spinner" element={<Spinner />} />
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/Q&A" element={<QA/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
