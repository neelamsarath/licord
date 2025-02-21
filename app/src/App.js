import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [files, setFiles] = useState([
    { name: 'Basketball Certificate', size: '5 MB' },
    { name: 'Hackathon Certificate', size: '5 MB' },
    { name: 'Symposium Certificate', size: '5 MB' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length) {
      addFile(droppedFiles[0]);
    }
  };

  const addFile = (file) => {
    setFiles([...files, { name: file.name, size: `${file.size} bytes` }]);
  };

  const handleDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar"></div>
          <p className="name">SARATH</p>
          <p className="role">CSE</p>
        </div>
        <nav>
          <button>🏠 Home</button>
          <button>👤 Profile</button>
          <button>📈 Achievements</button>
          <button>⚙️ Settings</button>
          <button>💬 Help & Support</button>
        </nav>
        <button className="logout">Log Out</button>
      </aside>
      <main className="content">
        <header>
          <button className="button-rounded">&larr; Back</button>
          <h2>My Certificates</h2>
          <button className="button-rounded">Share</button>
        </header>
        <div className="controls">
          <button className="button-rounded">Categories ⬇</button>
          <button className="button-rounded">Progress ⬇</button>
        </div>
        <div
          className="upload-section"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>Drop Your Files 📤</p>
          <label className="upload-btn" htmlFor="fileUpload">
            Choose File
          </label>
          <input
            type="file"
            id="fileUpload"
            onChange={(e) => addFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <p className="drag-drop">or Drag & Drop the file here</p>
        </div>
        <div className="attached-files">
          <header>
            <h3>Attached Files</h3>
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </header>
          <table className="file-table">
            <thead>
              <tr>
                <th>File Names</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{file.size}</td>
                  <td>
                    <button className="edit">Edit</button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default App;
