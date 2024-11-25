import React from "react";
import tiger from "../Images/Tiger.png";
import tufcon from '../Images/tufcon-logo.png'
import tmt from '../Images/TMT.png'
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate()
    const handleGo=()=>{
        navigate('/spinner')
    }
  return (
    <section className="vh-100 App">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style={{ borderRadius: "1rem" }}>
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={tiger}
                    alt="login form"
                    class="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div class=" align-items-center mb-3 pb-1">
                       
                        <img src={tufcon} width={120} height={100}/><br/>
                        <div class="h1 fw-bold mb-0">Play Now</div>
                      </div>

                      <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label" for="form2Example17">
                          Enter Your Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          id="form2Example17"
                          class="form-control form-control-lg"
                        />
                      
                      </div>

                      <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label" for="form2Example27">
                          Enter Your Mobile No.
                        </label>
                        <input
                          type="number"
                          placeholder="9999999999"
                          id="form2Example27"
                          class="form-control form-control-lg"
                        />
                       
                      </div>

                      <div class="pt-1 mb-4">
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          class="btn btn-dark btn-lg btn-block"
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
