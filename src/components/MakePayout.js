import React, { useState } from "react";
import axios from "axios";

const MakePayout = () => {
  const [formData, setFormData] = useState({
    beneId: "",
    amount: "",
    transferId: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/payout", formData);
      alert("Payout Successful: " + response.data.message);
    } catch (error) {
      alert("Error: " + error.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="beneId" placeholder="Beneficiary ID" onChange={handleChange} required />
      <input name="amount" placeholder="Amount" onChange={handleChange} required />
      <input name="transferId" placeholder="Transfer ID" onChange={handleChange} required />
      <input name="remarks" placeholder="Remarks" onChange={handleChange} />
      <button type="submit">Make Payout</button>
    </form>
  );
};

export default MakePayout;
