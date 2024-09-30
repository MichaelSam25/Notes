import React, { useState } from 'react';
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:5000/register', { name, address });
      console.log(result);
      setName('');
      setAddress('');
      setSuccessMessage('Registered successfully!');
    } catch (err) {
      console.error(err);
      setSuccessMessage('Registration failed! Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Address:
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      {successMessage && <p>{successMessage}</p>} 
    </div>
  );
};

export default UserForm;
