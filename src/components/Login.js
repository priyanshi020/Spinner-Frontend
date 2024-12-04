// import React, { useState } from "react";
// import axios from "axios";
// import tiger from "../Images/Tiger.png";
// import tufcon from "../Images/tufcon-logo.png";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../service";

// const Login = ({ onLogin }) => {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false); // Loader state
//   const navigate = useNavigate();

//   const handleGo = async () => {
//     setLoading(true); // Show loader
//     try {
//       const response = await axios.post(`${API_URL}users/login`, {
//         name: name,
//         mobile_number: mobile,
//       });
//       console.log("Login Successful:", response.data);
//       const userName= response.data.name;
//       const mobileNumber=response.data.mobile_number
//       localStorage.setItem('userName',userName);
//       localStorage.setItem('mobileNumber',mobileNumber)
//       onLogin();
//       if (response.data.is_active === true) {
//         navigate("/spinner");
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       console.error("Login Failed:", err.response?.data || err.message);
//       setError(
//         err.response?.data?.message || "An error occurred. Please try again."
//       );
//     } finally {
//       setLoading(false); // Hide loader
//     }
//   };

//   const handleMobileChange = (e) => {
//     const value = e.target.value;
//     // Allow only numbers and limit to 10 digits
//     if (/^\d{0,10}$/.test(value)) {
//       setMobile(value);
//     }
//   };

//   return (
//     <section className="Appi">
//     <div className="container py-5 h-100">
//       <div className="row d-flex justify-content-center align-items-center h-100">
//         <div className="col-lg-8 col-md-10">
//           <div className="d-flex flex-column justify-content-center align-items-center mb-3 pb-1 text-center">
//             <img src={tufcon} width={170} height={150} alt="Logo" />
//             <div className="h1 fw-bold mb-0 play-now">Play Now</div>
//           </div>
//           <div className="card" style={{ borderRadius: "1rem" }}>
//             <div className="row g-0">
//               <div className="col-12 d-flex align-items-center">
//                 <div className="card-body p-4 text-black">
//                   <form onSubmit={(e) => e.preventDefault()}>
//                     <div className="form-outline mb-4">
//                       <label className="form-label" htmlFor="form2Example17">
//                         Enter Your Name
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="John Doe"
//                         id="form2Example17"
//                         className="form-control form-control-lg"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                     </div>

//                     <div className="form-outline mb-4">
//                       <label className="form-label" htmlFor="form2Example27">
//                         Enter Your Mobile No.
//                       </label>
//                       <input
//                         type="number"
//                         placeholder="9999999999"
//                         id="form2Example27"
//                         className="form-control form-control-lg"
//                         value={mobile}
//                         onChange={handleMobileChange}
//                       />
//                     </div>

//                     {error && <div className="alert alert-danger">{error}</div>}

//                     <div className="pt-1 mb-4">
//                       <button
//                         className="btn btn-dark btn-lg btn-block"
//                         type="button"
//                         onClick={handleGo}
//                         disabled={loading}
//                       >
//                         {loading ? "Loading..." : "Go"}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>

//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import login from "../Images/loginBg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../service";

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGo = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}users/login`, {
        name: name,
        mobile_number: mobile,
      });
      console.log("Login Successful:", response.data);
      const userName = response.data.name;
      const mobileNumber = response.data.mobile_number;
      localStorage.setItem("userName", userName);
      localStorage.setItem("mobileNumber", mobileNumber);
      onLogin();
      if (response.data.is_active === true) {
        navigate("/spinner");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Login Failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
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
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF6005",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Input fields */}
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
