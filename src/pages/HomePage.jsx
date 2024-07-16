import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure the correct path to App.css'
// import MyNavbar from './MyNavbar'; // Import MyNavbar component
import Footer1 from './Footer1'; // Import Footer1 component

const Homepage = () => {
  const navigate = useNavigate(); // Get history object

  const handleExploreClick = () => {
    navigate('/login'); // Use history.push for navigation
  };

  return (
    <div>
      {/* <MyNavbar />  */}
      <div className="video-container">
        <video className="fullscreen-video" autoPlay muted loop>
          <source src="/vid-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="explore-overlay">
          <h1>ADVENTURE IS WORTHWHILE</h1>
          <h4>Discover New Places With us,Adventure Awaits</h4>
          <div className="but">
            <button onClick={handleExploreClick}>Explore With Us</button>
          </div>
        </div>
      </div>
      <Footer1 /> 
    </div>
  );
};

export default Homepage;
