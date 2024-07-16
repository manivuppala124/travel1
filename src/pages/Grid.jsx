import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './MyNavbar';
import Footer1 from './Footer1';
import { WhereTo } from '../components';

const cities = [
  { id: 1, name: 'HYDERABAD', description: "Hyderabad, known for its rich history, vibrant culture, and exquisite cuisine. Famous for its iconic Charminar and as the hub of the IT industry.", image: 'attractions/HYDERABAD.jpg' },
  { id: 2, name: 'BANGALORE', description: "Bangalore is the Silicon Valley of India. Known for its pleasant climate, lush greenery, tradition, and its historic landmarks.", image: 'attractions/Bangalore-Palace_600.jpg' },
  { id: 3, name: 'MUMBAI', description: "Mumbai, the financial capital of India, known for Bollywood glamour, and iconic landmarks like the Gateway of India.", image: 'attractions/mumbaii.jpg' },
  { id: 4, name: 'DELHI', description: "Delhi, the capital city of India, with architectural marvels like the Red Fort, India Gate, magnificent temples and mosques with having great food.", image: 'attractions/shutterstock-redfort1.jpg' },
  { id: 5, name: 'MANALI', description: "Experience the breathtaking beauty and adventure of Manali, nestled in the Himalayas, perfect for nature lovers and thrill-seekers alike. Have the best time having maggie.", image: 'attractions/Manali.webp' },
  { id: 6, name: 'JAIPUR', description: "Jaipur, the Pink City of India, mesmerizes with its majestic palaces, vibrant bazaars, and rich Rajasthani culture, making it a royal destination for travelers.", image: 'attractions/jj.jpg' },
  { id: 7, name: 'CHENNAI', description: "Chennai, the capital of Tamil Nadu, is a bustling metropolis known for its beautiful beaches, rich heritage, and vibrant cultural scene.", image: 'attractions/chn.jpg' },
  { id: 8, name: 'KOLKATA', description: "Kolkata, the cultural capital of India, delights with its colonial architecture and rich cultural heritage, offering a unique blend of history for travelers to experience.", image: 'attractions/kk.jpg' },
  { id: 9, name: 'SURAT', description: "Surat is a diamond polishing and textile center on the banks of the Tapi River in Gujarat, India. It's known for its Dutch Cemetery, 16th-century Surat Castle, and Mughal-era chowks (markets).", image: 'attractions/su.webp' },
  { id: 10, name: 'PUNE', description: "Pune, also known as Poona, is the second-largest city in Maharashtra, India, after Mumbai. It was the cultural capital of the Maratha Empire in the 17th, 18th, and early 19th centuries. It is known for its historical sites such as Shaniwar Wada, a Mughal-era fort.", image: 'attractions/pu.jpeg' },
  { id: 11, name: 'VISHAKAPATNAM', description: "Visakhapatnam, also known as Vizag, is a coastal gem of Andhra Pradesh, boasting pristine beaches, scenic hills, rich cultural heritage, and its delicious seafood.", image: 'attractions/vk.jpg' },
  { id: 12, name: 'LUCKNOW', description: "Lucknow, the capital of Uttar Pradesh, is a city renowned for its rich history, elegant architecture, and mouthwatering cuisine. Explore the city's majestic monuments.", image: 'attractions/lk.jpg' },
  { id: 13, name: 'DHANUSHKOTI', description: "Dhanushkodi, a ghost town at the southern tip of Rameshwaram island in India, was once a thriving town connecting India to Sri Lanka. A 1964 cyclone devastated the town, leaving behind ruins and a haunting beauty.", image: 'attractions/DK.jpeg' },
  { id: 14, name: 'SHILONG', description: "Shillong, the capital of Meghalaya state in northeastern India, is a hill station renowned for its scenic beauty. Cascading waterfalls like Shillong Falls and Elephant Falls are popular attractions. Spread across several hillocks, the city offers panoramic views of rolling hills.", image: 'attractions/shilong.jpeg' },
  { id: 15, name: 'BHOPAL', description: "Discover the rich history and cultural heritage of Bhopal, a city of lakes and magnificent Mughal architecture. Visit its historic sites, vibrant bazaars, and serene lakes.", image: 'attractions/bp.jpg' },
  { id: 16, name: 'DARJEELING', description: "Experience the enchanting allure of Darjeeling, nestled in the Himalayas, renowned for its lush tea gardens and panoramic views of Kanchenjunga. Enjoy a ride on the Darjeeling Himalayan Railway.", image: 'attractions/dar.jpeg' }
];


const Grid = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedCity, setSelectedCity] = useState(null); // State for clicked city
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleCityClick = (city) => {
    setSelectedCity(city);
    navigate(`/search?location=${city.name.toLowerCase()}`); // Update URL with city name
  };

  return (
    <div className="bg-light">
      {/* Navbar and WhereTo components */}
      <MyNavbar />
      <WhereTo />

      <div className="container">
        {/* City grid */}
        <div className="row">
          {cities
            .filter((city) => city.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((city) => (
              <div className="col-md-3 mt-3" key={city.id}>
                <Card style={{ width: '20rem', marginLeft: '20px' }} className="md-10">
                  <Card.Img variant="top" src={city.image} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{city.name}</Card.Title>
                    <Card.Text>{city.description}</Card.Text>
                    <Link to={`/search?location=${city.name.toLowerCase()}`}>
                      <Button variant="primary" onClick={() => handleCityClick(city)}>
                        View More
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>

      <Footer1 />

      {/* Routes for WhereTo component (conditionally render based on selectedCity) */}
      <Routes>
        <Route path={`/search?location=${selectedCity?.name}`} element={selectedCity && <WhereTo city={selectedCity} />} />
      </Routes>
    </div>
  );
};

export default Grid;
