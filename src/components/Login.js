import React, { useState } from "react";
import login from "../Images/loginBackground.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGo = async () => {
    if (mobile.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}users/login`, {
        name: name,
        mobile_number: mobile,
      });
      
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("mobileNumber", response.data.mobile_number);
      onLogin();
      
      toast.success(response.data.message || "Login Successful");
      
      if (response.data.is_active === true) {
        navigate("/spinner");
      } else {
        toast.warn(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "80%",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "25px",
            border: "none",
            outline: "none",
            background: "white",
            fontSize: "1rem",
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Enter your phone number"
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "25px",
            border: "none",
            outline: "none",
            background: "white",
            fontSize: "1rem",
          }}
          value={mobile}
          onChange={handleMobileChange}
        />
        <button
          style={{
            width: "100%",
            marginTop: "1rem",
            padding: "0.8rem 1.5rem",
            borderRadius: "25px",
            border: "none",
            outline: "none",
            background: "brown",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleGo}
          disabled={loading}
        >
          {loading ? "Loading..." : "Let's Play"}
        </button>
      </div>
    </div>
  );
};

export default Login;
