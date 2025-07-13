import React from 'react';
import spot from '../../Images/Spot add.png'
import { useHistory } from "react-router-dom";

const ChooseRole = () => {
  const history = useHistory();

  const handleRoleSelect = (role) => {
    // Example: Save to localStorage or context
    localStorage.setItem("userRole", role);
    history.push("/Login"); // or route based on role
  };

  return (
    <div className="role-selection">
      <h2>Select Your Role</h2>
      <button onClick={() => handleRoleSelect("NGO")}>NGO</button>
      <button onClick={() => handleRoleSelect("Donor")}>Donor</button>
      <button onClick={() => handleRoleSelect("Volunteer")}>Volunteer</button>
    </div>
  );
};

export default ChooseRole;
