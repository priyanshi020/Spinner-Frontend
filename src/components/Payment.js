import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../service';
import './CSS/payment.css'
const Payment = () => {
  const [name,setName]=useState('')
  const [upiId, setUpiId] = useState('success@razorpay'); 
  const prize = localStorage.getItem("prizeAmount");
  const handlePayment = async () => {
    try {
      // Step 1: Create an order on the backend
      const { data } = await axios.post(`${API_URL}payments/upi/create-order`, {
        amount:prize,
        currency: 'INR',
        upi_id: upiId,
      });

      if (data.success) {
        
        const options = {
          key: 'rzp_test_PZTDP6jXKZdcgB', 
          amount: data.order.amount, 
          currency: data.order.currency,
          name: 'PRIYANSHI', 
          description: 'Test Transaction',
          image: 'https://your-logo-url.com/logo.png', 
          order_id: data.order.id, 
          handler: async (response) => {
          
            try {
              const verifyResponse = await axios.post(`${API_URL}payments/upi/verify-payment`, {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              });

              if (verifyResponse.data.success) {
                alert('Payment successful!');
              } else {
                alert('Payment verification failed!');
              }
            } catch (error) {
              console.error('Error verifying payment', error);
              alert('Payment verification error');
            }
          },
          prefill: {
            name: 'Test User',
            email: 'test.user@example.com',
            contact: '9893079903',
          },
          theme: {
            color: '#F37254', 
          },
        };

       
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on('payment.failed', function (response) {
          alert(`Payment failed: ${response.error.description}`);
        });

        razorpayInstance.open();
      } else {
        alert('Order creation failed!');
      }
    } catch (error) {
      console.error('Error in payment process', error);
      alert('Payment error. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* <h2>Razorpay Payment</h2>
      <div>
        <label>Amount (INR): </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
      </div>
      <div>
        <label>UPI ID: </label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
      </div>
      <button onClick={handlePayment} style={{ padding: '10px', backgroundColor: '#F37254', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Pay with Razorpay
      </button> */}
      
  <div class="container py-5 ">
    <div class="row d-flex justify-content-center align-items-center ">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-3">

              <h2 class="fw-bold mb-2 text-uppercase">Payment</h2>
              <p class="text-white-50 mb-5">Please enter your Name and UPI Id for secure payment</p>

              <div data-mdb-input-init class="form-outline form-white mb-4">
              <label class="form-label" for="typeEmailX">Email</label>
                <input type="email" value={name} placeholder='John Doe' onChange={(e) => setName(e.target.value)}  id="typeEmailX" class="form-control form-control-lg" />
               
              </div>

              <div data-mdb-input-init class="form-outline form-white mb-4">
              <label class="form-label" for="typePasswordX">UPI Id</label>
                <input type="text" value={upiId} placeholder='john@upi.com'
          onChange={(e) => setUpiId(e.target.value)} id="typePasswordX" class="form-control form-control-lg" />

              </div>


              <button onClick={handlePayment} data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5 mt-5    " type="submit">Pay with Razorpay</button>

             

            </div>

           

          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};

export default Payment;
