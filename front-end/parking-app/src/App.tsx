import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState<string>('');
  const [parkingRules, setParkingRules] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://localhost:3000/api/parking-aid/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      setParkingRules(response.data.rules);
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="App">
      <h1>Swedish Parking Sign OCR</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Parking Sign" style={{ width: '200px', marginTop: '20px' }} />}
      {parkingRules ? (
        <p>{parkingRules}</p>
      ) : (
        <p>No parking rules found</p>
      )}
    </div>
  );
}

export default App;
