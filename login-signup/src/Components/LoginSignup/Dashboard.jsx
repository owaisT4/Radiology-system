import React, { useState } from "react";
import "./Dashboard.css";

export const Dashboard = () => {
  const [image, setImage] = useState(null);
  const [BodyArea, setBodyArea] = useState("");
  const [ScanType, setScanType] = useState("");
  const [result, setResult] = useState("");


  const handleSubmit = async () => {
    if (!image || !BodyArea || !ScanType) {
      alert("Please upload an image and select all options.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("body_area", BodyArea);
    formData.append("scan_type", ScanType);

    

    try {
      const response = await fetch(
        "http://localhost/login-signup/phppages/Dashboard.php",
        { method: "POST", body: formData }
      );

      const data = await response.json();
      setResult(data.estimate);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error retrieving diagnosis estimate.");
    } 
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Radiology Decision Support System (RDSS)</h1>
        <div className="dashboard-inputs">
          {/* Image Upload */}
          <label>Upload Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          {/* Body Area Dropdown */}
          <label>Body Area:</label>
          <select value={BodyArea} onChange={(e) => setBodyArea(e.target.value)}>
            <option value="">Select</option>
            <option value="Head">Head</option>
            <option value="Chest">Chest</option>
            <option value="Abdomen">Abdomen</option>
            <option value="Leg">Leg</option>
            <option value="Arm">Arm</option>
          </select>

          {/* Scan Type Dropdown */}
          <label>Scan Type:</label>
          <select value={ScanType} onChange={(e) => setScanType(e.target.value)}>
            <option value="">Select</option>
            <option value="CT">CT</option>
            <option value="MRI">MRI</option>
            <option value="X-Ray">X-Ray</option>
            <option value="Ultrasound">Ultrasound</option>
          </select>

          {/* Submit Button */}
          <div className="dashboard-button" onClick={handleSubmit}>
            Estimate Diagnosis
          </div>
        </div>

       
        {result && (
          <div className="estimate-result">
            <strong>Estimated Finding:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
