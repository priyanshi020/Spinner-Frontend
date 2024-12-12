import React, { useState } from "react";
import axios from "axios";

const AddBeneficiary = () => {
  const [formData, setFormData] = useState({
    beneId: "",
    name: "",
    email: "",
    phone: "",
    vpa: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/add-beneficiary", formData);
      alert("Beneficiary Added: " + response.data.message);
    } catch (error) {
      alert("Error: " + error.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="beneId" placeholder="Beneficiary ID" onChange={handleChange} required />
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="vpa" placeholder="UPI ID" onChange={handleChange} required />
      <button type="submit">Add Beneficiary</button>
    </form>
  );
};

export default AddBeneficiary;
