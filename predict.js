import React, { useState } from 'react';


function HousePricePredictor() {
  const [predictedPrice, setPredictedPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      city: e.target.city.value,
      province: e.target.province.value,
      latitude: parseFloat(e.target.latitude.value),
      longitude: parseFloat(e.target.longitude.value),
      lease_term: e.target.lease_term.value,
      type: e.target.type.value,
      beds: parseFloat(e.target.beds.value, 10),
      baths: parseFloat(e.target.baths.value, 10),
      sq_feet: parseFloat(e.target.sq_feet.value, 10),
      furnishing: e.target.furnishing.value,
      smoking: e.target.smoking.value,
      pets: e.target.pets.checked
    };

    fetch('http://127.0.0.1:5000/predict_house_price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        setPredictedPrice(data.predicted_price);
      })
      .catch(error => {
        console.error('Error:', error);
        setPredictedPrice('An error occurred while predicting the price.');
      });
  };

  return (
    <div className="container">
      <header>
        <h1>House Price Predictor</h1>
      </header>
      <form id="priceForm" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" required />
        </div>
        <div className="form-field">
          <label htmlFor="province">Province:</label>
          <input type="text" id="province" name="province" required />
        </div>
        <div className="form-field">
          <label htmlFor="latitude">Latitude:</label>
          <input type="number" step="any" id="latitude" name="latitude" required />
        </div>
        <div className="form-field">
          <label htmlFor="longitude">Longitude:</label>
          <input type="number" step="any" id="longitude" name="longitude" required />
        </div>
        <div className="form-field">
          <label htmlFor="lease_term">Lease Term:</label>
          <input type="text" id="lease_term" name="lease_term" required />
        </div>
        <div className="form-field">
          <label htmlFor="type">Type:</label>
          <input type="text" id="type" name="type" required />
        </div>
        <div className="form-field">
          <label htmlFor="beds">Beds:</label>
          <input type="number" step="any" id="beds" name="beds" required />
        </div>
        <div className="form-field">
          <label htmlFor="baths">Baths:</label>
          <input type="number" step="any" id="baths" name="baths" required />
        </div>
        <div className="form-field">
          <label htmlFor="sq_feet">Square Feet:</label>
          <input type="number" id="sq_feet" name="sq_feet" required />
        </div>
        <div className="form-field">
          <label htmlFor="furnishing">Furnishing:</label>
          <select id="furnishing" name="furnishing" required>
            <option value="">Select Furnishing</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Partially Furnished">Partially Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="smoking">Smoking:</label>
          <select id="smoking" name="smoking" required>
            <option value="">Select Option</option>
            <option value="Yes">Smoking</option>
            <option value="No">Non-Smoking</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="pets">I have a pet:</label>
        </div>
        <div className="form-field-check">
          <input type="checkbox" id="pets" name="pets" />
        </div>
        <br />
        <button type="submit" className="submit-btn">Predict</button>
      </form>
      {predictedPrice != null && (
        <div id="predictionResult" className="result">
          Predicted Rent Price: ${predictedPrice}
        </div>
      )}
    </div>
  );
}

export default HousePricePredictor;
