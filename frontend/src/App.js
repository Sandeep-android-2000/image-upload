// App.js

import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');


  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', { username, password });
      console.log(response.data);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.token);
      setPassword('');
      setUsername('')
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleUpload = async (event) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUploadStatus('Image uploaded successfully');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Authentication & Image Upload</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <input type="text" className="form-control mb-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="btn btn-primary btn-block " onClick={handleSignup}>Sign Up</button>
              <button className="btn btn-danger btn-block " onClick={handleLogin}>Log In</button>
            </div>
          </div>
          {token && (
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Upload Image</h5>
                <input type="file" className="form-control-file mb-2" onChange={handleUpload} />
                {uploadStatus && <p className="text-success">{uploadStatus}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
