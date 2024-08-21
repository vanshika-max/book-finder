
import React, { useState } from 'react';
import './App.css';


import firstFloorMap from './images/1st-floor-map.png';
import secondFloorMap from './images/2nd-floor-map.png';
import thirdFloorMap from './images/3rd-floor-map.png';

function App() {
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [location, setLocation] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        const response = await fetch('http://localhost:5000/get-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookName, authorName }),
        });

        const data = await response.json();
        if (data && data.row && data.rack && data.floor) {
            setLocation(data);
        } else {
            setLocation(null);
            setError('Location not found');
        }
    };

    const handleMapButtonClick = () => {
        setShowMap(!showMap);
    };

    const handleFloorSelect = (floor) => {
        setSelectedFloor(floor);
    };

    const handleBackButtonClick = () => {
        setSelectedFloor(null);
        setShowMap(false);
    };

    // Map images object
    const images = {
        '1st Floor': firstFloorMap,
        '2nd Floor': secondFloorMap,
        '3rd Floor': thirdFloorMap,
    };

    return (
        <div>
            {/* View Map Button */}
            <button className="map-button" onClick={handleMapButtonClick}>
                View Map
            </button>

            {/* Main Content */}
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
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}

                {location && (
                    <div className="location-info">
                        <h2 className="location-title">Book Location:</h2>
                        <p>Row Number: {location.row}</p>
                        <p>Rack Number: {location.rack}</p>
                        <p>Floor: {location.floor}</p>
                    </div>
                )}
            </div>

            {/* Map Overlay */}
            {showMap && (
                <div className="map-overlay">
                    <button className="back-button" onClick={handleBackButtonClick}>
                        Back
                    </button>
                    {selectedFloor && (
                        <div className="map-image">
                            <img 
                                src={images[selectedFloor]} 
                                alt={`Map of ${selectedFloor}`} 
                            />
                        </div>
                    )}
                    <div className="map-dropdown">
                        <button className="map-option" onClick={() => handleFloorSelect('1st Floor')}>
                            1st Floor
                        </button>
                        <button className="map-option" onClick={() => handleFloorSelect('2nd Floor')}>
                            2nd Floor
                        </button>
                        <button className="map-option" onClick={() => handleFloorSelect('3rd Floor')}>
                            3rd Floor
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
