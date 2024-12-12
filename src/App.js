import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Spinner from "./components/Spinner";
import Payment from "./components/Payment";
import Login from "./components/Login";
import QA from "./components/QA";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomWheel from "./components/CustomWheel";
import GoogleReviewPage from "./components/GoogleReviewPage";
import FollowPage from "./components/FollowPage";
import AddBeneficiary from "./components/AddBeneficiary";
import MakePayout from "./components/MakePayout";

// ProtectedRoute Component
const ProtectedRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/" replace />;
};

function App() {
  // Simulating authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulating login/logout functionality
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Route */}
           <Route path="/" element={<Login onLogin={handleLogin} />} /> 
          <Route path="/wheel" element={<CustomWheel/>}/>
          <Route path='/review' element={<GoogleReviewPage/>}/>
          <Route path="/follow" element={<FollowPage/>}/>
          <Route path='/add' element={<AddBeneficiary/>}/>
          <Route path='/payout' element={<MakePayout/>}/>
           {/* <Route path='/' element={<Spinner/>}/> */}
          {/*  */}
          {/* Protected Routes */}
          <Route
            path="/spinner"
            element={<ProtectedRoute element={<Spinner />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/payment"
            element={<ProtectedRoute element={<Payment />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/Q&A"
            element={<ProtectedRoute element={<QA />} isLoggedIn={isLoggedIn} />}
          />
        </Routes>
        {/* Logout Button for testing */}
        {/* {isLoggedIn && (
          <button onClick={handle} className="btn btn-danger" style={{ position: "fixed", bottom: 20, right: 20 }}>
            Logout
          </button>
        )} */}
      </Router>
    </div>
  );
}

export default App;
