import React, { useState } from "react";
import axios from "axios";
import tiger from "../Images/Tiger.png";
import tufcon from "../Images/tufcon-logo.png";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../service";
const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGo = async () => {
    try {
      const response = await axios.post(`${API_URL}users/login`, {
        name: name,
        mobile_number: mobile,
      });
      console.log("Login Successful:", response.data);

      // Navigate to another page or handle success logic
      onLogin();
      navigate("/spinner");
    } catch (err) {
      console.error("Login Failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  const handleMobileChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
  };

  return (
    <section className="vh-100 App">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={tiger}
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="align-items-center mb-3 pb-1">
                        <img src={tufcon} width={170} height={150} alt="Logo" />
                        <br />
                        <style>
                          {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
          .play-now {
            font-family: 'Dancing Script', cursive;
            font-size: 2.5rem;
            font-weight: bold;
          }
        `}
                        </style>
                        <div className="h1 fw-bold mb-0 play-now">Play Now</div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Enter Your Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Enter Your Mobile No.
                        </label>
                        <div>
                          <style>
                            {`
          /* Remove default arrows on number input */
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield; /* Firefox */
          }
        `}
                          </style>
                          <input
                            type="number"
                            placeholder="9999999999"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={mobile}
                            onChange={handleMobileChange}
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleGo}
                        >
                          Go
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
