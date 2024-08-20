
import React, { useState } from 'react';
import './App.css';


function App() {
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [location, setLocation] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/get-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookName, authorName }),
        });

        const data = await response.json();
        setLocation(data);
    };

    return (
    
        <div className="library-container">
            <h1 className="title">Library Book Finder</h1>
            <form onSubmit={handleSearch} className="form">
                <input 
                    type="text" 
                    placeholder="Book Name" 
                    value={bookName} 
                    onChange={(e) => setBookName(e.target.value)} 
                    className="input-field"
                />
                <input 
                    type="text" 
                    placeholder="Author Name" 
                    value={authorName} 
                    onChange={(e) => setAuthorName(e.target.value)} 
                    className="input-field"
                />
                <button type="submit" className="search-button">Find Book</button>
            </form>

            {location && (
                <div className="location-info">
                    <h2 className="location-title">Book Location:</h2>
                    <p>Row Number: {location.row}</p>
                    <p>Rack Number: {location.rack}</p>
                    <p>Floor: {location.floor}</p>
                </div>
            )}
        </div>
    );
}

export default App;
